from fastapi import APIRouter

from app.schemas.health import HealthResponse
from app.services.model_service import get_model_service

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def read_health() -> HealthResponse:
    service = get_model_service()
    return HealthResponse(status="ok", model_loaded=service.is_loaded)
