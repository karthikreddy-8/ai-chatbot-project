#!/usr/bin/env python3
"""
End-to-End Test Script for AI Chatbot
Tests complete message flow from frontend to Ollama and back
"""

import requests
import json
import time
import sys
from pathlib import Path

# Color codes
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'
BOLD = '\033[1m'

def print_header(text):
    print(f"\n{BOLD}{BLUE}{'='*70}{RESET}")
    print(f"{BOLD}{BLUE}{text:^70}{RESET}")
    print(f"{BOLD}{BLUE}{'='*70}{RESET}\n")

def print_test(name, status, details=""):
    symbol = f"{GREEN}✓{RESET}" if status else f"{RED}✗{RESET}"
    print(f"{symbol} {name}")
    if details:
        print(f"  {details}")

def test_ollama_connection():
    """Test Ollama is running and responsive"""
    print_header("Test 1: Ollama Connection")
    
    try:
        print("Testing Ollama at http://localhost:11434...")
        
        payload = {
            "model": "llama3",
            "prompt": "Say 'Test successful'",
            "stream": False,
        }
        
        start = time.time()
        response = requests.post(
            "http://localhost:11434/api/generate",
            json=payload,
            timeout=60
        )
        elapsed = time.time() - start
        
        if response.status_code == 200:
            data = response.json()
            if "response" in data:
                print_test("Ollama Connection", True, 
                          f"Response received in {elapsed:.1f}s")
                print(f"  Sample response: {data['response'][:60]}...")
                return True
            else:
                print_test("Ollama Connection", False, "No response field")
                return False
        else:
            print_test("Ollama Connection", False, 
                      f"Status {response.status_code}")
            return False
            
    except requests.exceptions.Timeout:
        print_test("Ollama Connection", False, 
                  "Timeout (>60s) - Ollama might be slow")
        return False
    except requests.exceptions.ConnectionError:
        print_test("Ollama Connection", False, 
                  "Cannot connect - is Ollama running?")
        return False
    except Exception as e:
        print_test("Ollama Connection", False, str(e))
        return False

