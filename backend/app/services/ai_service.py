import requests
from app.config import settings

# =========================================================
# OLLAMA CONFIGURATION
# =========================================================

OLLAMA_BASE_URL = "http://127.0.0.1:11434"
OLLAMA_API_ENDPOINT = f"{OLLAMA_BASE_URL}/api/generate"
OLLAMA_MODEL = "llama3"

# =========================================================
# SYSTEM PROMPT
# =========================================================

SYSTEM_INSTRUCTION = """
You are an advanced AI assistant built into a futuristic chatbot platform.

You are:
- Helpful
- Friendly
- Intelligent
- Creative
- Professional

You can:
- Answer questions
- Write code
- Debug programs
- Explain concepts
- Solve problems
- Generate creative content
- Help with research

Always respond clearly and helpfully.
"""

# =========================================================
# AI RESPONSE FUNCTION
# =========================================================

def get_ai_response(messages: list[dict]) -> str:

    try:

        print("===================================")
        print("NEXUS AI SERVICE STARTED")
        print("===================================")

        # Validate messages
        if not messages:
            return "Please send a message."

        # Build prompt
        prompt = SYSTEM_INSTRUCTION + "\n\n"

        for msg in messages:

            role = msg.get("role", "user")
            content = msg.get("content", "")

            prompt += f"{role.upper()}: {content}\n"

        prompt += "ASSISTANT: "

        print("DEBUG: Sending request to Ollama...")
        print("DEBUG: Endpoint:", OLLAMA_API_ENDPOINT)

        # Request payload
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False,
        }

        # Send request
        response = requests.post(
            OLLAMA_API_ENDPOINT,
            json=payload,
            timeout=120
        )

        print("DEBUG: Status Code:", response.status_code)

        # Error response
        if response.status_code != 200:

            print("DEBUG: Response Text:", response.text)

            return (
                f"Ollama Error ({response.status_code}): "
                f"{response.text}"
            )

        # Parse response
        data = response.json()

        print("DEBUG: Ollama JSON:", data)

        ai_response = data.get("response", "").strip()

        # Empty response
        if not ai_response:

            return (
                "AI generated an empty response. "
                "Please try again."
            )

        print("DEBUG: AI Response Generated Successfully")

        return ai_response

    except requests.exceptions.ConnectionError as e:

        print("DEBUG: Connection Error:", str(e))

        return (
            "Cannot connect to Ollama.\n\n"
            "Make sure Ollama is running."
        )

    except requests.exceptions.Timeout:

        print("DEBUG: Timeout Error")

        return (
            "Ollama took too long to respond."
        )

    except Exception as e:

        print("DEBUG: Unexpected Error:", str(e))

        return (
            f"Unexpected Error: {str(e)}"
        )