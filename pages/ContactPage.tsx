import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_ALT, RESPONSE_TIME_TEXT, CITY } from '../config';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name} — Victory IL Website`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Contact Us</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Have a question about housing, a property listing, or anything else? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Phone cards */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-900 mb-5">Call or Text</h3>
              <div className="space-y-4">
                <PhoneCard
                  label="Primary"
                  phone={CONTACT_PHONE}
                  note="Best for general inquiries"
                />
                <PhoneCard
                  label="Secondary"
                  phone={CONTACT_PHONE_ALT}
                  note="Alternate line"
                />
              </div>
            </div>

            {/* Other contact */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-900 mb-5">Other Ways to Reach Us</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">Email</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 hover:underline text-sm font-medium break-all">{CONTACT_EMAIL}</a>
                    <p className="text-xs text-slate-400 mt-1">{RESPONSE_TIME_TEXT}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">Service Area</p>
                    <p className="text-slate-700 text-sm font-medium">{CITY}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Lowndes County and surrounding area</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">Response Time</p>
                    <p className="text-slate-700 text-sm">{RESPONSE_TIME_TEXT}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick links */}
            <div className="bg-brand-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2 text-lg">Not sure where to start?</h3>
              <p className="text-brand-100 text-sm mb-4">If you need housing, fill out our intake form. If you have a property to list, visit our Partners page.</p>
              <div className="flex flex-col gap-2">
                <a href="/#/apply" className="text-sm font-semibold bg-white text-brand-700 py-2 px-4 rounded-lg text-center hover:bg-brand-50 transition-colors">
                  Start Housing Intake →
                </a>
                <a href="/#/partners" className="text-sm font-semibold bg-white/10 text-white py-2 px-4 rounded-lg text-center hover:bg-white/20 transition-colors border border-white/20">
                  List a Property →
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message form */}
          <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
                <MessageSquare size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Send a Message</h3>
            </div>

            {sent ? (
              <div className="text-center py-10">
                <p className="text-slate-500 text-sm">Your email client should have opened. If not, email us directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 font-medium">{CONTACT_EMAIL}</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your Name *</label>
                    <input id="name" type="text" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="(229) 555-0100" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                  <input id="email" type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="jane@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                  <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none"
                    placeholder="How can we help you?" />
                </div>
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors">
                  <Send size={16} /> Send Message
                </button>
                <p className="text-xs text-center text-slate-400">
                  This opens your default email app to send the message directly.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PhoneCard = ({ label, phone, note }: { label: string; phone: string; note: string }) => (
  <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-300 transition-colors">
    <div className="p-2.5 bg-brand-100 text-brand-600 rounded-lg">
      <Phone size={18} />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
      <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-brand-600 font-bold hover:underline text-lg block leading-tight">{phone}</a>
      <p className="text-xs text-slate-400">{note}</p>
    </div>
  </div>
);

export default ContactPage;
