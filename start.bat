@echo off
echo Starting Backend Server...
start cmd /k "cd node-backend && node index.js"

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting in new windows!
