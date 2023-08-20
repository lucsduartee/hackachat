from typing import List
from pydantic import BaseModel

class Question(BaseModel):
    text: str