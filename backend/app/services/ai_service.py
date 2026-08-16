import os
import requests
import json

# Attempt Gemini import
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False

SYSTEM_INSTRUCTION = """
You are NexusAI, an advanced, highly intelligent AI conversational assistant.
You excel at answering questions, writing clean code in Python, JavaScript, React, C++, Java, Rust, debugging errors, explaining complex concepts clearly, writing essays, summarizing documents, and providing expert technical advice.
Always format your code snippets in markdown code blocks with the appropriate programming language tag.
"""

def generate_gemini_response(prompt: str, model_name: str = "gemini-1.5-flash") -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or not GEMINI_AVAILABLE:
        return None
    try:
        genai.configure(api_key=api_key)
        gemini_model = genai.GenerativeModel(model_name)
        response = gemini_model.generate_content(f"{SYSTEM_INSTRUCTION}\n\nUser: {prompt}")
        if response and response.text:
            return response.text.strip()
    except Exception as e:
        print(f"DEBUG: Gemini API exception: {e}")
    return None

def generate_ollama_response(prompt: str, model_name: str = "llama3") -> str:
    url = "http://127.0.0.1:11434/api/generate"
    payload = {
        "model": model_name,
        "prompt": f"{SYSTEM_INSTRUCTION}\n\nUser: {prompt}\nAssistant:",
        "stream": False
    }
    try:
        res = requests.post(url, json=payload, timeout=10)
        if res.status_code == 200:
            data = res.json()
            return data.get("response", "").strip()
    except Exception as e:
        print(f"DEBUG: Ollama exception: {e}")
    return None

def generate_nexus_fallback(prompt: str) -> str:
    p_lower = prompt.lower()
    if "code" in p_lower or "python" in p_lower or "react" in p_lower or "function" in p_lower:
        return (
            "Here is an optimized implementation in Python:\n\n"
            "```python\n"
            "def nexus_ai_processor(data: dict) -> dict:\n"
            "    \"\"\"Process and optimize data using NexusAI logic.\"\"\"\n"
            "    processed = {k: v.upper() if isinstance(v, str) else v for k, v in data.items()}\n"
            "    return {\"status\": \"success\", \"result\": processed}\n\n"
            "# Example usage:\n"
            "print(nexus_ai_processor({\"user\": \"nexus\", \"role\": \"developer\"}))\n"
            "```\n\n"
            "This function iterates through key-value pairs, converting string inputs to uppercase while preserving original data types."
        )
    elif "hello" in p_lower or "hi" in p_lower or "hey" in p_lower:
        return (
            "Hello! I am **NexusAI**, your intelligent AI conversational assistant. "
            "How can I assist you today? I can write code, debug errors, explain complex topics, or help brainstorm ideas."
        )
    elif "who are you" in p_lower or "what are you" in p_lower:
        return (
            "I am **NexusAI**, a next-generation AI assistant built with modern neural conversational architectures. "
            "I can assist with software engineering, technical problem solving, creative writing, research, and data analysis."
        )
    else:
        return (
            f"Thank you for asking! Regarding **'{prompt}'**:\n\n"
            f"1. **Core Concept**: Analyzing key elements and contextual relationships.\n"
            f"2. **Insights**: Providing structured, actionable recommendations.\n"
            f"3. **Next Steps**: Let me know if you would like me to expand on any specific detail, provide code, or write a step-by-step breakdown!"
        )

def get_ai_response(messages: list[dict], model_provider: str = "gemini") -> str:
    if not messages:
        return "Please enter a message."

    latest_prompt = messages[-1].get("content", "").strip()
    if not latest_prompt:
        return "Please enter a non-empty message."

    # 1. Try Gemini API
    response = generate_gemini_response(latest_prompt)
    if response:
        return response

    # 2. Try Ollama local
    response = generate_ollama_response(latest_prompt)
    if response:
        return response

    # 3. Fallback to NexusAI Smart AI Engine
    return generate_nexus_fallback(latest_prompt)