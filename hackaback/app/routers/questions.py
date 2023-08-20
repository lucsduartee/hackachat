from fastapi import APIRouter
from ..schemas.question import Question

router = APIRouter(
    prefix="/questions",
    tags=["questions"]
)

@router.post("/")
async def create_question(question: Question):
    return question.text