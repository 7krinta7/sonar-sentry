from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool


class ErrorDetail(BaseModel):
    code: str
    message: str


class ErrorResponse(BaseModel):
    success: bool = False
    error: ErrorDetail
    request_id: str | None = None


class ModelInfo(BaseModel):
    name: str
    version: str
    provider: str


class PredictionData(BaseModel):
    label: str
    confidence: float
    raw_scores: dict[str, float]


class PredictionResponse(BaseModel):
    success: bool = True
    prediction: PredictionData
    model: ModelInfo
    request_id: str
