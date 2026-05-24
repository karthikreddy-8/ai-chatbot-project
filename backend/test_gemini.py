import os
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# The client gets the API key from the environment variable `GEMINI_API_KEY`
# Or we can pass it directly.
# Since the user provided an OpenAI-looking key, we'll try to set it.
api_key = os.getenv("OPENAI_API_KEY") # The user provided this key in .env as OPENAI_API_KEY

print(f"Using API Key: {api_key[:10]}...")

try:
    client = genai.Client(api_key=api_key)

    response = client.models.generate_content(
        model="gemini-3-flash-preview", 
        contents="Explain how AI works in a few words"
    )
    print("\nResponse:")
    print(response.text)
except Exception as e:
    print(f"\nError: {e}")
    print("\nNote: The API key provided appears to be an OpenAI key (sk-proj-...).")
    print("Google Gemini models require a Google API key (usually starts with AIza).")
