from fastapi import APIRouter, Body
from pydantic import BaseModel
import requests

# ============================================
# ROUTER
# ============================================

router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)

# ============================================
# OLLAMA CONFIG
# ============================================

OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
OLLAMA_MODEL = "llama3"

# ============================================
# REQUEST MODEL
# ============================================

class ChatRequest(BaseModel):
    message: str

# ============================================
# SIMPLE CHAT ROUTE
# ============================================

@router.post("")
async def simple_chat(request: ChatRequest):

    try:

        user_message = request.message

        if not user_message.strip():

            return {
                "response": "Please enter a message."
            }

        print("===================================")
        print("USER MESSAGE:", user_message)
        print("===================================")

        # Send request to Ollama
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": OLLAMA_MODEL,
                "prompt": user_message,
                "stream": False
            },
            timeout=120
        )

        print("OLLAMA STATUS:", response.status_code)
        print("OLLAMA RAW:", response.text)

        # Convert JSON
        data = response.json()

        ai_response = data.get("response", "")

        if not ai_response:

            ai_response = "AI returned an empty response."

        return {
            "response": ai_response
        }

    except Exception as e:

        print("CHAT ERROR:", str(e))

        return {
            "response": f"Error: {str(e)}"
        }