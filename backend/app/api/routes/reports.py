from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.exceptions import ReportNotFoundError
from app.database import get_db
from app.schemas.report import ReportDetail, ReportListResponse
from app.services.report_service import ReportService

router = APIRouter(tags=["reports"])


@router.get("/api/reports", response_model=ReportListResponse)
def list_reports(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=8, ge=1, le=100),
    search: str | None = Query(default=None),
    status: str | None = Query(default=None),
    date_from: str | None = Query(default=None),
    date_to: str | None = Query(default=None),
    region: str | None = Query(default=None),
    sort: str = Query(default="created_at"),
    order: str = Query(default="desc"),
    db: Session = Depends(get_db),
) -> ReportListResponse:
    service = ReportService(db)
    return service.list_reports(
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


@router.get("/api/reports/{report_id}")
def get_report(report_id: str, db: Session = Depends(get_db)) -> dict:
    service = ReportService(db)
    report = service.get_report(report_id)
    if report is None:
        raise ReportNotFoundError()

    return {
        "report_id": report.id,
        "run_id": report.run_id,
        "mission_id": report.mission_id,
        "mission_name": report.mission_name,
        "filename": report.filename,
        "scan_date": report.scan_date,
        "anomaly_count": report.anomaly_count,
        "high_risk_count": report.high_risk_count,
        "medium_risk_count": report.medium_risk_count,
        "low_risk_count": report.low_risk_count,
        "status": report.status,
        "confidence": report.confidence,
        "region": report.region,
        "created_at": report.created_at.isoformat() if report.created_at else "",
        "updated_at": report.updated_at.isoformat() if report.updated_at else "",
    }
