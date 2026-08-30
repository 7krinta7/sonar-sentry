"""Placeholder service for the real sonar ML model.

This module will be replaced when the Colab model is finalized.
It implements the same ``ModelService`` ABC so that swapping it in
requires only changing ``MODEL_PROVIDER`` in the environment config.

DO NOT invent model logic here.  This is a safe placeholder that
produces no predictions and exists solely to verify the integration
interface is correct.
"""

from app.schemas.ml import ModelMetadata, PredictionResult, PreprocessedInput
from app.services.model_service import ModelService


class SonarModelService(ModelService):
    """Placeholder for the real sonar anomaly-detection model.

    When the actual Colab model is ready, replace this class with
    the real implementation.  The interface must remain identical:

    - ``load()``
    - ``is_loaded``
    - ``predict(PreprocessedInput) -> PredictionResult``
    - ``metadata() -> ModelMetadata``
    """

    def __init__(self, model_path: str = "") -> None:
        self._model_path = model_path
        self._loaded = False

    def load(self) -> None:
        self._loaded = True

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    def predict(self, input_data: PreprocessedInput) -> PredictionResult:
        raise NotImplementedError(
            "SonarModelService.predict() is not yet implemented. "
            "Replace this class with the real model integration when "
            "the Colab model is finalized."
        )

    def metadata(self) -> ModelMetadata:
        return ModelMetadata(
            name="sonar-model",
            version="unimplemented",
            provider="sonar",
        )
