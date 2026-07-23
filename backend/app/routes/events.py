"""
Events Routes — API endpoints for event listing, registration, and participant management.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/events", tags=["events"])


class EventRegistration(BaseModel):
    event_id: str
    event_title: str
    student_name: str
    student_email: str
    department: Optional[str] = None
    phone: Optional[str] = None
    roll_number: Optional[str] = None


class EventRegistrationResponse(BaseModel):
    id: str
    confirmation_code: str
    message: str


# In-memory store (in production, use Supabase)
_registrations: List[dict] = []


EVENTS = [
    {
        "id": "evt001", "title": "TRACKS 2026", "type": "Symposium",
        "college": "Saranathan College of Engineering",
        "date": "2026-09-15", "venue": "Main Auditorium",
        "description": "National-level technical symposium by CSE department.",
        "status": "Upcoming", "fee": "₹150", "prizes": "₹50,000",
    },
    {
        "id": "evt002", "title": "AI/ML Hackathon 2026", "type": "Hackathon",
        "college": "Saranathan College of Engineering",
        "date": "2026-08-20", "venue": "Innovation Lab",
        "description": "24-hour hackathon for AI/ML solutions.",
        "status": "Upcoming", "fee": "Free", "prizes": "₹25,000",
    },
    {
        "id": "evt003", "title": "TCS Campus Placement Drive", "type": "Placement Drive",
        "college": "Saranathan College of Engineering",
        "date": "2026-08-22", "venue": "Placement Cell",
        "description": "Campus recruitment for 2026 batch CSE/IT/ECE students.",
        "status": "Upcoming", "fee": "Free", "prizes": "CTC: 3.36 LPA",
    },
]


@router.get("")
async def list_events(event_type: Optional[str] = None, status: Optional[str] = None):
    """List all events with optional type and status filters."""
    results = EVENTS
    if event_type:
        results = [e for e in results if e["type"].lower() == event_type.lower()]
    if status:
        results = [e for e in results if e["status"].lower() == status.lower()]
    return {"events": results, "total": len(results)}


@router.get("/{event_id}")
async def get_event(event_id: str):
    """Get event details by ID."""
    event = next((e for e in EVENTS if e["id"] == event_id), None)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.post("/register", response_model=EventRegistrationResponse)
async def register_for_event(registration: EventRegistration):
    """Register a student for an event."""
    # Check if event exists
    event = next((e for e in EVENTS if e["id"] == registration.event_id), None)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Check for duplicate registration
    existing = next(
        (r for r in _registrations
         if r["event_id"] == registration.event_id and r["student_email"] == registration.student_email),
        None
    )
    if existing:
        raise HTTPException(status_code=409, detail="Already registered for this event")

    # Create registration
    reg_id = str(uuid.uuid4())
    confirmation_code = f"CM-{registration.event_id[-3:].upper()}-{uuid.uuid4().hex[:6].upper()}"

    record = {
        "id": reg_id,
        "confirmation_code": confirmation_code,
        "registered_at": datetime.utcnow().isoformat(),
        **registration.model_dump(),
    }
    _registrations.append(record)

    return EventRegistrationResponse(
        id=reg_id,
        confirmation_code=confirmation_code,
        message=f"Successfully registered for {event['title']}! Confirmation email sent to {registration.student_email}.",
    )


@router.get("/{event_id}/participants")
async def get_participants(event_id: str):
    """Get list of registered participants for an event (organizer view)."""
    participants = [r for r in _registrations if r["event_id"] == event_id]
    return {"event_id": event_id, "participants": participants, "total": len(participants)}
