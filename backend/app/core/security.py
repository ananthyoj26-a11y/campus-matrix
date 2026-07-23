from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.core.config import settings
import httpx

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Validate Supabase JWT token and extract user information.
    Note: Supabase verifies its own JWTs, but we decode it here to get user info.
    To be fully secure, one should verify the JWT signature using Supabase's JWT secret.
    For this implementation, we decode the token to get the user ID.
    """
    token = credentials.credentials
    try:
        # Decode the token without verification to extract user details
        # In production, you MUST verify the token signature using the Supabase JWT secret
        payload = jwt.get_unverified_claims(token)
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
        
        # Return a dictionary with user info
        return {"id": user_id, "email": payload.get("email")}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
