from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.services.auth_service import hash_password, verify_password, create_access_token
from app.middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


# ── Request / Response Schemas ──────────────────────────────────────

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    token: str
    user: dict

class UserResponse(BaseModel):
    id: int
    username: str
    email: str


# ── Routes ──────────────────────────────────────────────────────────

@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    """Register a new user account."""
    # Check if email already exists
    if db.query(User).filter(User.email == req.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Check if username already exists
    if db.query(User).filter(User.username == req.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    # Validate password length
    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    # Create user
    user = User(
        username=req.username,
        email=req.email,
        hashed_password=hash_password(req.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    print(f"DEBUG: User registered successfully: {user.username} ({user.email})")

    # Generate JWT token
    token = create_access_token(user.id, user.username)

    return {
        "token": token,
        "user": {"id": user.id, "username": user.username, "email": user.email}
    }


@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    """Login with email and password."""
    print(f"DEBUG: Login attempt for email: {req.email}")
    user = db.query(User).filter(User.email == req.email).first()

    if not user:
        print(f"DEBUG: Login failed - User not found: {req.email}")
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(req.password, user.hashed_password):
        print(f"DEBUG: Login failed - Incorrect password for: {req.email}")
        raise HTTPException(status_code=401, detail="Invalid email or password")

    print(f"DEBUG: Login successful: {user.username}")
    token = create_access_token(user.id, user.username)

    return {
        "token": token,
        "user": {"id": user.id, "username": user.username, "email": user.email}
    }


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Get the currently authenticated user's profile."""
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }
