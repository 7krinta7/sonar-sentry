from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.exceptions import register_exception_handler
from app.api.routes import router
from app.config import get_settings
from app.services.factory import create_inference_service
from app.services.inference_service import InferenceService


@asynccontextmanager
async def lifespan(application: FastAPI) -> AsyncIterator[None]:
    settings = get_settings()
    inference_service = create_inference_service(settings)
    application.state.inference_service = inference_service
    yield


def create_app() -> FastAPI:
    settings = get_settings()

    application = FastAPI(
        title="Sonar Image API",
        description="Backend for the sonar image classification web application.",
        version=settings.model_version,
        lifespan=lifespan,
    )

    register_exception_handler(application)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.frontend_origin],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(router)

    return application


app = create_app()
