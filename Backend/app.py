from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_pymongo import PyMongo
from datetime import datetime
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import ssl

load_dotenv()

app = Flask(__name__)
CORS(app)

# Admin credentials (change these!)
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

# MongoDB ConfigurationAdmin Login ====================

@app.route("/login", methods=["POST"])
def admin_login():
    """Admin login endpoint"""
    try:
        data = request.get_json()
        username = data.get("username", "")
        password = data.get("password", "")
        
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            return jsonify({
                "success": True,
                "message": "Login successful",
                "token": "admin_token_12345"  # Simple token (use JWT in production)
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Invalid username or password"
            }), 401
            
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


# ==================== MongoDB Setup ====================
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/portfolio")

# Use direct MongoClient for more reliable connection
try:
    mongo_client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
    # Test connection
    mongo_client.server_info()
    db = mongo_client['portfolio']
    print("✅ MongoDB connected successfully")
except Exception as e:
    print(f"❌ MongoDB connection failed: {str(e)}")
    # Fallback to PyMongo (will work later when connected)
    app.config["MONGO_URI"] = MONGO_URL
    mongo_obj = PyMongo(app)
    db = None

# ==================== Contact Messages API ====================

@app.route("/api/contact", methods=["POST"])
def submit_contact():
    """Submit a contact message"""
    try:
        data = request.get_json()
        
        # Validation
        required_fields = ["name", "email", "subject", "message"]
        if not all(field in data for field in required_fields):
            return jsonify({"success": False, "message": "Missing required fields"}), 400
        
        # Check field lengths
        if len(data.get("name", "")) > 100:
            return jsonify({"success": False, "message": "Name too long (max 100 characters)"}), 400
        if len(data.get("subject", "")) > 200:
            return jsonify({"success": False, "message": "Subject too long (max 200 characters)"}), 400
        if len(data.get("message", "")) > 2000:
            return jsonify({"success": False, "message": "Message too long (max 2000 characters)"}), 400
        
        # Basic email validation
        if "@" not in data.get("email", ""):
            return jsonify({"success": False, "message": "Invalid email format"}), 400
        
        # Create message object
        message = {
            "name": data["name"],
            "email": data["email"],
            "subject": data["subject"],
            "message": data["message"],
            "created_at": datetime.utcnow(),
            "status": "new"
        }
        
        # Insert into database
        result = db.contact_messages.insert_one(message)
        
        return jsonify({
            "success": True,
            "message": "Message sent successfully",
            "data": {
                "id": str(result.inserted_id),
                "name": message["name"],
                "email": message["email"],
                "subject": message["subject"],
                "message": message["message"],
                "created_at": message["created_at"].isoformat(),
                "status": message["status"]
            }
        }), 201
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@app.route("/api/contact/messages", methods=["GET"])
def get_contact_messages():
    """Get all contact messages (admin use)"""
    try:
        messages = []
        for msg in db.contact_messages.find().sort("created_at", -1):
            messages.append({
                "_id": str(msg["_id"]),
                "name": msg["name"],
                "email": msg["email"],
                "subject": msg["subject"],
                "message": msg["message"],
                "created_at": msg["created_at"].isoformat(),
                "status": msg.get("status", "new")
            })
        
        return jsonify({
            "success": True,
            "data": messages,
            "count": len(messages)
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@app.route("/api/contact/messages/<message_id>", methods=["PATCH"])
def update_message_status(message_id):
    """Update message status (e.g., mark as read/replied)"""
    try:
        data = request.get_json()
        status = data.get("status", "read")
        
        result = db.contact_messages.update_one(
            {"_id": ObjectId(message_id)},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Message not found"}), 404
        
        return jsonify({"success": True, "message": "Status updated"}), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


# ==================== CV Download API ====================

@app.route("/api/cv/download", methods=["POST"])
def track_cv_download():
    """Track CV downloads for analytics"""
    try:
        data = request.get_json()
        
        download_record = {
            "ip_address": data.get("ip_address", request.remote_addr),
            "user_agent": data.get("user_agent", request.headers.get("User-Agent", "")),
            "downloaded_at": datetime.utcnow()
        }
        
        db.cv_downloads.insert_one(download_record)
        
        return jsonify({
            "success": True,
            "message": "Download tracked"
        }), 201
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@app.route("/api/cv/download-stats", methods=["GET"])
def get_download_stats():
    """Get CV download statistics"""
    try:
        total_downloads = db.cv_downloads.count_documents({})
        
        return jsonify({
            "success": True,
            "data": {
                "total_downloads": total_downloads
            }
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@app.route("/api/cv/file", methods=["GET"])
def download_cv_file():
    """Serve CV file for download"""
    try:
        cv_path = os.path.join(os.path.dirname(__file__), "cv_file.pdf")
        
        if not os.path.exists(cv_path):
            return jsonify({"success": False, "message": "CV file not found"}), 404
        
        return send_file(
            cv_path,
            mimetype="application/pdf",
            as_attachment=True,
            download_name="Deep_Ranpariya_CV.pdf"
        )
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


# ==================== Health Check ====================

@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({"success": True, "message": "Server is running"}), 200


# ==================== Error Handlers ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({"success": False, "message": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"success": False, "message": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
