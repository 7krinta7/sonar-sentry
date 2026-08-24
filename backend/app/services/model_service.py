from abc import ABC, abstractmethod
from typing import Any

from app.core.config import get_settings


class ModelService(ABC):
    """Interface that every model backend must implement.

    The real sonar model (developed separately) will plug in behind this
    interface without changing the API contract or the frontend.
    """

    @property
    @abstractmethod
    def is_loaded(self) -> bool:
        """Whether the model artifacts are loaded and ready for inference."""

    @abstractmethod
    def load(self) -> None:
        """Load the model artifacts."""

    @abstractmethod
    def predict(self, input_data: Any) -> Any:
        """Run inference on preprocessed input data."""

    @abstractmethod
    def metadata(self) -> dict[str, Any]:
        """Return descriptive metadata about the model."""


class MockModelService(ModelService):
    """Placeholder provider used until the real sonar model is available.

    It loads nothing and predicts nothing; it only satisfies the interface
    so the application can start without any ML dependencies.
    """

    @property
    def is_loaded(self) -> bool:
        return False

    def load(self) -> None:
        return None

    def predict(self, input_data: Any) -> Any:
        raise NotImplementedError("Real sonar model is not integrated yet.")

    def metadata(self) -> dict[str, Any]:
        settings = get_settings()
        return {
            "provider": settings.model_provider,
            "version": settings.model_version,
            "loaded": self.is_loaded,
        }


def get_model_service() -> ModelService:
    settings = get_settings()
    if settings.model_provider == "mock":
        return MockModelService()
    raise ValueError(f"Unsupported MODEL_PROVIDER: {settings.model_provider!r}")
