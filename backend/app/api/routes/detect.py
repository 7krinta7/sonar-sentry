from __future__ import annotations

import math
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, File, Form, Request, UploadFile
from sqlalchemy.orm import Session

from app.api.exceptions import (
    FileTooLargeError,
    InferenceFailedError,
    InvalidFileTypeError,
    InvalidMetadataError,
    ModelUnavailableError,
    NoFileError,
    PreprocessingFailedError,
)
from app.config import Settings, get_settings
from app.database import get_db
from app.models.orm import Detection as DetectionORM
from app.models.orm import Run as RunORM
from app.repositories.detection_repository import DetectionRepository
from app.repositories.run_repository import RunRepository
from app.schemas.detection import (
    DetectResponse,
    DetectionItem,
    DetectionSummary,
    ProcessingStatus,
    ScanMetadata,
    Timestamps,
)
from app.services.inference_service import InferenceService
from app.services.report_service import ReportService
from app.services.result_normalizer import ResultNormalizer
from app.services.storage_service import StorageService

router = APIRouter(tags=["detect"])

_JPEG_MAGIC = b"\xff\xd8\xff"
_PNG_MAGIC = b"\x89PNG"
_TIFF_MAGIC = b"II\x2a\x00"
_TIFF_MAGIC_BE = b"MM\x00\x2a"
_ALLOWED_MIMES = {"image/jpeg", "image/png", "image/tiff"}


def _has_valid_signature(data: bytes, content_type: str) -> bool:
    if content_type == "image/jpeg":
        return data[:3] == _JPEG_MAGIC
    if content_type == "image/png":
        return data[:4] == _PNG_MAGIC
    if content_type == "image/tiff":
        return data[:4] == _TIFF_MAGIC or data[:4] == _TIFF_MAGIC_BE
    return False


@router.post("/api/detect", response_model=DetectResponse)
async def detect(
    request: Request,
    file: UploadFile | None = File(default=None),
    latitude: float = Form(...),
    longitude: float = Form(...),
    sonar_type: str = Form(...),
    resolution: str = Form(...),
    depth_min: float = Form(...),
    depth_max: float = Form(...),
    confidence_threshold: int = Form(default=78),
    selected_classes: str = Form(default="Debris,Shipwreck"),
    min_object_size: int = Form(default=40),
    db: Session = Depends(get_db),
) -> DetectResponse:
    inference_service: InferenceService = request.app.state.inference_service
    settings: Settings = get_settings()
    started_at = datetime.now(timezone.utc)

    if file is None:
        raise NoFileError()

    content_type = (file.content_type or "").lower()
    if content_type not in _ALLOWED_MIMES:
        raise InvalidFileTypeError()

    contents = await file.read()
    if len(contents) == 0:
        raise NoFileError()

    if len(contents) > settings.max_file_size_mb * 1024 * 1024:
        raise FileTooLargeError()

    if not _has_valid_signature(contents, content_type):
        raise InvalidFileTypeError()

    if depth_min >= depth_max:
        raise InvalidMetadataError("depth_min must be less than depth_max")

    if sonar_type not in settings.allowed_sonar_types:
        raise InvalidMetadataError(
            f"Invalid sonar_type. Allowed: {', '.join(settings.allowed_sonar_types)}"
        )

    if resolution not in settings.allowed_resolutions:
        raise InvalidMetadataError(
            f"Invalid resolution. Allowed: {', '.join(settings.allowed_resolutions)}"
        )

    if not inference_service.is_model_loaded:
        raise ModelUnavailableError()

    storage = StorageService()
    stored_path = storage.save_upload(contents, file.filename or "unknown")

    run_repo = RunRepository(db)
    det_repo = DetectionRepository(db)

    run = run_repo.create(
        mission_id=f"MSN-{uuid.uuid4().hex[:4].upper()}",
        filename=file.filename or "unknown",
        file_path=str(stored_path),
        file_size_bytes=len(contents),
        status="processing",
        latitude=latitude,
        longitude=longitude,
        sonar_type=sonar_type,
        resolution=resolution,
        depth_min=depth_min,
        depth_max=depth_max,
    )

    try:
        prediction_result = inference_service.predict(contents)
    except Exception:
        run_repo.update(run.id, status="failed", error_message="Inference failed")
        raise InferenceFailedError()

    normalizer = ResultNormalizer()
    detections, summary = normalizer.normalize(prediction_result)

    model_meta = inference_service.metadata()
    completed_at = datetime.now(timezone.utc)
    duration = (completed_at - started_at).total_seconds()

    detection_dicts = [
        {
            "run_id": run.id,
            "class_label": d.class_label,
            "confidence": d.confidence,
            "risk_level": d.risk_level.value,
            "bbox_x": d.bbox.x if d.bbox else None,
            "bbox_y": d.bbox.y if d.bbox else None,
            "bbox_width": d.bbox.width if d.bbox else None,
            "bbox_height": d.bbox.height if d.bbox else None,
            "depth_m": d.depth_m,
            "area_m2": d.area_m2,
            "position_info": d.position_info,
        }
        for d in detections
    ]
    det_repo.create_many(detection_dicts)

    run_repo.update(
        run.id,
        status="completed",
        detection_count=summary.total,
        avg_confidence=summary.avg_confidence,
        model_name=model_meta.name,
        model_version=model_meta.version,
        model_provider=model_meta.provider,
    )

    try:
        report_service = ReportService(db)
        scan_date = started_at.strftime("%d %b %Y")
        mission_name = f"{sonar_type} Survey — {file.filename or 'unknown'}"
        report_service.create_report(
            run_id=run.id,
            mission_id=run.mission_id,
            mission_name=mission_name,
            filename=file.filename or "unknown",
            scan_date=scan_date,
            detections=detections,
            summary=summary,
            latitude=latitude,
            longitude=longitude,
            sonar_type=sonar_type,
            resolution=resolution,
            depth_min=depth_min,
            depth_max=depth_max,
            model_name=model_meta.name,
            model_version=model_meta.version,
        )
    except Exception:
        pass

    return DetectResponse(
        run_id=run.id,
        mission_id=run.mission_id,
        status=ProcessingStatus.completed,
        scan_metadata=ScanMetadata(
            filename=file.filename or "unknown",
            file_size_bytes=len(contents),
            latitude=latitude,
            longitude=longitude,
            sonar_type=sonar_type,
            resolution=resolution,
            depth_min=depth_min,
            depth_max=depth_max,
        ),
        detection_summary=summary,
        detections=detections,
        model={
            "name": model_meta.name,
            "version": model_meta.version,
            "provider": model_meta.provider,
        },
        timestamps=Timestamps(
            started_at=started_at.isoformat(),
            completed_at=completed_at.isoformat(),
            duration_seconds=round(duration, 3),
        ),
    )
