import openai
from ..configs.env_config import get_env
from ..utils.constants import ( SYSTEM_CLASSIFIER_BEHAVIOR, SYSTEM_COURSES_BEHAVIOR )
from ..utils.utils import get_real_prompt

class OpenAIService:
    def __init__(self) -> None:
        openai.api_key = get_env("OPENAI_API_KEY")
        self.completion_model = get_env("OPENAI_API_COMPLETION_MODEL")
        self.embedding_model = get_env("OPENAI_API_EMBEDDING_MODEL")

    def get_classified_itentions(self, text):
        return self.__get_intentions(text, SYSTEM_CLASSIFIER_BEHAVIOR)

    def get_course_itentions(self, text):
        return self.__get_intentions(text, SYSTEM_COURSES_BEHAVIOR)

    def __get_intentions(self, text, system_behavior):
        prompt = get_real_prompt(system_behavior, text)
        response = openai.ChatCompletion.create(
            model = self.completion_model,
            messages = [
                { "role": "system", "content": "Você é um assistente prestativo, sempre retorne um json para toda resposta" },
                { "role": "user",  "content": prompt } 
            ]
        )
        
        return response["choices"][0]["message"]["content"]
    
    def get_response(self, text):
        try:
            return self.get_course_itentions(text)
        except Exception as e:
            print(e)
            return None
    

