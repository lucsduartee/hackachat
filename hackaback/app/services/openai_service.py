import openai
from ..configs.env_config import get_env
from ..utils.constants import ( SYSTEM_CLASSIFIER_BEHAVIOR, SYSTEM_COURSES_BEHAVIOR )
from ..utils.utils import get_real_prompt

class OpenAIService:
    def __init__(self) -> None:
        openai.api_key = get_env("OPENAI_API_KEY")
        self.completion_model = get_env("OPENAI_API_COMPLETION_MODEL")
        self.embedding_model = get_env("OPENAI_API_EMBEDDING_MODEL")

    # def get_classified_itentions(self, messages):
    #     return self.__get_intentions(messages, SYSTEM_CLASSIFIER_BEHAVIOR)

    def get_course_itentions(self, messages):
        return self.__get_intentions(messages, SYSTEM_COURSES_BEHAVIOR)

    def __get_intentions(self, messages, system_behavior):
        prompt = get_real_prompt(system_behavior, messages)
        response = openai.ChatCompletion.create(
            model = self.completion_model,
            messages = [
                { "role": "system", "content": "Você é um assistente prestativo, sempre retorne um json para toda resposta" },
                { "role": "user",  "content": prompt } 
            ]
        )
        
        return response["choices"][0]["message"]["content"]
    
    def get_response(self, messages):
        try:
            return self.get_course_itentions(messages)
        except Exception as e:
            print(e)
            return None
    

