from __future__ import annotations

import math
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.orm import Detection as DetectionORM
from app.models.orm import Report as ReportORM
from app.repositories.report_repository import ReportRepository
from app.schemas.detection import DetectionItem, DetectionSummary
from app.schemas.report import PaginationMeta, ReportDetail, ReportItem, ReportListResponse


class ReportService:
    def __init__(self, db: Session) -> None:
        self._repo = ReportRepository(db)
        self._db = db

    def create_report(
        self,
        run_id: str,
        mission_id: str,
        mission_name: str,
        filename: str,
        scan_date: str,
        detections: list[DetectionItem],
        summary: DetectionSummary,
        latitude: float | None = None,
        longitude: float | None = None,
        sonar_type: str | None = None,
        resolution: str | None = None,
        depth_min: float | None = None,
        depth_max: float | None = None,
        model_name: str | None = None,
        model_version: str | None = None,
        region: str | None = None,
    ) -> ReportORM:
        return self._repo.create(
            run_id=run_id,
            mission_id=mission_id,
            mission_name=mission_name,
            filename=filename,
            scan_date=scan_date,
            anomaly_count=summary.total,
            high_risk_count=summary.high_risk,
            medium_risk_count=summary.medium_risk,
            low_risk_count=summary.low_risk,
            status="completed",
            confidence=round(summary.avg_confidence * 100, 1) if summary.total > 0 else None,
            region=region,
        )

    def get_report(self, report_id: str) -> ReportORM | None:
        return self._repo.get(report_id)

    def get_report_by_run(self, run_id: str) -> ReportORM | None:
        return self._repo.get_by_run_id(run_id)

    def list_reports(
        self,
        page: int = 1,
        page_size: int = 8,
        search: str | None = None,
        status: str | None = None,
        date_from: str | None = None,
        date_to: str | None = None,
        region: str | None = None,
        sort: str = "created_at",
        order: str = "desc",
    ) -> ReportListResponse:
        items, total = self._repo.list(
            page=page,
            page_size=page_size,
            search=search,
            status=status,
            date_from=date_from,
            date_to=date_to,
            region=region,
            sort=sort,
            order=order,
        )

        report_items = [
            ReportItem(
                report_id=r.id,
                run_id=r.run_id,
                mission_id=r.mission_id,
                mission_name=r.mission_name,
                filename=r.filename,
                scan_date=r.scan_date,
                anomaly_count=r.anomaly_count,
                high_risk_count=r.high_risk_count,
                medium_risk_count=r.medium_risk_count,
                low_risk_count=r.low_risk_count,
                status=r.status,
                confidence=r.confidence,
                region=r.region,
                created_at=r.created_at.isoformat() if r.created_at else "",
                updated_at=r.updated_at.isoformat() if r.updated_at else "",
            )
            for r in items
        ]

        total_pages = math.ceil(total / page_size) if total > 0 else 1

        return ReportListResponse(
            items=report_items,
            pagination=PaginationMeta(
                page=page,
                page_size=page_size,
                total=total,
                total_pages=total_pages,
            ),
        )

    def update_status(self, report_id: str, status: str) -> ReportORM | None:
        return self._repo.update(report_id, status=status, updated_at=datetime.now(timezone.utc))
