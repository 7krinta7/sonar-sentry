from __future__ import annotations

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.orm import Report


class ReportRepository:
    def __init__(self, db: Session) -> None:
        self._db = db

    def create(self, **kwargs) -> Report:
        report = Report(**kwargs)
        self._db.add(report)
        self._db.commit()
        self._db.refresh(report)
        return report

    def get(self, report_id: str) -> Report | None:
        return self._db.query(Report).filter(Report.id == report_id).first()

    def get_by_run_id(self, run_id: str) -> Report | None:
        return self._db.query(Report).filter(Report.run_id == run_id).first()

    def list(
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
    ) -> tuple[list[Report], int]:
        query = self._db.query(Report)

        if search:
            like_pattern = f"%{search}%"
            query = query.filter(
                (Report.mission_name.ilike(like_pattern))
                | (Report.mission_id.ilike(like_pattern))
                | (Report.filename.ilike(like_pattern))
            )
        if status:
            query = query.filter(Report.status == status)
        if date_from:
            query = query.filter(Report.scan_date >= date_from)
        if date_to:
            query = query.filter(Report.scan_date <= date_to)
        if region:
            query = query.filter(Report.region == region)

        total = query.count()

        sort_column = getattr(Report, sort, Report.created_at)
        if order == "asc":
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())

        items = query.offset((page - 1) * page_size).limit(page_size).all()
        return items, total

    def update(self, report_id: str, **kwargs) -> Report | None:
        report = self.get(report_id)
        if report is None:
            return None
        for key, value in kwargs.items():
            setattr(report, key, value)
        self._db.commit()
        self._db.refresh(report)
        return report
