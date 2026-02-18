# Backend - Portfolio API

Flask backend for Deep Ranpariya's portfolio website.

## Setup

1. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Ensure MongoDB is running:
```bash
# If using MongoDB locally, make sure it's started
mongod
```

4. Run the server:
```bash
python app.py
```

Server will start at `http://localhost:5000`

## API Endpoints

### Contact Messages

**POST /api/contact** - Submit contact form
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**GET /api/contact/messages** - Get all messages (admin)

**PATCH /api/contact/messages/{id}** - Update message status
```json
{
  "status": "read|replied|new"
}
```

### CV Download

**POST /api/cv/download** - Track download
```json
{
  "ip_address": "string",
  "user_agent": "string"
}
```

**GET /api/cv/download-stats** - Get download statistics

### Health

**GET /api/health** - Server health check

## Environment Variables

See `.env` file for configuration options.
