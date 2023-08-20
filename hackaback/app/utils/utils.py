from .constants import JOKER_MESSAGE
from ..schemas.question import Question
from typing import List
from ..schemas.message import Message

def get_real_prompt(prompt: str, messages: List[Message]) -> str:
    message = "["

    for i in messages:
        message = f'{message}{{ "role": {i.sender}, "content": {i.text} }},'
    
    message = f'{message}]'

    return prompt.replace(JOKER_MESSAGE, message)