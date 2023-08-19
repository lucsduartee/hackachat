import os
from dotenv import load_dotenv

load_dotenv()

def get_env(env: str) -> str | None:
    return os.getenv(env)