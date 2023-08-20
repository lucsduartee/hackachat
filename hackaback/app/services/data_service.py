import os
import pandas as pd
import numpy as np
import openai
from openai.embeddings_utils import get_embedding
from ..configs.env_config import get_env

# caminho absoluto do diretório atual
current_dir = os.path.dirname(os.path.abspath(__file__))

# caminho absoluto para resources files
raw_data = os.path.join(current_dir, "../resources/data.json")
embeddings_path = os.path.join(current_dir, "../resources/data.csv")

class DataService:
    def __init__(self):
        self.embedding_model = get_env("OPENAI_API_EMBEDDING_MODEL")
        openai.api_key = get_env("OPENAI_API_KEY")
        self.__load_df()
    
    def __load_df(self):
        if not os.path.exists(embeddings_path):
            self.df = pd.read_json(raw_data)
            self.df.drop_duplicates(subset=["url"], inplace = True) # remove cursos duplicados com base na URL
            self.df.dropna(inplace = True) # remove None
            self.df["ada_embedding"] = self.df.page_content.apply(lambda d: get_embedding(d, engine = self.embedding_model))
            self.df["ada_embedding"] = self.df["ada_embedding"].to_numpy()
            self.df.to_csv(embeddings_path, index = False)
        else:
            self.df = pd.read_csv(embeddings_path)
            self.df["ada_embedding"] = self.df["ada_embedding"].apply(eval).apply(np.array)

    def get_df(self):
        return self.df
