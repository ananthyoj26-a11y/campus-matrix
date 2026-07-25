from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class AcademicHistory(BaseModel):
    degree: str
    institution: str
    year: int

class FullProfileResponse(BaseModel):
    user_id: str
    name: str
    academic_history: List[AcademicHistory] = []
    skills: List[str] = []
    career_goals: str = ""

class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    skills: Optional[List[str]] = None
    career_goals: Optional[str] = None

class DocumentMetadata(BaseModel):
    doc_id: str
    filename: str
    doc_type: str
    url: str

class DocumentCreate(BaseModel):
    filename: str
    doc_type: str
    url: str

@router.get("/{user_id}", response_model=FullProfileResponse)
async def get_full_profile(user_id: str):
    """Get full user profile."""
    return FullProfileResponse(user_id=user_id, name="User Name")

@router.put("/{user_id}", response_model=FullProfileResponse)
async def update_profile(user_id: str, request: ProfileUpdateRequest):
    """Update profile."""
    return FullProfileResponse(
        user_id=user_id, 
        name=request.name or "User Name", 
        skills=request.skills or [], 
        career_goals=request.career_goals or ""
    )

@router.get("/{user_id}/documents", response_model=List[DocumentMetadata])
async def list_user_documents(user_id: str):
    """List user documents."""
    return []

@router.post("/{user_id}/documents", response_model=DocumentMetadata)
async def upload_document_metadata(user_id: str, doc: DocumentCreate):
    """Upload document metadata."""
    return DocumentMetadata(
        doc_id="doc_1", 
        filename=doc.filename, 
        doc_type=doc.doc_type, 
        url=doc.url
    )
