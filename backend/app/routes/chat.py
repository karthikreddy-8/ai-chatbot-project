from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import os
import uuid
import time
import json
from typing import Optional, List

# ── Optional Gemini (kept for /send fallback only) ─────────────
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False

router = APIRouter(prefix="/chat", tags=["Chat"])

# ── Concise system prompt (shorter = faster TTFT) ─────────────
SYSTEM_PROMPT_CONCISE = """You are NexusAI, an AI Learning Assistant for B.Tech Engineering Students.

Help with: Programming (Python, Java, C, C++, JavaScript, React, Node.js), DSA, DBMS, OS, Computer Networks, AI/ML, debugging, projects, resume, and placement prep.

Style: Friendly, encouraging, clear. Use markdown formatting, code blocks, and bullet points.

IMPORTANT: Answer clearly and concisely by default. Use detailed explanations only when the user explicitly asks for more detail or the topic genuinely requires depth. For simple questions, give short direct answers."""

# ── Full system prompt (used by old /send endpoint) ───────────
SYSTEM_PROMPT = """You are NexusAI, an expert AI Learning Assistant built specifically for B.Tech Engineering Students.

You help students with:
- Programming (Python, Java, C, C++, JavaScript, React, Node.js)
- Data Structures and Algorithms (DSA)
- Database Management Systems (DBMS)
- Operating Systems (OS)
- Computer Networks (CN)
- Artificial Intelligence and Machine Learning
- Debugging code and fixing errors
- Building final year projects
- Resume writing and placement preparation
- Mock interview questions and answers
- Explaining complex engineering concepts clearly

Your personality:
- Friendly, encouraging, and patient
- Give clear step-by-step explanations
- Always include code examples when relevant
- Use markdown formatting: **bold**, `code`, code blocks, bullet points
- Motivate students and help them learn deeply

When asked about yourself, say you are NexusAI, an AI assistant for engineering students.
Never say you are VisionEvolution or related to image analysis in general chat."""

# ── Gemini model (lazy loaded once, for /send fallback) ───────
_model = None

def _get_model():
    global _model
    if _model is not None:
        return _model
    key = os.getenv("GEMINI_API_KEY", "").strip()
    if key and GEMINI_AVAILABLE:
        try:
            genai.configure(api_key=key)
            _model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=SYSTEM_PROMPT
            )
            print("[OK] Gemini model loaded successfully")
        except Exception as e:
            print(f"[WARN] Gemini init failed: {e}")
            _model = None
    return _model


# ── Smart local fallback (works without internet) ─────────────
def _smart_fallback(prompt: str) -> str:
    p = prompt.lower().strip()

    greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "hii", "helo", "hai"]
    if any(p == g or p.startswith(g + " ") or p.startswith(g + ",") for g in greetings):
        return (
            "👋 **Hello! I'm NexusAI** — your personal AI Learning Assistant for Engineering!\n\n"
            "I can help you with:\n"
            "- 🐍 **Programming** — Python, Java, C, C++, JavaScript\n"
            "- 🌳 **DSA** — Arrays, Trees, Graphs, Dynamic Programming\n"
            "- 🗄️ **Core CS** — DBMS, OS, Computer Networks\n"
            "- 🐛 **Debugging** — Paste your code and I'll fix it\n"
            "- 📄 **Resume & Placements** — TCS, Infosys, Amazon prep\n"
            "- 🎓 **Final Year Projects** — Ideas and full implementation help\n\n"
            "What would you like to learn today? 🚀"
        )

    name_q = ["your name", "who are you", "what are you", "introduce yourself", "what is nexus", "tell me about yourself", "about you"]
    if any(q in p for q in name_q):
        return (
            "I'm **NexusAI** 🤖 — an intelligent AI Learning Assistant built specifically for **B.Tech Engineering Students**.\n\n"
            "**What I can do for you:**\n"
            "- ✅ Explain programming concepts with clear examples\n"
            "- ✅ Help you master DSA step by step\n"
            "- ✅ Debug your code and explain the fix\n"
            "- ✅ Prepare you for placement interviews (TCS, Amazon, Google)\n"
            "- ✅ Guide your final year project from idea to implementation\n"
            "- ✅ Answer questions on Python, Java, C++, DBMS, OS, CN, AI/ML\n\n"
            "Ask me anything engineering-related! 💡"
        )

    return (
        f"🤔 Great question about **\"{prompt}\"**!\n\n"
        f"I'm NexusAI, your Engineering AI Assistant. Try asking:\n"
        f"- 'Explain recursion in Python with an example'\n"
        f"- 'What is a binary search tree?'\n"
        f"- 'How do I prepare for TCS NQT exam?'\n"
        f"- 'Suggest a final year AI project'\n\n"
        f"**I can help with:** Python · Java · C/C++ · DSA · DBMS · OS · CN · AI/ML · Projects · Placements · Resume 🚀"
    )


