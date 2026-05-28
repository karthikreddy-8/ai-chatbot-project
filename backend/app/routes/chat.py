from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os

# ============================================
# ROUTER
# ============================================

router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)

# ============================================
# GEMINI CONFIG
# ============================================

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

# ============================================
# REQUEST MODEL
# ============================================

class ChatRequest(BaseModel):
    message: str

# ============================================
# CHAT ROUTE
# ============================================

@router.post("")
async def simple_chat(request: ChatRequest):

    try:

        user_message = request.message

        if not user_message.strip():

            return {
                "response": "Please enter a message."
            }

        response = model.generate_content(user_message)

        return {
            "response": response.text
        }

    except Exception as e:

        return {
            "response": f"Error: {str(e)}"
        }