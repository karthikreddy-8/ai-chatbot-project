import os
import uvicorn
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"[+] Starting NexusAI Backend on http://localhost:{port}")
    print(f"[+] API Docs available at http://localhost:{port}/docs")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=True
    )