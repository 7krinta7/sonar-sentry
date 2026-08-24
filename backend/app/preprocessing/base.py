from abc import ABC, abstractmethod
from typing import Any


class Preprocessor(ABC):
    """Interface for transforming raw inputs into model-ready form.

    A future implementation will handle image resizing, normalization,
    channel conversion, tensor conversion and any sonar-specific
    preprocessing. Nothing sonar-specific is implemented yet.
    """

    @abstractmethod
    def preprocess(self, raw_input: Any) -> Any:
        """Convert a raw input into the format expected by the model."""
