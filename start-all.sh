#!/bin/bash

echo "🚀 Starting Backend..."
cd /Users/deep01/Documents/PT/Backend
source venv/bin/activate
python3 app.py &
BACKEND_PID=$!

echo "Backend PID: $BACKEND_PID"
sleep 4

echo ""
echo "🚀 Starting Frontend..."
cd /Users/deep01/Documents/PT/Frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "==============================================="
echo "✅ Services running:"
echo "   Backend:  http://localhost:5001"
echo "   Frontend: http://localhost:5173"
echo ""
echo "📝 Login credentials:"
echo "   Username: Deep"
echo "   Password: Deep@1392"
echo "==============================================="
echo ""
echo "Press Ctrl+C to stop"

wait