# ── In-memory conversations ────────────────────────────────────
CONVERSATIONS = {}


# ── Request models ─────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str


class ChatStreamRequest(BaseModel):
    message: str
    history: List[dict] = []


# ── SSE streaming generator ────────────────────────────────────
def _ollama_stream_generator(message: str, history: list):
    """
    Generator that yields Server-Sent Events (SSE) chunks from Ollama.
    Format: data: <json>\n\n
    Final: data: [DONE]\n\n
    Dev timing is logged to console only — never exposed to users.
    """
    import requests as req

    t0 = time.time()
    print(f"\n[TIMING] Request received: 0 ms  |  message='{message[:60]}'")

    model = os.getenv("OLLAMA_MODEL", "llama3.2")
    ollama_url = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434").rstrip("/")

    # Build message list: system + up to 10 recent history + new user turn
    recent = history[-10:] if len(history) > 10 else history
    messages_payload = [{"role": "system", "content": SYSTEM_PROMPT_CONCISE}]
    for msg in recent:
        role = "user" if msg.get("sender") == "user" else "assistant"
        text = (msg.get("text") or msg.get("content") or "").strip()
        if text:
            messages_payload.append({"role": role, "content": text})
    messages_payload.append({"role": "user", "content": message})

    payload = {
        "model": model,
        "messages": messages_payload,
        "stream": True,
        "keep_alive": "10m",       # keep model warm between requests
        "options": {
            "num_predict": 600,    # reasonable response length limit
            "temperature": 0.7,
        },
    }

    t_ollama_start = time.time()
    print(f"[TIMING] Ollama request start: {int((t_ollama_start - t0) * 1000)} ms")

    first_token = True

    try:
        with req.post(
            f"{ollama_url}/api/chat",
            json=payload,
            stream=True,
            timeout=90,
        ) as r:
            if r.status_code != 200:
                print(f"[WARN] Ollama returned HTTP {r.status_code}")
                err = json.dumps({
                    "error": "AI service is temporarily unavailable. Please make sure Ollama is running."
                })
                yield f"data: {err}\n\n"
                return

            for raw_line in r.iter_lines():
                if not raw_line:
                    continue
                line = raw_line if isinstance(raw_line, str) else raw_line.decode("utf-8", errors="replace")
                try:
                    chunk = json.loads(line)
                except json.JSONDecodeError:
                    continue

                token = chunk.get("message", {}).get("content", "")
                done = chunk.get("done", False)

                # Log first token timing
                if first_token and token:
                    t_first = time.time()
                    print(f"[TIMING] First token:     {int((t_first - t0) * 1000)} ms")
                    first_token = False

                # Yield token chunk
                if token:
                    yield f"data: {json.dumps({'token': token, 'done': False})}\n\n"

                # Final chunk — log full timing, send DONE
                if done:
                    t_done = time.time()
                    load_ms = int(chunk.get("load_duration", 0) / 1e6)
                    prompt_tokens = chunk.get("prompt_eval_count", "?")
                    gen_tokens = chunk.get("eval_count", "?")
                    total_ms = int((t_done - t0) * 1000)
                    print(
                        f"[TIMING] Stream complete:  {total_ms} ms  "
                        f"| model_load={load_ms}ms "
                        f"| prompt_tokens={prompt_tokens} "
                        f"| generated_tokens={gen_tokens}"
                    )
                    yield f"data: [DONE]\n\n"
                    return

    except req.exceptions.ConnectionError:
        print("[WARN] Ollama connection refused — is Ollama running?")
        err = json.dumps({
            "error": "AI service is temporarily unavailable. Please make sure Ollama is running."
        })
        yield f"data: {err}\n\n"

    except req.exceptions.Timeout:
        print("[WARN] Ollama request timed out")
        err = json.dumps({
            "error": "AI service timed out. Ollama may be busy — please try again."
        })
        yield f"data: {err}\n\n"

    except Exception as e:
        print(f"[WARN] Unexpected stream error: {e}")
        err = json.dumps({
            "error": "Streaming failed. Please try again."
        })
        yield f"data: {err}\n\n"


