#!/bin/bash

echo "🚀 Starting Deep's Portfolio - Full Stack Setup"
echo "=============================================="

# Kill any existing processes
pkill -f "python app.py" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true

sleep 2

echo ""
echo "📦 Starting Backend Server (Port 5001)..."
echo "=============================================="

cd /Users/deep01/Documents/PT/Backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!

sleep 3

echo ""
echo "Testing Backend..."
curl -s http://localhost:5001/api/health && echo "✓ Backend OK" || echo "✗ Backend failed"

echo ""
echo "🎨 Starting Frontend Server (Port 5173)..."
echo "=============================================="

cd /Users/deep01/Documents/PT/Frontend
npm run dev &
FRONTEND_PID=$!

sleep 5

echo ""
echo "✅ Setup Complete!"
echo "=============================================="
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5001"
echo ""
echo "Press Ctrl+C to stop servers"
echo "=============================================="

wait
