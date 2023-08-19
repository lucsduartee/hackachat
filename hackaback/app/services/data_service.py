import openai
from ..configs.env_config import get_env


class DataService:
    def __init__(self):
        openai.api_key = get_env("OPENAI_API_KEY")
        self.model = get_env("OPENAI_API_MODEL")