# ── STREAMING endpoint (primary) ───────────────────────────────
@router.post("/stream")
async def stream_chat_message(request: ChatStreamRequest):
    """
    Primary chat endpoint — streams tokens as SSE.
    Client reads: data: {"token": "...", "done": false}
    Final line:   data: [DONE]
    Error line:   data: {"error": "..."}
    """
    user_message = request.message.strip()
    if not user_message:
        return {"status": "error", "message": "Please enter a message."}

    return StreamingResponse(
        _ollama_stream_generator(user_message, request.history),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",       # disable nginx buffering
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*",
        },
    )


# ── NON-STREAMING fallback (kept for backward compat) ─────────
@router.post("")
@router.post("/send")
async def send_chat_message(request: ChatRequest):
    """Legacy non-streaming endpoint. Kept for backward compatibility."""
    user_message = request.message.strip()
    if not user_message:
        return {"status": "success", "response": "Please enter a message.", "message": "Please enter a message."}

    ai_reply = ""

    # 1. Try Gemini first (if configured)
    m = _get_model()
    if m:
        try:
            res = m.generate_content(user_message)
            if res and res.text:
                ai_reply = res.text.strip()
                print(f"✅ Gemini responded to: {user_message[:50]}")
        except Exception as e:
            print(f"⚠️  Gemini generation failed: {e}")
            ai_reply = ""

    # 2. Try Ollama (non-streaming fallback)
    if not ai_reply:
        try:
            import requests as req
            payload = {
                "model": os.getenv("OLLAMA_MODEL", "llama3.2"),
                "prompt": f"{SYSTEM_PROMPT}\n\nUser: {user_message}\nAssistant:",
                "stream": False,
                "keep_alive": "10m",
            }
            r = req.post("http://127.0.0.1:11434/api/generate", json=payload, timeout=30)
            if r.status_code == 200:
                ollama_reply = r.json().get("response", "").strip()
                if ollama_reply:
                    ai_reply = ollama_reply
                    print(f"✅ Ollama responded")
        except Exception as e:
            print(f"⚠️  Ollama not available: {e}")

    # 3. Smart engineering fallback
    if not ai_reply:
        ai_reply = _smart_fallback(user_message)
        print(f"ℹ️  Smart fallback used for: {user_message[:50]}")

    return {
        "status": "success",
        "response": ai_reply,
        "message": ai_reply,
    }


# ── Conversation management (in-memory) ───────────────────────
@router.get("/conversations")
async def list_conversations():
    return {"status": "success", "data": list(CONVERSATIONS.values())}


@router.post("/conversations")
async def create_conversation(title: Optional[str] = None):
    cid = f"conv_{uuid.uuid4().hex[:10]}"
    CONVERSATIONS[cid] = {
        "id": cid,
        "title": title or "New Conversation",
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "messages": [],
    }
    return {"status": "success", "data": CONVERSATIONS[cid]}


@router.delete("/conversations/{cid}")
async def delete_conversation(cid: str):
    CONVERSATIONS.pop(cid, None)
    return {"status": "success", "message": "Deleted."}


@router.get("/health")
async def chat_health():
    """Health check — also warms up Ollama model."""
    import requests as req
    ollama_ok = False
    model = os.getenv("OLLAMA_MODEL", "llama3.2")
    try:
        r = req.get("http://127.0.0.1:11434/api/tags", timeout=3)
        ollama_ok = r.status_code == 200
    except Exception:
        pass

    m = _get_model()
    return {
        "status": "healthy",
        "provider": "ollama" if ollama_ok else ("gemini" if m else "smart-fallback"),
        "ollama_available": ollama_ok,
        "ollama_model": model,
        "gemini_configured": m is not None,
    }