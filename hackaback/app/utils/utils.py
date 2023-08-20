from .constants import JOKER_MESSAGE
from ..schemas.question import Question
from typing import List
from ..schemas.message import Message

def get_real_prompt(prompt: str, messages: List[Message]) -> str:
    flow_conversation = ""

    for message in messages:
        if message.sender == "user": 
            flow_conversation = f"{flow_conversation}CLIENTE" 
        else: 
            flow_conversation = f"{flow_conversation}VENDEDOR"
        
        flow_conversation = f"{flow_conversation} - {message.text}\n"
    

    return prompt.replace(JOKER_MESSAGE, flow_conversation)