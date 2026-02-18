# 🚀 How to Run Your Portfolio

## Prerequisites
- Backend running on port 5001
- Frontend running on port 5173
- MongoDB Atlas connected

## Quick Start

### Option 1: Manual (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd /Users/deep01/Documents/PT/Backend
source venv/bin/activate
python3 app.py
```

Wait for: `* Running on http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd /Users/deep01/Documents/PT/Frontend
npm run dev
```

Wait for: `Local: http://localhost:5173`

### Option 2: Automated Script
```bash
bash /Users/deep01/Documents/PT/start-all.sh
```

---

## 📝 Admin Login

- **URL:** http://localhost:5173/login
- **Username:** `Deep`
- **Password:** `Deep@1392`

---

## ✅ Troubleshooting

### Issue: "Backend Not Running" error
**Solution:** Start backend first (Terminal 1)

### Issue: Page hangs on login
**Solution:** Make sure backend is running and showing `* Running on http://localhost:5001`

### Issue: "Invalid credentials"
**Solution:** Check your .env file has correct username/password:
```bash
cat Backend/.env | grep ADMIN
```

---

## 🔗 URLs

- **Portfolio:** http://localhost:5173
- **Admin Login:** http://localhost:5173/login
- **Backend API:** http://localhost:5001/api
- **Health Check:** http://localhost:5001/api/health

---

## 📚 Notes

- Backend MUST be running before you try to login
- Frontend connects to backend at `http://localhost:5001/api`
- MongoDB Atlas is already configured
- Both terminals must stay open while using the app
