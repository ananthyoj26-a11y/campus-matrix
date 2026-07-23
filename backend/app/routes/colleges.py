"""
College Routes — API endpoints for college information and web scraping.
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..services.scraper import (
    scrape_saranathan_overview,
    scrape_saranathan_faculty,
    scrape_saranathan_placements,
    scrape_saranathan_notices,
)

router = APIRouter(prefix="/api/colleges", tags=["colleges"])


# ─── Pre-populated College Data ──────────────────────────────────────────────

COLLEGES = [
    {
        "id": "saranathan-engineering",
        "name": "Saranathan College of Engineering",
        "location": "Tiruchirappalli, Tamil Nadu",
        "naac_grade": "A+",
        "established": 1998,
        "placement_rate": 95,
        "type": "Engineering",
        "website": "https://saranathan.ac.in/",
    },
    {
        "id": "nit-trichy",
        "name": "NIT Tiruchirappalli",
        "location": "Tiruchirappalli, Tamil Nadu",
        "naac_grade": "A++",
        "established": 1964,
        "placement_rate": 98,
        "type": "Engineering",
        "website": "https://www.nitt.edu/",
    },
    {
        "id": "iit-madras",
        "name": "IIT Madras",
        "location": "Chennai, Tamil Nadu",
        "naac_grade": "A++",
        "established": 1959,
        "placement_rate": 99,
        "type": "Engineering",
        "website": "https://www.iitm.ac.in/",
    },
]


@router.get("")
async def list_colleges(
    search: Optional[str] = Query(None, description="Search by name or location"),
    college_type: Optional[str] = Query(None, alias="type"),
):
    """List all colleges with optional search and type filtering."""
    results = COLLEGES
    if search:
        q = search.lower()
        results = [c for c in results if q in c["name"].lower() or q in c["location"].lower()]
    if college_type:
        results = [c for c in results if c["type"].lower() == college_type.lower()]
    return {"colleges": results, "total": len(results)}


@router.get("/search")
async def search_colleges(q: str = Query(..., min_length=1)):
    """Search colleges by query string."""
    query = q.lower()
    results = [c for c in COLLEGES if query in c["name"].lower() or query in c["location"].lower()]
    return {"results": results, "query": q}


@router.get("/{college_id}")
async def get_college(college_id: str):
    """Get detailed college information by slug ID."""
    college = next((c for c in COLLEGES if c["id"] == college_id), None)
    if not college:
        raise HTTPException(status_code=404, detail=f"College '{college_id}' not found")
    return college


@router.get("/saranathan/scrape/overview")
async def scrape_overview():
    """Scrape the official Saranathan College website for overview data."""
    data = await scrape_saranathan_overview()
    return {"status": "success", "data": data}


@router.get("/saranathan/scrape/faculty")
async def scrape_faculty():
    """Scrape faculty directory from the Saranathan College website."""
    data = await scrape_saranathan_faculty()
    return {"status": "success", "faculty": data, "count": len(data)}


@router.get("/saranathan/scrape/placements")
async def scrape_placements():
    """Scrape placement statistics from the Saranathan College website."""
    data = await scrape_saranathan_placements()
    return {"status": "success", "data": data}


@router.get("/saranathan/scrape/notices")
async def scrape_notices():
    """Scrape the latest notices and announcements from the Saranathan College website."""
    data = await scrape_saranathan_notices()
    return {"status": "success", "notices": data, "count": len(data)}
