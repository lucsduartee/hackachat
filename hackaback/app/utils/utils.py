from .constants import JOKER_MESSAGE
from ..schemas.question import Question

def get_real_prompt(prompt: str, messages: str) -> str:
    message = organize_messages(messages)

    return prompt.replace(JOKER_MESSAGE, message)

def organize_messages(messages: Question) -> str:
    organized_message = ""
    for message in messages:
        organized_message = f"{organized_message}{message.sender.upper()}: {message.text}\n"
    
    return organized_message