import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const Admin = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    fetchMessages();
  }, [navigate]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/contact/messages`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
      } else {
        setError('Failed to load messages');
      }
    } catch (err) {
      setError('Error fetching messages: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (messageId, status) => {
    try {
      const response = await fetch(`${API_URL}/contact/messages/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (data.success) {
        fetchMessages();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoggedIn');
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading messages...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin - Contact Messages</h1>
            <p className="text-gray-600">{messages.length} messages received</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-500">
                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Name</p>
                    <p className="text-lg font-semibold text-gray-900">{msg.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Email</p>
                    <a href={`mailto:${msg.email}`} className="text-emerald-600 hover:underline break-all">
                      {msg.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Subject</p>
                    <p className="font-medium text-gray-900">{msg.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Date</p>
                    <p className="text-sm text-gray-600">{formatDate(msg.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Status</p>
                    <select
                      value={msg.status}
                      onChange={(e) => updateStatus(msg._id, e.target.value)}
                      className={`px-2 py-1 rounded text-sm font-semibold cursor-pointer ${
                        msg.status === 'new'
                          ? 'bg-blue-100 text-blue-700'
                          : msg.status === 'read'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-4 mt-4">
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
