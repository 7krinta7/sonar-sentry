from fastapi.testclient import TestClient

from app.main import app

VALID_JPEG = b"\xff\xd8\xff\xe0" + b"\x00" * 100


def _create_report(client):
    resp = client.post(
        "/api/detect",
        files={"file": ("test.jpg", VALID_JPEG, "image/jpeg")},
        data={
            "latitude": "12.9716",
            "longitude": "80.2436",
            "sonar_type": "Side-Scan",
            "resolution": "0.5 m/px",
            "depth_min": "4",
            "depth_max": "38",
        },
    )
    detect_body = resp.json()
    report_resp = client.get("/api/reports")
    reports = report_resp.json()["items"]
    for r in reports:
        if r["run_id"] == detect_body["run_id"]:
            return r["report_id"]
    return None


class TestListReports:
    def test_empty_reports(self):
        with TestClient(app) as c:
            resp = c.get("/api/reports")
            assert resp.status_code == 200
            body = resp.json()
            assert body["items"] == []
            assert body["pagination"]["total"] == 0

    def test_reports_after_detect(self):
        with TestClient(app) as c:
            report_id = _create_report(c)
            assert report_id is not None
            resp = c.get("/api/reports")
            assert resp.status_code == 200
            assert resp.json()["pagination"]["total"] == 1

    def test_reports_pagination(self):
        with TestClient(app) as c:
            for _ in range(10):
                _create_report(c)
            resp = c.get("/api/reports", params={"page": 1, "page_size": 3})
            body = resp.json()
            assert len(body["items"]) == 3
            assert body["pagination"]["total"] == 10
            assert body["pagination"]["total_pages"] == 4

    def test_reports_status_filter(self):
        with TestClient(app) as c:
            _create_report(c)
            resp = c.get("/api/reports", params={"status": "completed"})
            assert resp.status_code == 200
            assert resp.json()["pagination"]["total"] == 1

            resp = c.get("/api/reports", params={"status": "flagged"})
            assert resp.json()["pagination"]["total"] == 0

    def test_reports_search(self):
        with TestClient(app) as c:
            _create_report(c)
            resp = c.get("/api/reports", params={"search": "Side-Scan"})
            assert resp.status_code == 200
            assert resp.json()["pagination"]["total"] == 1

            resp = c.get("/api/reports", params={"search": "nonexistent"})
            assert resp.json()["pagination"]["total"] == 0


class TestGetReport:
    def test_get_existing_report(self):
        with TestClient(app) as c:
            report_id = _create_report(c)
            assert report_id is not None
            resp = c.get(f"/api/reports/{report_id}")
            assert resp.status_code == 200
            body = resp.json()
            assert body["report_id"] == report_id
            assert body["status"] == "completed"
            assert body["anomaly_count"] > 0

    def test_get_nonexistent_report(self):
        with TestClient(app) as c:
            resp = c.get("/api/reports/nonexistent-id")
            assert resp.status_code == 404
            assert resp.json()["error"]["code"] == "REPORT_NOT_FOUND"
