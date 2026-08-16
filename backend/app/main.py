from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.analyze import router as analyze_router
from app.routes.auth import router as auth_router
from app.routes.chat import router as chat_router
import time

app = FastAPI(
    title="Image Evolution Analyzer API",
    description="Visual Change Detection & Similarity Analysis Using Computer Vision Engine (OpenCV + SSIM)",
    version="2.0.0"
)

# Enable CORS for local dev servers and frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "title": "Image Evolution Analyzer API Engine",
        "status": "online",
        "version": "2.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Computer Vision Engine",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }

# Register API Routers under /api
app.include_router(analyze_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(chat_router, prefix="/api")