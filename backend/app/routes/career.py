from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.services.gemini_service import gemini_service
import json

router = APIRouter()

@router.get("/roadmaps")
async def list_roadmaps():
    """List available career tracks."""
    return [
        {"id": "frontend", "name": "Frontend Developer"},
        {"id": "backend", "name": "Backend Developer"},
        {"id": "data-science", "name": "Data Scientist"}
    ]

@router.get("/roadmaps/{track}/progress")
async def get_roadmap_progress(track: str, current_user: dict = Depends(get_current_user)):
    """Get user progress for a specific career track."""
    return {"track": track, "progress": 45, "completed_nodes": ["html", "css", "js-basics"]}

@router.post("/roadmaps/{track}/complete")
async def mark_skill_complete(track: str, skill: str, current_user: dict = Depends(get_current_user)):
    """Mark a skill as completed."""
    return {"status": "success", "message": f"Skill {skill} marked complete in track {track}"}

@router.get("/recommend")
async def get_career_recommendation(current_user: dict = Depends(get_current_user)):
    """Get AI career recommendation."""
    # Mock data for demonstration
    user_profile = {"name": "Test User", "interests": ["web dev", "python"]}
    completed_skills = ["python basics", "fastapi"]
    
    recommendation_json = await gemini_service.generate_career_recommendation(user_profile, completed_skills)
    return json.loads(recommendation_json)
