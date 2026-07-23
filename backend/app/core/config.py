import os
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings. Reads from environment variables (Vercel dashboard) or .env file."""
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    GEMINI_API_KEY: str = ""
    FRONTEND_URL: str = "http://localhost:5173"
    DATABASE_URL: Optional[str] = None
    DIRECT_URL: Optional[str] = None
    JWT_SECRET: str = "super-secret-jwt-key-campusmatrix"
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
