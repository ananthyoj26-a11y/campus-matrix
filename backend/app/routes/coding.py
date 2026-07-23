from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.models.schemas import CodingSubmission, CodingProblem
from app.services.supabase_service import supabase_service
from typing import List

router = APIRouter()

@router.get("/problems", response_model=List[CodingProblem])
async def list_problems():
    """List coding problems."""
    problems = await supabase_service.get_coding_problems()
    return problems or []

@router.get("/problems/{id}", response_model=CodingProblem)
async def get_problem(id: str):
    """Get coding problem detail."""
    problems = await supabase_service.get_coding_problems()
    for p in problems:
        if p.get("id") == id:
            return p
    raise HTTPException(status_code=404, detail="Problem not found")

@router.post("/submit")
async def submit_solution(submission: CodingSubmission, current_user: dict = Depends(get_current_user)):
    """Submit a coding solution."""
    result = await supabase_service.submit_solution(current_user["id"], submission.model_dump())
    if not result:
        raise HTTPException(status_code=400, detail="Submission failed")
    return {"status": "success", "submission_id": result.get("id")}

@router.get("/submissions")
async def get_user_submissions(current_user: dict = Depends(get_current_user)):
    """Get user's coding submissions."""
    return [{"id": "sub1", "problem_id": "prob1", "status": "accepted"}]

@router.get("/daily-challenge")
async def get_daily_challenge():
    """Get today's coding challenge."""
    return {"id": "daily-1", "title": "Reverse Linked List"}
