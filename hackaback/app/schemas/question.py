from typing import List
from pydantic import BaseModel
from ..schemas.message import Message

class Question(BaseModel):
    messages: List[Message]