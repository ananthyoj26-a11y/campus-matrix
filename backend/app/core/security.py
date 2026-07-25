from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import auth, credentials
from app.core.config import settings

# Initialize Firebase Admin SDK
# In production, use a service account JSON file.
# For demo purposes, if not initialized, we will mock the auth verification or use default app.
try:
    if not firebase_admin._apps:
        # If running on a server with environment credentials or using default
        firebase_admin.initialize_app()
except Exception as e:
    print(f"Firebase Admin SDK initialization warning: {e}")

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Validate Firebase JWT token and extract user information.
    """
    token = credentials.credentials
    try:
        # Verify the Firebase token
        # This requires the Firebase Admin SDK to be properly initialized
        # with service account credentials in a real environment.
        decoded_token = auth.verify_id_token(token)
        user_id = decoded_token.get("uid")
        
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
        
        return {"id": user_id, "email": decoded_token.get("email")}
        
    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        # Fallback for development if Firebase Admin is not fully configured
        # DO NOT use in production
        import jwt
        try:
            # Decode unverified for dev fallback
            payload = jwt.decode(token, options={"verify_signature": False})
            user_id = payload.get("user_id") or payload.get("sub")
            if user_id:
                return {"id": user_id, "email": payload.get("email")}
        except:
            pass
            
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
