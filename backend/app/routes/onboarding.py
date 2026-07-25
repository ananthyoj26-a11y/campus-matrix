from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
from app.core.config import get_supabase_client

router = APIRouter()

class OnboardingData(BaseModel):
    step: int
    data: Dict[str, Any]

@router.post("/save-progress")
async def save_onboarding_progress(
    payload: OnboardingData,
    # In a real app, user_id would come from auth dependency
    user_id: str = "test-user-id" 
):
    """
    Save partial onboarding progress.
    """
    supabase = get_supabase_client()
    try:
        # Determine which table to update based on the step
        # This is a simplified handler that will route data to correct tables
        if payload.step == 1:
            # Personal Info -> profiles
            supabase.table("profiles").update(payload.data).eq("id", user_id).execute()
        elif payload.step == 2:
            # Academic -> academic_history
            pass 
        
        # Update user's current onboarding step
        supabase.table("profiles").update({"onboarding_step": payload.step + 1}).eq("id", user_id).execute()
        
        return {"status": "success", "message": "Progress saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/complete")
async def complete_onboarding(user_id: str = "test-user-id"):
    """Mark onboarding as fully completed."""
    supabase = get_supabase_client()
    try:
        supabase.table("profiles").update({"onboarding_completed": True}).eq("id", user_id).execute()
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
