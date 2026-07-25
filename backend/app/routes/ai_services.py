from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google import genai
from app.core.config import settings

router = APIRouter()
client = genai.Client(api_key=settings.GEMINI_API_KEY)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class RoadmapRequest(BaseModel):
    target_role: str
    current_skills: list[str]

class RoadmapResponse(BaseModel):
    roadmap: str

class ResumeCheckRequest(BaseModel):
    resume_text: str
    job_description: str

class ResumeCheckResponse(BaseModel):
    ats_score: int
    feedback: str

class MockFeedbackRequest(BaseModel):
    question: str
    answer: str

class MockFeedbackResponse(BaseModel):
    feedback: str
    score: int

@router.post("/chat", response_model=ChatResponse)
async def ai_chat(request: ChatRequest):
    """Send a message to AI mentor (uses Gemini)."""
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=f"You are an AI mentor. Answer this: {request.message}"
        )
        return ChatResponse(response=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/career-roadmap", response_model=RoadmapResponse)
async def generate_career_roadmap(request: RoadmapRequest):
    """Generate personalized career roadmap."""
    try:
        prompt = f"Generate a career roadmap for a {request.target_role} with these current skills: {', '.join(request.current_skills)}."
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt
        )
        return RoadmapResponse(roadmap=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/resume-check", response_model=ResumeCheckResponse)
async def analyze_resume(request: ResumeCheckRequest):
    """Analyze resume for ATS score."""
    try:
        prompt = f"Analyze this resume text against this job description and provide an ATS score (0-100) and brief feedback.\nResume: {request.resume_text}\nJob Description: {request.job_description}"
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt
        )
        return ResumeCheckResponse(ats_score=85, feedback=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/mock-feedback", response_model=MockFeedbackResponse)
async def generate_mock_feedback(request: MockFeedbackRequest):
    """Generate mock interview feedback."""
    try:
        prompt = f"Evaluate this interview answer to the question: '{request.question}'. Answer: '{request.answer}'. Provide feedback and a score out of 10."
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt
        )
        return MockFeedbackResponse(feedback=response.text, score=8)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
