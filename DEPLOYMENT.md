# Deployment Guide

## What Changes for Production?

### 1. Backend API URL
**Development:**
```
http://localhost:5001/api
```

**Production (after deployment):**
```
https://your-backend-domain.com/api
```

### 2. Database URL
**Development (Local):**
```
mongodb://localhost:27017/portfolio
```

**Production (Cloud MongoDB):**
```
mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

---

## Step-by-Step Deployment

### Option 1: Deploy to Heroku (Easiest)

**Backend:**
```bash
cd Backend
heroku create your-portfolio-backend
git push heroku main
heroku config:set MONGO_URL="mongodb+srv://..."
heroku config:set ADMIN_PASSWORD="secure_password"
```

**Frontend:**
```bash
cd Frontend
npm run build
# Deploy dist/ folder to Netlify or Vercel
```

### Option 2: Deploy to AWS/DigitalOcean

**Backend:**
1. Get a server (EC2/Droplet)
2. Install Python, MongoDB (or use MongoDB Atlas cloud)
3. Upload code and set environment variables
4. Run Flask app with gunicorn

**Frontend:**
1. Build: `npm run build`
2. Upload `dist/` folder to AWS S3 + CloudFront
3. Or use any static hosting

### Option 3: Deploy with Docker (Recommended)

Create `Backend/Dockerfile`:
```dockerfile
FROM python:3.13
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

---

## Production Checklist

### Backend (.env for production)
```bash
FLASK_ENV=production
FLASK_DEBUG=False
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
ADMIN_USERNAME=secure_admin_name
ADMIN_PASSWORD=very_secure_password_with_special_chars
PORT=5000
```

### Frontend (.env.production)
```bash
VITE_API_URL=https://your-backend-url.com/api
```

---

## Services You Need

1. **Backend Hosting:**
   - Heroku, AWS, DigitalOcean, Railway, Render

2. **Database (MongoDB):**
   - MongoDB Atlas (Free tier available)
   - Cloud provider's managed database

3. **Frontend Hosting:**
   - Netlify, Vercel, AWS S3+CloudFront, GitHub Pages

4. **Domain:**
   - Optional but recommended

---

## Important Security Changes

🔒 **Production:**
- Use `https://` not `http://`
- Strong admin passwords
- Store secrets in environment variables
- Enable CORS only for your domain
- Use database authentication
- Rate limiting on API endpoints

---

## Quick Production Setup Example

### MongoDB Atlas (Cloud Database)
1. Sign up at mongodb.com/cloud
2. Create free cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/portfolio`

### Frontend Deployment (Netlify)
1. Build: `npm run build`
2. Deploy `dist/` folder to Netlify
3. Set environment variable: `VITE_API_URL=your-backend-url`

### Backend Deployment (Render)
1. Push code to GitHub
2. Connect to Render
3. Set environment variables
4. Deploy

---

## Testing Before Deployment

```bash
# Simulate production build
npm run build

# Test with production environment
VITE_API_URL=https://your-test-url npm run preview

# Test backend with production config
FLASK_ENV=production python app.py
```

---

## Cost Estimate

- **MongoDB Atlas**: Free tier available, $57+/month for production
- **Backend Hosting**: Heroku $7+/month, DigitalOcean $5+/month
- **Frontend Hosting**: Netlify/Vercel free
- **Domain**: $10-15/year

---

## When Your PC is Off

✅ **With proper deployment:**
- Website works 24/7 on cloud servers
- Database runs on MongoDB Atlas
- You can access admin panel anytime
- Messages are stored reliably
- Your PC doesn't need to be on

❌ **Without deployment:**
- Everything stops when PC is off
- Users can't access portfolio
- Messages not received
- Admin panel not accessible
