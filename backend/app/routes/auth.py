from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.models.schemas import UserProfile, UserProfileUpdate
from app.services.supabase_service import supabase_service

router = APIRouter()

@router.get("/me", response_model=dict)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current logged in user information."""
    return current_user

@router.get("/profile", response_model=UserProfile)
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Get user profile."""
    profile = await supabase_service.get_user_profile(current_user["id"])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("/profile", response_model=UserProfile)
async def create_profile(profile_data: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    """Create or update user profile."""
    updated = await supabase_service.update_user_profile(current_user["id"], profile_data.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=400, detail="Failed to update profile")
    return updated

@router.put("/profile", response_model=UserProfile)
async def update_profile(profile_data: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    """Update user profile."""
    updated = await supabase_service.update_user_profile(current_user["id"], profile_data.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=400, detail="Failed to update profile")
    return updated
