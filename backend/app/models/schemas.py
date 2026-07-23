from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    skills: Optional[List[str]] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None

class UserProfile(UserProfileUpdate):
    id: str
    email: str
    created_at: datetime
    xp: int = 0
    level: int = 1

class CodingProblem(BaseModel):
    id: str
    title: str
    description: str
    difficulty: str
    tags: List[str]
    starter_code: str
    test_cases: List[Dict[str, Any]]

class CodingSubmission(BaseModel):
    problem_id: str
    code: str
    language: str = "python"

class InterviewStart(BaseModel):
    interview_type: str
    role: str

class InterviewMessage(BaseModel):
    role: str
    content: str

class InterviewFeedback(BaseModel):
    score: int
    strengths: List[str]
    weaknesses: List[str]
    feedback: str

class JobListing(BaseModel):
    id: str
    title: str
    company: str
    location: str
    description: str
    requirements: List[str]
    salary_range: Optional[str] = None
    posted_at: datetime

class JobApplication(BaseModel):
    job_id: str
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    message: str

class CareerRecommendation(BaseModel):
    recommended_tracks: List[str]
    reasoning: str
    next_steps: List[str]

class DailyActivity(BaseModel):
    activity_type: str
    description: str
    xp_earned: int

class LeaderboardEntry(BaseModel):
    user_id: str
    name: str
    xp: int
    rank: int
