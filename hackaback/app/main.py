from fastapi import FastAPI
from .routers import questions
from fastapi.middleware.cors import CORSMiddleware
from .services.openai_service import DataService

DataService()

app = FastAPI()

app.include_router(questions.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
