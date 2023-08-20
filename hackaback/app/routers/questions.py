from fastapi import APIRouter
from ..schemas.question import Question
from ..services.openai_service import OpenAIService

openai_service = OpenAIService()

router = APIRouter(
    prefix="/questions",
    tags=["questions"]
)

@router.post("/")
async def create_question(question: Question):
    return openai_service.get_response(question.messages)
