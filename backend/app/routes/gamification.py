from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.models.schemas import LeaderboardEntry, DailyActivity
from typing import List

router = APIRouter()

@router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard():
    """Get global leaderboard."""
    return [
        {"user_id": "u1", "name": "Alice", "xp": 5000, "rank": 1},
        {"user_id": "u2", "name": "Bob", "xp": 4500, "rank": 2}
    ]

@router.get("/streak")
async def get_user_streak(current_user: dict = Depends(get_current_user)):
    """Get user streak info."""
    return {"current_streak": 5, "longest_streak": 12}

@router.post("/activity")
async def log_activity(activity: DailyActivity, current_user: dict = Depends(get_current_user)):
    """Log daily activity and earn XP."""
    return {"status": "success", "xp_earned": activity.xp_earned}

@router.get("/badges")
async def get_user_badges(current_user: dict = Depends(get_current_user)):
    """Get user badges."""
    return [{"id": "b1", "name": "First Blood", "icon_url": "/badges/first.png"}]
