import os
from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings. Reads from environment variables (Vercel dashboard) or .env file."""
    
    # Required settings
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str
    
    # Optional / Legacy Supabase keys (prevents extra_forbidden errors if present in Vercel)
    SUPABASE_KEY: Optional[str] = None
    SUPABASE_ANON_KEY: Optional[str] = None

    # App settings with default fallbacks
    GEMINI_API_KEY: str = ""
    FRONTEND_URL: str = "http://localhost:5173"
    DATABASE_URL: Optional[str] = None
    DIRECT_URL: Optional[str] = None
    JWT_SECRET: str = "super-secret-jwt-key-campusmatrix"
    ENVIRONMENT: str = "development"

    # Modern Pydantic v2 configuration
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"  # Critical: Ignores extra environment variables instead of crashing
    )


settings = Settings()