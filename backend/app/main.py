from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import chat router
from app.routes.chat import router as chat_router

# ============================================
# FASTAPI APP
# ============================================

app = FastAPI(
    title="Nexus AI Backend",
    version="1.0.0"
)

# ============================================
# CORS
# ============================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# ROOT ROUTE
# ============================================

@app.get("/")
async def root():

    return {
        "message": "Backend Running Successfully"
    }

# ============================================
# HEALTH CHECK
# ============================================

@app.get("/health")
async def health():

    return {
        "status": "ok"
    }

# ============================================
# INCLUDE ROUTER
# ============================================

# IMPORTANT:
# NO prefix="/api"

app.include_router(chat_router)