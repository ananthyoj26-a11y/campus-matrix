from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()

@router.get("/overview")
async def get_analytics_overview(current_user: dict = Depends(get_current_user)):
    """Get user analytics summary."""
    return {
        "total_xp": 1200,
        "problems_solved": 45,
        "interviews_completed": 3,
        "jobs_applied": 12
    }

@router.get("/xp-history")
async def get_xp_history(current_user: dict = Depends(get_current_user)):
    """Get XP earned over time."""
    return [
        {"date": "2023-10-01", "xp": 50},
        {"date": "2023-10-02", "xp": 100}
    ]

@router.get("/problem-stats")
async def get_problem_stats(current_user: dict = Depends(get_current_user)):
    """Get coding problem statistics."""
    return {
        "easy": 20,
        "medium": 15,
        "hard": 10,
        "accuracy": 78.5
    }

@router.get("/interview-stats")
async def get_interview_stats(current_user: dict = Depends(get_current_user)):
    """Get interview performance stats."""
    return {
        "average_score": 82,
        "strengths": ["Data Structures", "Communication"],
        "weaknesses": ["System Design"]
    }
