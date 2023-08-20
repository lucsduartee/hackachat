from .constants import JOKER_MESSAGE

def get_real_prompt(prompt: str, user_message: str) -> str:
    return prompt.replace(JOKER_MESSAGE, user_message)