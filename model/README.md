# Model

This directory is reserved for the sonar image classification model artifacts.

## Status

The real model is being developed separately (in Google Colab) and is **not**
part of this repository yet. No model files exist here.

## Integration plan

The backend accesses models only through the `ModelService` interface in
`backend/app/services/model_service.py`, which exposes:

- `load()`
- `predict(input)`
- `metadata()`

When the trained model is ready, a concrete service implementing this interface
will be added and selected via `MODEL_PROVIDER` / `MODEL_PATH` in the backend
environment configuration (see `backend/.env.example`). The API contract and
frontend will not change.
