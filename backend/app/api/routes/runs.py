from __future__ import annotations

import math

from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.orm import Session

from app.api.exceptions import RunNotFoundError
from app.database import get_db
from app.repositories.detection_repository import DetectionRepository
from app.repositories.run_repository import RunRepository
from app.schemas.detection import (
    BoundingBox,
    DetectionItem,
    DetectionSummary,
    ProcessingStatus,
    RiskLevel,
    ScanMetadata,
    Timestamps,
)
from app.schemas.run import PaginationMeta, RunDetail, RunListResponse, RunSummary

router = APIRouter(tags=["runs"])


@router.get("/api/runs", response_model=RunListResponse)
def list_runs(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    status: str | None = Query(default=None),
    db: Session = Depends(get_db),
) -> RunListResponse:
    repo = RunRepository(db)
    items, total = repo.list(page=page, page_size=page_size, status=status)
    total_pages = math.ceil(total / page_size) if total > 0 else 1

    run_items = [
        RunSummary(
            run_id=r.id,
            mission_id=r.mission_id,
            filename=r.filename,
            status=r.status,
            detection_count=r.detection_count,
            file_size_bytes=r.file_size_bytes,
            created_at=r.created_at.isoformat() if r.created_at else "",
            updated_at=r.updated_at.isoformat() if r.updated_at else "",
        )
        for r in items
    ]

    return RunListResponse(
        items=run_items,
        pagination=PaginationMeta(
            page=page,
            page_size=page_size,
            total=total,
            total_pages=total_pages,
        ),
    )


@router.get("/api/runs/{run_id}")
def get_run(run_id: str, db: Session = Depends(get_db)) -> dict:
    repo = RunRepository(db)
    run = repo.get(run_id)
    if run is None:
        raise RunNotFoundError()

    det_repo = DetectionRepository(db)
    orm_detections = det_repo.list_by_run(run_id)

    detections = [
        DetectionItem(
            detection_id=d.id,
            class_label=d.class_label,
            confidence=d.confidence,
            risk_level=RiskLevel(d.risk_level),
            bbox=BoundingBox(
                x=d.bbox_x,
                y=d.bbox_y,
                width=d.bbox_width,
                height=d.bbox_height,
            )
            if d.bbox_x is not None
            else None,
            depth_m=d.depth_m,
            area_m2=d.area_m2,
            position_info=d.position_info,
        )
        for d in orm_detections
    ]

    high_risk = sum(1 for d in detections if d.risk_level in (RiskLevel.high, RiskLevel.critical))
    medium_risk = sum(1 for d in detections if d.risk_level == RiskLevel.medium)
    low_risk = sum(1 for d in detections if d.risk_level == RiskLevel.low)
    avg_conf = (
        round(sum(d.confidence for d in detections) / len(detections), 4)
        if detections
        else 0.0
    )

    return {
        "run_id": run.id,
        "mission_id": run.mission_id,
        "filename": run.filename,
        "file_size_bytes": run.file_size_bytes,
        "status": run.status,
        "scan_metadata": ScanMetadata(
            filename=run.filename,
            file_size_bytes=run.file_size_bytes,
            latitude=run.latitude,
            longitude=run.longitude,
            sonar_type=run.sonar_type,
            resolution=run.resolution,
            depth_min=run.depth_min,
            depth_max=run.depth_max,
        ),
        "detection_summary": DetectionSummary(
            total=len(detections),
            high_risk=high_risk,
            medium_risk=medium_risk,
            low_risk=low_risk,
            avg_confidence=avg_conf,
        ),
        "detections": detections,
        "model": {
            "name": run.model_name,
            "version": run.model_version,
            "provider": run.model_provider,
        },
        "created_at": run.created_at.isoformat() if run.created_at else "",
        "updated_at": run.updated_at.isoformat() if run.updated_at else "",
    }
