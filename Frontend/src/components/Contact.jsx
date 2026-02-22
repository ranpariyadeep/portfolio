import React, { useState } from 'react';
import { portfolioData } from '../mock';
import { Mail, MapPin, Github, Linkedin, Send, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '../hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Contact = () => {
  const { contact } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCV = async () => {
    try {
      // Track the download
      await fetch(`${API_URL}/cv/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_agent: navigator.userAgent,
        }),
      }).catch(err => console.error('Analytics error:', err));

      // Download the actual CV file
      toast({
        title: "Download Started",
        description: "Your CV download will begin shortly.",
      });
      
      // Download PDF from backend
      const response = await fetch(`${API_URL}/cv/file`);
      if (!response.ok) {
        throw new Error('Failed to download CV');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Deep_Ranpariya_CV.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast({
        title: "Error",
        description: "Failed to download CV. Please try again.",
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Let's discuss your next project or opportunity</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                >
                  <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-500 transition-colors">
                    <Mail className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{contact.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="p-3 bg-cyan-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{contact.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href={`https://github.com/${contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-400/50 group"
                >
                  <Github className="w-6 h-6 text-gray-700 group-hover:text-emerald-600 transition-colors" />
                </a>
                <a
                  href={`https://www.linkedin.com/in/${contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-cyan-400/50 group"
                >
                  <Linkedin className="w-6 h-6 text-gray-700 group-hover:text-cyan-600 transition-colors" />
                </a>
              </div>
            </div>

            {/* Download CV */}
            <div className="p-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-2">Download My Resume</h3>
              <p className="text-emerald-50 mb-4">Get a detailed overview of my experience and skills</p>
              <Button
                onClick={handleDownloadCV}
                className="w-full  bg-emerald-500 hover:bg-gray-100 transition-all hover:scale-105"
        
              >
                <Download className="w-4 h-4 mr-2 " />
                Download CV (PDF)
              </Button>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-6 rounded-xl transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;