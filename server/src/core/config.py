import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    DATABASE_SYNC_URL:str = os.getenv("DATABASE_SYNC_URL")
    JWT_SECRET:str = os.getenv("JWT_SECRET_KEY")

settings = Settings() 