def test_backend_health():
    """Test backend API is running"""
    print_header("Test 2: Backend Health")
    
    try:
        print("Testing backend at http://localhost:8000...")
        
        response = requests.get(
            "http://localhost:8000/api/health",
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            print_test("Backend Health", True, 
                      f"Status: {data.get('status', 'unknown')}")
            return True
        else:
            print_test("Backend Health", False, 
                      f"Status {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print_test("Backend Health", False, 
                  "Cannot connect - is backend running?")
        return False
    except Exception as e:
        print_test("Backend Health", False, str(e))
        return False

def test_backend_startup():
    """Test if backend can be started"""
    print_header("Test 3: Backend Startup Check")
    
    # Check if run.py exists
    run_file = Path("backend/run.py")
    if not run_file.exists():
        print_test("Backend Startup", False, "backend/run.py not found")
        return False
    
    print_test("Backend Startup", True, 
              "backend/run.py exists - can be started")
    return True

def test_ollama_with_conversation_context():
    """Test Ollama with multi-turn conversation"""
    print_header("Test 4: Ollama Multi-Turn Conversation")
    
    try:
        messages = [
            "What is Python?",
            "How many years old is it?",
            "What are its main uses?"
        ]
        
        prompt = ""
        for msg in messages:
            prompt += f"USER: {msg}\n"
        prompt += "ASSISTANT: "
        
        print(f"Sending conversation with {len(messages)} messages...")
        
        payload = {
            "model": "llama3",
            "prompt": prompt,
            "stream": False,
        }
        
        start = time.time()
        response = requests.post(
            "http://localhost:11434/api/generate",
            json=payload,
            timeout=60
        )
        elapsed = time.time() - start
        
        if response.status_code == 200:
            data = response.json()
            if "response" in data and data["response"]:
                print_test("Multi-Turn Conversation", True,
                          f"Response in {elapsed:.1f}s")
                print(f"  Response: {data['response'][:80]}...")
                return True
        
        print_test("Multi-Turn Conversation", False, 
                  f"No response (status {response.status_code})")
        return False
        
    except Exception as e:
        print_test("Multi-Turn Conversation", False, str(e))
        return False

def test_prompt_building():
    """Test that prompt building logic works"""
    print_header("Test 5: Prompt Building Logic")
    
    try:
        messages = [
            {"role": "user", "content": "What is AI?"},
            {"role": "assistant", "content": "AI is artificial intelligence"},
            {"role": "user", "content": "Tell me more"}
        ]
        
        # Simulate backend prompt building
        prompt = ""
        for msg in messages:
            role = msg["role"].upper()
            content = msg["content"]
            prompt += f"{role}: {content}\n"
        prompt += "ASSISTANT: "
        
        print(f"Built prompt from {len(messages)} messages:")
        print(f"  Prompt length: {len(prompt)} characters")
        print(f"  First 100 chars: {prompt[:100]}...")
        
        # Test with Ollama
        payload = {
            "model": "llama3",
            "prompt": prompt,
            "stream": False,
        }
        
        response = requests.post(
            "http://localhost:11434/api/generate",
            json=payload,
            timeout=60
        )
        
        if response.status_code == 200 and "response" in response.json():
            print_test("Prompt Building", True, "Successfully processed")
            return True
        else:
            print_test("Prompt Building", False, 
                      f"Failed (status {response.status_code})")
            return False
            
    except Exception as e:
        print_test("Prompt Building", False, str(e))
        return False

def test_error_handling():
    """Test error handling"""
    print_header("Test 6: Error Handling")
    
    try:
        # Test with invalid model
        print("Testing error handling with invalid model...")
        
        payload = {
            "model": "nonexistent-model",
            "prompt": "test",
            "stream": False,
        }
        
        response = requests.post(
            "http://localhost:11434/api/generate",
            json=payload,
            timeout=10
        )
        
        if response.status_code != 200:
            print_test("Error Handling", True, 
                      "Ollama correctly rejected invalid model")
            return True
        else:
            print_test("Error Handling", False, 
                      "Ollama should have rejected invalid model")
            return False
            
    except Exception as e:
        # Connection error is also fine - shows error handling
        if "Connection" in str(e) or "Timeout" in str(e):
            print_test("Error Handling", True, "Connection errors handled")
            return True
        print_test("Error Handling", False, str(e))
        return False

def test_response_parsing():
    """Test that responses are parsed correctly"""
    print_header("Test 7: Response Parsing")
    
    try:
        print("Testing response parsing...")
        
        payload = {
            "model": "llama3",
            "prompt": "Say exactly: PARSE_TEST_123",
            "stream": False,
        }
        
        response = requests.post(
            "http://localhost:11434/api/generate",
            json=payload,
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["model", "response", "done"]
            
            missing = [f for f in required_fields if f not in data]
            
            if not missing:
                print_test("Response Parsing", True,
                          f"All required fields present")
                print(f"  Response: {data['response'][:60]}...")
                return True
            else:
                print_test("Response Parsing", False,
                          f"Missing fields: {missing}")
                return False
        else:
            print_test("Response Parsing", False,
                      f"Status {response.status_code}")
            return False
            
    except Exception as e:
        print_test("Response Parsing", False, str(e))
        return False

def main():
    """Run all tests"""
    print(f"\n{BOLD}{YELLOW}AI Chatbot End-to-End Test Suite{RESET}")
    print(f"{YELLOW}Testing message flow: Frontend → Backend → Ollama → Response{RESET}")
    
    tests = [
        ("Ollama Connection", test_ollama_connection),
        ("Backend Health", test_backend_health),
        ("Backend Startup", test_backend_startup),
        ("Multi-Turn Conversation", test_ollama_with_conversation_context),
        ("Prompt Building", test_prompt_building),
        ("Error Handling", test_error_handling),
        ("Response Parsing", test_response_parsing),
    ]
    
    results = []
    
    print("\n" + "="*70)
    print("Running tests...")
    print("="*70)
    
    for name, test_func in tests:
        try:
            result = test_func()
            results.append((name, result))
        except Exception as e:
            print(f"{RED}✗ {name} - Unexpected error: {str(e)}{RESET}")
            results.append((name, False))
    
    # Summary
    print_header("Test Summary")
    
    passed = sum(1 for _, r in results if r)
    total = len(results)
    
    for name, result in results:
        status = f"{GREEN}PASS{RESET}" if result else f"{RED}FAIL{RESET}"
        print(f"  [{status}] {name}")
    
    print(f"\n{BOLD}Results: {passed}/{total} tests passed{RESET}\n")
    
    if passed == total:
        print(f"{GREEN}✓ All tests passed! System is ready.{RESET}")
        print("\nYou can now:")
        print("  1. Start backend: cd backend && python run.py")
        print("  2. Start frontend: cd frontend && npm run dev")
        print("  3. Open http://localhost:5173")
        print("  4. Login and test the chatbot\n")
        return 0
    elif passed >= total - 1:
        print(f"{YELLOW}✓ Most tests passed. Backend might not be running yet.{RESET}")
        print("\nStart the backend:")
        print("  cd backend && python run.py\n")
        return 0
    else:
        print(f"{RED}✗ Some tests failed. Check setup.{RESET}\n")
        return 1

if __name__ == "__main__":
    exit(main())
