from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class DiscussionCreate(BaseModel):
    title: str
    content: str
    tags: Optional[List[str]] = []

class DiscussionResponse(BaseModel):
    id: str
    title: str
    content: str
    tags: List[str] = []
    author_id: str
    likes_count: int = 0

class CommentCreate(BaseModel):
    content: str

class CommentResponse(BaseModel):
    id: str
    content: str
    author_id: str

class DiscussionDetailResponse(DiscussionResponse):
    comments: List[CommentResponse] = []

class ClubResponse(BaseModel):
    id: str
    name: str
    description: str
    members_count: int = 0

@router.get("/discussions", response_model=List[DiscussionResponse])
async def list_discussions():
    """List forum discussions."""
    return []

@router.post("/discussions", response_model=DiscussionResponse)
async def create_discussion(discussion: DiscussionCreate):
    """Create a discussion."""
    return DiscussionResponse(
        id="1", 
        title=discussion.title, 
        content=discussion.content, 
        tags=discussion.tags or [], 
        author_id="user1"
    )

@router.get("/discussions/{id}", response_model=DiscussionDetailResponse)
async def get_discussion(id: str):
    """Get discussion with comments."""
    return DiscussionDetailResponse(
        id=id, 
        title="Sample Discussion", 
        content="Sample content", 
        author_id="user1"
    )

@router.post("/discussions/{id}/comments", response_model=CommentResponse)
async def add_comment(id: str, comment: CommentCreate):
    """Add a comment."""
    return CommentResponse(id="c1", content=comment.content, author_id="user1")

@router.post("/discussions/{id}/like")
async def like_discussion(id: str):
    """Like a discussion."""
    return {"message": "Discussion liked"}

@router.get("/clubs", response_model=List[ClubResponse])
async def list_clubs():
    """List clubs."""
    return []

@router.post("/clubs/{id}/join")
async def join_club(id: str):
    """Join a club."""
    return {"message": "Joined club successfully"}
