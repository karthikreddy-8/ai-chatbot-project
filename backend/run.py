"""
NexusAI Backend - Entry Point
Run this file to start the FastAPI server.

Usage:
    python run.py
"""
import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,  # Auto-reload on code changes
    )
