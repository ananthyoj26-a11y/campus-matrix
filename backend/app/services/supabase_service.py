from supabase import create_client, Client
from app.core.config import settings

class SupabaseService:
    def __init__(self):
        """Initialize the Supabase client."""
        self.supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

    async def get_user_profile(self, user_id: str):
        """Get user profile from Supabase."""
        response = self.supabase.table("profiles").select("*").eq("id", user_id).execute()
        if response.data:
            return response.data[0]
        return None

    async def update_user_profile(self, user_id: str, profile_data: dict):
        """Update user profile in Supabase."""
        response = self.supabase.table("profiles").update(profile_data).eq("id", user_id).execute()
        if response.data:
            return response.data[0]
        return None

    async def get_coding_problems(self):
        """Get all coding problems."""
        response = self.supabase.table("coding_problems").select("*").execute()
        return response.data

    async def submit_solution(self, user_id: str, submission: dict):
        """Submit a coding solution."""
        data = {
            "user_id": user_id,
            "problem_id": submission["problem_id"],
            "code": submission["code"],
            "language": submission["language"],
            "status": "pending" # Would be evaluated by a worker in a real app
        }
        response = self.supabase.table("submissions").insert(data).execute()
        if response.data:
            return response.data[0]
        return None

supabase_service = SupabaseService()
