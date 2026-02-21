# Deep Ranpariya's Portfolio - Full Stack Application

A modern portfolio website with contact form, CV download, and admin panel.

## Features

✅ **Portfolio Showcase**
- Hero section with social links
- About section with skills
- Projects showcase
- Education timeline
- Contact form
- CV download

✅ **Admin Dashboard**
- View all contact messages
- Track message status (New/Read/Replied)
- Protected login system
- Logout functionality

✅ **Full Stack**
- React + Vite frontend
- Flask backend
- MongoDB database
- Real-time message storage

---

## Project Structure

```
PT/
├── Frontend/               # React + Vite
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── .env.example       # Template only
│   └── .gitignore
│
├── Backend/               # Flask API
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.example       # Template only
│   ├── cv_file.pdf        # CV for download
│   └── .gitignore
│
└── README.md
```

---

## Setup Instructions

### Backend Setup

```bash
cd Backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from template
cp .env.example .env

# Edit .env with your credentials
# Ensure MongoDB is running

# Start server
python app.py
```

Backend runs on: `http://localhost:5001`

### Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env with API URL (should point to backend)

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## API Endpoints

### Contact Messages
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all messages (admin only)
- `PATCH /api/contact/messages/{id}` - Update message status

### Admin
- `POST /api/admin/login` - Admin login

### CV
- `POST /api/cv/download` - Track CV download
- `GET /api/cv/file` - Download CV file
- `GET /api/cv/download-stats` - Download statistics

### Health
- `GET /api/health` - Server health check

---

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017/portfolio
FLASK_ENV=production
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## Deployment

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB instance
- Git

### Deployment Steps

1. **Clone repository** (without .env files)
```bash
git clone https://github.com/ranpariyadeep/portfolio.git
```

2. **Install and run backend**:
```bash
cd Backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

3. **Build and deploy frontend**:
```bash
cd Frontend
npm install
npm run build
# Upload dist/ folder to web server
```

---

<<<<<<< HEAD

=======
>>>>>>> 66b84fa (Update flies)
## Technologies Used

- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Backend**: Flask, Flask-CORS, Flask-PyMongo
- **Database**: MongoDB
- **Icons**: Lucide React
- **Build**: Vite, npm

---



