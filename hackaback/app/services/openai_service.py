import json
import openai
from ..configs.env_config import get_env
from ..utils.constants import ( SYSTEM_CLASSIFIER_BEHAVIOR, SYSTEM_COURSES_BEHAVIOR )
from ..utils.utils import get_real_prompt
from openai.embeddings_utils import ( get_embedding, cosine_similarity )
from .data_service import DataService

class OpenAIService:
    def __init__(self) -> None:
        openai.api_key = get_env("OPENAI_API_KEY")
        self.completion_model = get_env("OPENAI_API_COMPLETION_MODEL")
        self.embedding_model = get_env("OPENAI_API_EMBEDDING_MODEL")
        self.df = DataService().get_df()

    # def get_classified_itentions(self, messages):
    #     return self.__get_intentions(messages, SYSTEM_CLASSIFIER_BEHAVIOR)

    def get_course_itentions(self, messages):
        return self.__get_intentions(messages, SYSTEM_COURSES_BEHAVIOR)

    def __get_intentions(self, messages_conversation, system_behavior):
        prompt = get_real_prompt(system_behavior, messages_conversation)
        response = openai.ChatCompletion.create(
            model = self.completion_model,
            messages = [
                { "role": "system", "content": "Você é um assistente prestativo, sempre retorne um json para toda resposta" },
                { "role": "user",  "content": prompt } 
            ]
        )
        
        return response["choices"][0]["message"]["content"]

    def get_courses(self, course_keywords_concat, n = 3):
        try: 
            course_embedding = get_embedding(course_keywords_concat, engine=self.embedding_model)

            self.df["similarities"] = self.df["ada_embedding"].apply(lambda d: cosine_similarity(d, course_embedding))

            res = self.df.sort_values("similarities", ascending = False).head(n)

            courses = []
            for course, tag, url, price in zip(res["course"], res["tag"], res["url"], res["price"]):
                courses.append({"course": course, "tag": tag, "url": url, "price": price })

            return courses
        except Exception as e:
            print(e)
            return None
    
    def get_response(self, messages):
        try:
            self.get_course_itentions(messages)

            res_gpt = json.loads(res_gpt)
            
            if (res_gpt["intent"]) == "2":
                course_keywords = ', '.join(res_gpt['keywords'])
                courses = semantic_search_service.search_course(course_keywords)
                return { "answer": res_gpt["chat_response"], "courses": courses }

            
            return { "answer": res_gpt["chat_response"] }
        except Exception as e:
            print(e)
            return None
    

