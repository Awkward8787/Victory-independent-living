import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, RESPONSE_TIME_TEXT, CITY } from '../config';
import LocalInsights from '../components/LocalInsights';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct mailto link
    const subject = encodeURIComponent(`Contact from Website: ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">We're here to help. Reach out with any questions.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Get in Touch</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-brand-50 text-brand-600 rounded-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Email</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 hover:underline">{CONTACT_EMAIL}</a>
                    <p className="text-sm text-slate-500 mt-1">{RESPONSE_TIME_TEXT}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-brand-50 text-brand-600 rounded-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Phone</p>
                    <a href={`tel:${CONTACT_PHONE}`} className="text-brand-600 hover:underline">{CONTACT_PHONE}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-brand-50 text-brand-600 rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Office Location</p>
                    <p className="text-slate-600">{CITY}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* AI Assistant for Contact Page */}
             <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Need immediate answers?</h3>
                <p className="text-slate-300 mb-6 text-sm">Use our AI assistant to find local resources or getting started info.</p>
                <LocalInsights />
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 h-fit">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
              >
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </button>
              <p className="text-xs text-center text-slate-500 mt-4">
                This will open your default email client to send the message.
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
