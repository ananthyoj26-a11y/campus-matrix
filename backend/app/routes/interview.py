from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.models.schemas import InterviewStart, ChatRequest, InterviewFeedback
from app.services.gemini_service import gemini_service
import uuid

router = APIRouter()

@router.post("/start")
async def start_interview(start_req: InterviewStart, current_user: dict = Depends(get_current_user)):
    """Start an interview session."""
    session_id = str(uuid.uuid4())
    initial_prompt = f"Hi! I'm ready to begin the {start_req.interview_type} interview for the {start_req.role} position."
    
    response = await gemini_service.conduct_interview(
        [{"role": "user", "content": initial_prompt}], 
        start_req.interview_type, 
        start_req.role
    )
    
    return {
        "session_id": session_id,
        "message": response
    }

@router.post("/respond")
async def respond_to_interview(req: ChatRequest, current_user: dict = Depends(get_current_user)):
    """Send an answer and get the next question."""
    history = [msg.model_dump() for msg in req.messages]
    
    # In a real app, retrieve context (interview_type, role) from session storage
    response = await gemini_service.conduct_interview(history, "technical", "Software Engineer")
    return {"message": response}

@router.post("/end", response_model=InterviewFeedback)
async def end_interview(req: ChatRequest, current_user: dict = Depends(get_current_user)):
    """End the interview and get feedback."""
    history = [msg.model_dump() for msg in req.messages]
    feedback = await gemini_service.generate_interview_feedback(history)
    return feedback

@router.get("/history")
async def get_interview_history(current_user: dict = Depends(get_current_user)):
    """Get user's past interviews."""
    return [{"id": "int1", "date": "2023-10-01", "role": "Frontend", "score": 85}]
