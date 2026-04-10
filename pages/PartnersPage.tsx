import React, { useState } from 'react';
import { Building2, CheckCircle, ArrowRight, CheckCircle2, AlertCircle, Phone, Clock, DollarSign, Users } from 'lucide-react';
import { CONTACT_PHONE, CONTACT_PHONE_ALT, PARTNER_FORM_ENDPOINT } from '../config';

const isPlaceholderEndpoint = (url: string) => url.includes('REPLACE_WITH');

const PartnersPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Private Room',
    address: '',
    rent: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim())  newErrors.name  = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      if (!isPlaceholderEndpoint(PARTNER_FORM_ENDPOINT)) {
        await fetch(PARTNER_FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `New Property Listing — ${formData.name}`,
            ...formData,
          }),
        });
      } else {
        console.log('[Victory IL] Partner form (Formspree not configured):', formData);
        await new Promise(r => setTimeout(r, 800));
      }
    } catch (err) {
      console.error('Partner form error:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">List Your Property</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have a room, apartment, or house in Valdosta? We connect you with ready-to-move tenants. Free to list — always.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: Value props */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Why partner with Victory IL?</h2>
              <p className="text-slate-600 leading-relaxed">
                We work directly with residents seeking stable housing. When you list with us, you get access to pre-screened applicants who are actively supported in their housing journey — meaning less vacancy time and less hassle for you.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-5">
              <BenefitCard
                icon={<Clock size={22} />}
                title="Fill Vacancies Faster"
                desc="Stop waiting. We maintain an active pool of tenants ready to move."
              />
              <BenefitCard
                icon={<Users size={22} />}
                title="Pre-screened Applicants"
                desc="We gather initial intake info so you can make informed decisions quickly."
              />
              <BenefitCard
                icon={<DollarSign size={22} />}
                title="Free to List"
                desc="There is no cost to submit your property. We earn on the tenant side."
              />
              <BenefitCard
                icon={<CheckCircle size={22} />}
                title="Community Impact"
                desc="Play a real role in providing stable, dignified housing in Valdosta."
              />
            </div>

            {/* What happens after */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">What happens after you submit?</h3>
              <ol className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                  We review your property details within 1–2 business days
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                  We contact you to confirm details and discuss your preferences
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                  We match your listing to qualified tenants from our intake pool
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
                  You review the applicant and decide — you always have final say
                </li>
              </ol>
            </div>

            {/* Direct call */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors text-sm">
                <Phone size={16} /> {CONTACT_PHONE}
              </a>
              <a href={`tel:${CONTACT_PHONE_ALT.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 px-5 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm">
                <Phone size={16} /> {CONTACT_PHONE_ALT}
              </a>
            </div>
          </div>

          {/* Right: Form card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            {!showForm && !isSuccess ? (
              <div className="text-center py-8">
                <div className="flex items-center justify-center w-20 h-20 bg-brand-100 text-brand-600 rounded-2xl mb-6 mx-auto">
                  <Building2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Have a Property or Room?</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Submit your property details and we'll reach out to discuss partnership opportunities. No fees, no commitment.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 text-white text-lg font-semibold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-0.5"
                >
                  Submit a Property
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Submission Received!</h3>
                <p className="text-slate-500 mb-2 leading-relaxed">
                  Thanks for your interest in partnering with us. We'll review your property and be in touch within 1–2 business days.
                </p>
                <p className="text-sm text-slate-400 mb-8">
                  Questions? Call us at <a href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`} className="text-brand-600 font-medium">{CONTACT_PHONE}</a>.
                </p>
                <button
                  onClick={() => { setIsSuccess(false); setShowForm(false); setFormData({ name: '', email: '', phone: '', propertyType: 'Private Room', address: '', rent: '', message: '' }); }}
                  className="text-brand-600 font-medium hover:underline text-sm"
                >
                  Submit another property →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Property Details</h3>
                  <button type="button" onClick={() => setShowForm(false)} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-brand-500 ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-300'}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1 flex gap-1 items-center"><AlertCircle size={12}/>{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-brand-500 ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-300'}`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1 flex gap-1 items-center"><AlertCircle size={12}/>{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-brand-500 ${errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-300'}`} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 flex gap-1 items-center"><AlertCircle size={12}/>{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500">
                    <option>Private Room</option>
                    <option>Shared Room</option>
                    <option>Studio / Efficiency</option>
                    <option>1-Bedroom Apartment</option>
                    <option>2+ Bedroom Apartment</option>
                    <option>Single Family Home</option>
                    <option>Garage Apartment / ADU</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address / Area</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange}
                      placeholder="e.g., Near VSU, N. Oak St"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Rent ($)</label>
                    <input type="text" name="rent" value={formData.rent} onChange={handleChange}
                      placeholder="e.g., 550"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Additional Details</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={3}
                    placeholder="Tell us about the property — utilities included, move-in date, any requirements…"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-70 shadow-md">
                  {isSubmitting ? 'Sending…' : 'Submit Property'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FaqItem q="Are there any fees to list my property?"
              a="No. Listing your property with Victory IL is completely free. We earn a small service fee from tenants upon successful placement." />
            <FaqItem q="Do you guarantee the tenant?"
              a="We facilitate the match and do initial intake screening, but the final lease agreement is between you and the tenant. You always have final approval." />
            <FaqItem q="What area do you serve?"
              a="We primarily serve Valdosta, Georgia and the surrounding Lowndes County area." />
            <FaqItem q="What types of properties work best?"
              a="Anything affordable helps — private rooms, shared rooms, studio apartments, or full units. If it's in Valdosta and priced accessibly, we want to hear from you." />
            <FaqItem q="How quickly can I expect a tenant referral?"
              a="It depends on availability in our intake pool. Most properties receive a qualified referral within 1–2 weeks of listing." />
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Sub-components ─────────────────────────────────────────────────

const BenefitCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-brand-300 transition-colors">
    <div className="text-brand-600 mb-3">{icon}</div>
    <h4 className="font-bold text-slate-900 mb-1 text-sm">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FaqItem = ({ q, a }: { q: string, a: string }) => (
  <div className="border-b border-slate-100 pb-6 last:border-0">
    <h4 className="text-base font-semibold text-slate-900 mb-2">{q}</h4>
    <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
  </div>
);

export default PartnersPage;
