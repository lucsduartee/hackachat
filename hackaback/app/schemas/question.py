from typing import List
from pydantic import BaseModel
from .message import Message

class Question(BaseModel):
    messages: List[Message]