from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes import auth, career, coding, interview, jobs, gamification, analytics, admin, colleges, events

app = FastAPI(title="CampusMatrix API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Startup event."""
    print("Starting up CampusMatrix API...")
    print(f"Frontend URL allowed: {settings.FRONTEND_URL}")

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "version": "1.0.0"}

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(career.router, prefix="/api/career", tags=["Career"])
app.include_router(coding.router, prefix="/api/coding", tags=["Coding"])
app.include_router(interview.router, prefix="/api/interview", tags=["Interview"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])
app.include_router(gamification.router, prefix="/api/gamification", tags=["Gamification"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(colleges.router)
app.include_router(events.router)
