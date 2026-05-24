#!/usr/bin/env python3
"""
Verification Script for AI Chatbot with Ollama
Checks if everything is set up correctly before running the application
"""

import sys
import os
import requests
import json
from pathlib import Path

# Color codes for terminal output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'
BOLD = '\033[1m'

def print_header(text):
    print(f"\n{BOLD}{BLUE}{'='*60}{RESET}")
    print(f"{BOLD}{BLUE}{text:^60}{RESET}")
    print(f"{BOLD}{BLUE}{'='*60}{RESET}\n")

def print_success(text):
    print(f"{GREEN}✓ {text}{RESET}")

def print_error(text):
    print(f"{RED}✗ {text}{RESET}")

def print_warning(text):
    print(f"{YELLOW}⚠ {text}{RESET}")

def print_info(text):
    print(f"{BLUE}ℹ {text}{RESET}")

def check_python():
    """Check Python version"""
    print_header("Python Version Check")
    version = sys.version_info
    print(f"Python {version.major}.{version.minor}.{version.micro}")
    
    if version.major >= 3 and version.minor >= 9:
        print_success(f"Python {version.major}.{version.minor} is supported")
        return True
    else:
        print_error(f"Python 3.9+ is required, you have {version.major}.{version.minor}")
        return False

def check_ollama():
    """Check if Ollama is running and accessible"""
    print_header("Ollama Server Check")
    
    ollama_url = "http://localhost:11434"
    health_endpoint = f"{ollama_url}/api/generate"
    
    try:
        print_info(f"Checking Ollama at {ollama_url}...")
        
        # Test with a simple request
        payload = {
            "model": "llama3",
            "prompt": "Say hi",
            "stream": False,
        }
        
        response = requests.post(health_endpoint, json=payload, timeout=5)
        
        if response.status_code == 200:
            print_success(f"Ollama is running and responding")
            data = response.json()
            if "response" in data:
                print_success(f"Ollama model 'llama3' is responding correctly")
                return True
            else:
                print_error("Ollama responded but no response field found")
                return False
        else:
            print_error(f"Ollama returned status code {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print_error(f"Cannot connect to Ollama at {ollama_url}")
        print_warning("Make sure:")
        print("  1. Ollama is installed (https://ollama.ai)")
        print("  2. Run 'ollama serve' in a terminal")
        print("  3. Run 'ollama pull llama3' to download the model")
        return False
    except requests.exceptions.Timeout:
        print_warning("Ollama is running but took too long to respond")
        print_info("This might be normal if the model is loading for first time")
        return True
    except Exception as e:
        print_error(f"Error checking Ollama: {str(e)}")
        return False

def check_backend_dependencies():
    """Check if backend dependencies are installed"""
    print_header("Backend Dependencies Check")
    
    required_packages = [
        'fastapi',
        'uvicorn',
        'sqlalchemy',
        'pyjwt',
        'requests',
        'dotenv',
        'bcrypt',
    ]
    
    all_installed = True
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print_success(f"{package} is installed")
        except ImportError:
            print_error(f"{package} is NOT installed")
            all_installed = False
    
    if not all_installed:
        print_warning("Run: pip install -r backend/requirements.txt")
    
    return all_installed

def check_frontend_dependencies():
    """Check if frontend dependencies are installed"""
    print_header("Frontend Dependencies Check")
    
    frontend_dir = Path("frontend")
    
    if not frontend_dir.exists():
        print_error("Frontend directory not found")
        return False
    
    node_modules = frontend_dir / "node_modules"
    
    if node_modules.exists() and (node_modules / "react").exists():
        print_success("Frontend dependencies are installed")
        return True
    else:
        print_warning("Frontend dependencies might not be installed")
        print_info("Run: cd frontend && npm install")
        return False

def check_env_file():
    """Check if .env file exists in backend"""
    print_header("Environment Configuration Check")
    
    env_file = Path("backend/.env")
    
    if env_file.exists():
        print_success(".env file found in backend/")
        
        # Check required variables
        with open(env_file, 'r') as f:
            content = f.read()
            
        required_vars = ['JWT_SECRET', 'USE_OLLAMA']
        found_vars = []
        
        for var in required_vars:
            if var in content:
                found_vars.append(var)
                print_success(f"  {var} is configured")
            else:
                print_warning(f"  {var} might not be configured")
        
        return True
    else:
        print_error(".env file not found in backend/")
        print_warning("Copy backend/.env.example to backend/.env and configure")
        return False

def check_database():
    """Check if database can be initialized"""
    print_header("Database Setup Check")
    
    db_file = Path("backend/chatbot.db")
    
    if db_file.exists():
        print_success("Database file exists")
        try:
            import sqlite3
            conn = sqlite3.connect(str(db_file))
            cursor = conn.cursor()
            
            # Check if tables exist
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = cursor.fetchall()
            
            if tables:
                print_success(f"Database has {len(tables)} tables")
                conn.close()
                return True
            else:
                print_warning("Database exists but tables might not be initialized")
                conn.close()
                return False
        except Exception as e:
            print_error(f"Error accessing database: {str(e)}")
            return False
    else:
        print_info("Database file will be created on first backend startup")
        return True

def check_api_endpoints():
    """Check if backend API is running"""
    print_header("Backend API Check")
    
    api_url = "http://localhost:8000"
    health_endpoint = f"{api_url}/api/health"
    
    try:
        print_info(f"Checking API at {api_url}...")
        response = requests.get(health_endpoint, timeout=5)
        
        if response.status_code == 200:
            print_success(f"Backend API is responding")
            data = response.json()
            print_success(f"API status: {data.get('status', 'unknown')}")
            return True
        else:
            print_warning(f"Backend API returned status code {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print_warning(f"Cannot connect to backend API at {api_url}")
        print_info("This is OK if backend is not running yet")
        print_info("Start backend with: cd backend && python run.py")
        return False
    except Exception as e:
        print_warning(f"Error checking API: {str(e)}")
        return False

def main():
    """Run all checks"""
    print(f"\n{BOLD}{YELLOW}AI Chatbot Setup Verification{RESET}")
    print(f"{YELLOW}{'='*60}{RESET}\n")
    
    checks = [
        ("Python Version", check_python),
        ("Backend Dependencies", check_backend_dependencies),
        ("Frontend Dependencies", check_frontend_dependencies),
        ("Environment Configuration", check_env_file),
        ("Database Setup", check_database),
        ("Ollama Server", check_ollama),
        ("Backend API", check_api_endpoints),
    ]
    
    results = {}
    critical_passed = True
    
    for name, check_func in checks:
        try:
            results[name] = check_func()
        except Exception as e:
            print_error(f"Error running {name} check: {str(e)}")
            results[name] = False
    
    # Summary
    print_header("Verification Summary")
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for name, result in results.items():
        status = f"{GREEN}PASS{RESET}" if result else f"{RED}FAIL{RESET}"
        print(f"  [{status}] {name}")
    
    print(f"\n{BOLD}Result: {passed}/{total} checks passed{RESET}\n")
    
    if passed == total:
        print_success("All checks passed! Your setup is ready.")
        print_info("Start the chatbot:")
        print_info("  Terminal 1: cd backend && python run.py")
        print_info("  Terminal 2: cd frontend && npm run dev")
        return 0
    else:
        print_warning("Some checks failed. See details above.")
        print_info("Key things to verify:")
        print_info("  1. Ollama is installed and 'ollama serve' is running")
        print_info("  2. Python 3.9+ is installed")
        print_info("  3. Backend dependencies: pip install -r backend/requirements.txt")
        print_info("  4. Frontend dependencies: cd frontend && npm install")
        return 1

if __name__ == "__main__":
    exit(main())
