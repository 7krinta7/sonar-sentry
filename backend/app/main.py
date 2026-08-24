from fastapi import FastAPI

from app.api.health import router as health_router
from app.core.config import get_settings


def create_app() -> FastAPI:
    settings = get_settings()
    application = FastAPI(
        title="Sonar Image API",
        description="Backend for the sonar image classification web application.",
        version=settings.model_version,
    )
    application.include_router(health_router)
    return application


app = create_app()
