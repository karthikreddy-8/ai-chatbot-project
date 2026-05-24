
from app.database import SessionLocal
from app.models.user import User

db = SessionLocal()
users = db.query(User).all()
print(f"Found {len(users)} users.")
for user in users:
    print(f"ID: {user.id}, Username: {user.username}, Email: {user.email}")
db.close()
