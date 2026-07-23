import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings."""
    SUPABASE_URL: str
    SUPABASE_KEY: str
    GEMINI_API_KEY: str
    FRONTEND_URL: str = "http://localhost:5173"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
