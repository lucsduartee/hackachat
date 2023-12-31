import json
import openai
from ..configs.env_config import get_env
from ..utils.constants import ( SYSTEM_RANDOM_BEHAVIOR, SYSTEM_CONVERSATION_BEHAVIOR, BASE_PROMPT, SYSTEM_RECOMENDATION_BEHAVIOR, SYSTEM_CONCLUSION_BEHAVIOR )
from ..utils.utils import get_real_prompt
from openai.embeddings_utils import ( get_embedding, cosine_similarity )
from .data_service import DataService

data_service = DataService()

class OpenAIService:
    def __init__(self) -> None:
        openai.api_key = get_env("OPENAI_API_KEY")
        self.completion_model = get_env("OPENAI_API_COMPLETION_MODEL")
        self.embedding_model = get_env("OPENAI_API_EMBEDDING_MODEL")

    # def get_classified_itentions(self, messages):
    #     return self.__get_intentions(messages, SYSTEM_CLASSIFIER_BEHAVIOR)

    def __check_intentions(self, messages):
        
        response = self.__get_intentions(get_real_prompt(BASE_PROMPT, messages))

        intent = json.loads(response)["intent"]

        if intent == "0":
            return self.__get_intentions(get_real_prompt(SYSTEM_RANDOM_BEHAVIOR, messages))
        elif intent == "1":
            return self.__get_intentions(get_real_prompt(SYSTEM_CONVERSATION_BEHAVIOR, messages))
        elif intent == "2":
            return self.__get_intentions(get_real_prompt(SYSTEM_RECOMENDATION_BEHAVIOR, messages))
        elif intent == "3":
            return self.__get_intentions(get_real_prompt(SYSTEM_CONCLUSION_BEHAVIOR, messages))
            

    def get_course_itentions(self, messages):
        return self.__get_intentions(messages, BASE_PROMPT)

    def __get_intentions(self, messages_conversation):
        response = openai.ChatCompletion.create(
            model = self.completion_model,
            messages = [
                { "role": "system", "content": "Você é um assistente prestativo, retorne um json para cada respota" },
                { "role": "user",  "content": messages_conversation }
            ]
        )
        
        return response["choices"][0]["message"]["content"]

    def get_courses(self, course_keywords_concat, n = 5):
        try:
            df = data_service.get_df() 
            course_embedding = get_embedding(course_keywords_concat, engine=self.embedding_model)

            df["similarities"] = df["ada_embedding"].apply(lambda d: cosine_similarity(d, course_embedding))

            res = df.sort_values("similarities", ascending = False).head(n)

            courses = []
            for course, tag, url, price in zip(res["course"], res["tag"], res["url"], res["price"]):
                courses.append({"course": course, "tag": tag, "url": url, "price": price })

            return courses
        except Exception as e:
            print(e)
            return None
    
    def get_response(self, messages):
        try:
            res_gpt = self.__check_intentions(messages)

            res_gpt = json.loads(res_gpt)
            
            if (res_gpt["intent"]) == "3":
                course_keywords_concat = ', '.join(res_gpt['keywords'])
                courses = self.get_courses(course_keywords_concat)
                return { "answer": res_gpt["chat_response"], "courses": courses }

            
            return { "answer": res_gpt["chat_response"] }
        except Exception as e:
            print(e)
            return None
    

