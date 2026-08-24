import hashlib

from app.services.model_service import ModelService
from app.schemas.ml import ModelMetadata, PredictionResult, PreprocessedInput

_MOCK_LABELS = ("MOCK_CLASS_A", "MOCK_CLASS_B", "MOCK_CLASS_C")


class MockModelService(ModelService):
    """Deterministic mock model for development and testing.

    Produces reproducible predictions derived from a hash of the input
    bytes.  The labels are intentionally meaningless — this model is
    **not** intended to perform any real sonar analysis.
    """

    def __init__(self) -> None:
        self._loaded = False

    def load(self) -> None:
        self._loaded = True

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    def predict(self, input_data: PreprocessedInput) -> PredictionResult:
        if not self._loaded:
            raise RuntimeError("Model has not been loaded. Call load() first.")

        raw = input_data.data
        if isinstance(raw, bytes):
            digest = hashlib.sha256(raw).hexdigest()
        else:
            digest = hashlib.sha256(str(raw).encode()).hexdigest()

        index = int(digest, 16) % len(_MOCK_LABELS)
        label = _MOCK_LABELS[index]

        scores = {
            lbl: (1.0 if lbl == label else 0.1) for lbl in _MOCK_LABELS
        }

        return PredictionResult(
            label=label,
            confidence=0.75,
            raw_scores=scores,
        )

    def metadata(self) -> ModelMetadata:
        return ModelMetadata(
            name="sonar-model",
            version="development",
            provider="mock",
        )
