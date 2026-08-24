from app.config import Settings, get_settings
from app.preprocessing.identity_preprocessor import IdentityPreprocessor
from app.services.inference_service import InferenceService
from app.services.mock_model_service import MockModelService


def create_inference_service(settings: Settings | None = None) -> InferenceService:
    """Build an ``InferenceService`` based on the configured provider.

    Supported providers
    -------------------
    * ``mock`` — deterministic placeholder (no real ML).

    Raises
    ------
    ValueError
        If ``MODEL_PROVIDER`` is not a recognised provider name.
    """
    if settings is None:
        settings = get_settings()

    preprocessor = IdentityPreprocessor()

    if settings.model_provider == "mock":
        model = MockModelService()
    else:
        raise ValueError(
            f"Unsupported MODEL_PROVIDER: {settings.model_provider!r}. "
            "Supported providers: mock"
        )

    service = InferenceService(preprocessor=preprocessor, model=model)
    service.load()
    return service
