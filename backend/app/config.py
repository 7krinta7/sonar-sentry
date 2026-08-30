from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    model_provider: str = "mock"
    model_path: str = ""
    model_version: str = "development"
    max_file_size_mb: int = 10
    frontend_origin: str = "http://localhost:5173"
    api_prefix: str = "/api"
    debug: bool = False

    database_url: str = "sqlite:///./sonar_sentry.db"
    upload_dir: str = str(Path(__file__).resolve().parent.parent / "data" / "uploads")
    output_dir: str = str(Path(__file__).resolve().parent.parent / "data" / "outputs")

    allowed_image_mimes: list[str] = ["image/jpeg", "image/png", "image/tiff"]
    allowed_sonar_types: list[str] = [
        "Side-Scan",
        "Multibeam",
        "Synthetic Aperture",
    ]
    allowed_resolutions: list[str] = ["0.1 m/px", "0.5 m/px", "1 m/px"]
    default_confidence_threshold: int = 78
    default_min_object_size: int = 40

    cors_origins: list[str] = ["http://localhost:5173"]


@lru_cache
def get_settings() -> Settings:
    return Settings()
