from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass(frozen=True)
class PreprocessedInput:
    """Framework-independent container for preprocessed data.

    The ``data`` payload can hold any representation the downstream model
    requires (NumPy array, Torch tensor, raw list, etc.).  The rest of the
    application only interacts with this wrapper and never inspects ``data``
    directly.
    """

    data: Any


@dataclass(frozen=True)
class PredictionResult:
    """Standardised prediction output returned by every ``ModelService``."""

    label: str
    confidence: float
    raw_scores: dict[str, float] = field(default_factory=dict)


@dataclass(frozen=True)
class ModelMetadata:
    """Standardised metadata about a loaded model."""

    name: str
    version: str
    provider: str
