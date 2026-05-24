import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """Application configuration settings."""
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "default_secret_change_me")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 720
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./chatbot.db")
    HF_API_TOKEN: str = os.getenv("HF_API_TOKEN", "")

settings = Settings()
