
from app.database import SessionLocal
from app.models.user import User
from app.services.auth_service import hash_password

db = SessionLocal()
user = db.query(User).filter(User.email == "test@example.com").first()
if user:
    user.hashed_password = hash_password("password123")
    db.commit()
    print(f"Updated password for {user.email} to 'password123'")
else:
    print("User test@example.com not found")
db.close()
