import React, { useState } from 'react';
import { Building2, Users, CheckCircle, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const PartnersPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Single Family Home',
    address: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Partner Form Submitted:', formData);
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
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Partner With Us</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Do you have a room, apartment, or house for rent? We connect verified tenants with local property owners.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why list with Victory IL?</h2>
              <p className="text-slate-600 leading-relaxed">
                We work directly with individuals seeking housing stability. By partnering with us, you get access to a pool of applicants who are actively supported in their housing journey.
              </p>
            </div>

            <div className="space-y-6">
              <Benefit 
                title="Fill Vacancies Faster"
                desc="Reduce downtime by connecting with ready-to-move tenants immediately."
              />
              <Benefit 
                title="Pre-screened Applicants"
                desc="We help gather initial info so you can make informed decisions quickly."
              />
              <Benefit 
                title="Community Impact"
                desc="Play a vital role in strengthening the Valdosta community by providing stable housing."
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
             {!showForm && !isSuccess ? (
               <div className="text-center py-8">
                 <div className="flex items-center justify-center w-20 h-20 bg-brand-100 text-brand-600 rounded-full mb-6 mx-auto">
                    <Building2 size={40} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-4">Have a Property?</h3>
                 <p className="text-slate-600 mb-8">
                   Submit your property details and we'll contact you to discuss partnership opportunities.
                 </p>
                 <button 
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-8 py-4 bg-brand-600 text-white text-lg font-semibold rounded-lg hover:bg-brand-700 shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1"
                >
                  Submit a Property / Room
                  <ArrowRight className="ml-2" />
                </button>
               </div>
             ) : isSuccess ? (
               <div className="text-center py-12">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Submission Received!</h3>
                  <p className="text-slate-600 mb-8">
                    Thanks for your interest in partnering with us. We'll be in touch shortly.
                  </p>
                  <button 
                    onClick={() => { setIsSuccess(false); setShowForm(false); setFormData({ ...formData, message: '' }); }}
                    className="text-brand-600 font-medium hover:underline"
                  >
                    Submit another property
                  </button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xl font-bold text-slate-900">Property Details</h3>
                   <button type="button" onClick={() => setShowForm(false)} className="text-sm text-slate-500 hover:text-slate-700">Cancel</button>
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Your Name *</label>
                   <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                   />
                   {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                     <input
                       type="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                     />
                     {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                     <input
                       type="tel"
                       name="phone"
                       value={formData.phone}
                       onChange={handleChange}
                       className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                     />
                     {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
                   <select
                     name="propertyType"
                     value={formData.propertyType}
                     onChange={handleChange}
                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                   >
                     <option>Single Family Home</option>
                     <option>Apartment Unit</option>
                     <option>Private Room</option>
                     <option>Garage Apartment / ADU</option>
                     <option>Other</option>
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Message / Details</label>
                   <textarea
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     rows={3}
                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                     placeholder="Tell us a bit about the property..."
                   />
                 </div>

                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors shadow-md disabled:opacity-70"
                 >
                   {isSubmitting ? 'Sending...' : 'Send Information'}
                 </button>
               </form>
             )}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FaqItem 
              q="Are there any fees to list my property?" 
              a="No, there is absolutely no cost to submit your property information to our network." 
            />
             <FaqItem 
              q="Do you guarantee the tenant?" 
              a="We facilitate the connection and help with intake, but the final lease agreement and vetting is between you and the tenant." 
            />
            <FaqItem 
              q="What area do you serve?" 
              a="We primarily focus on Valdosta, Georgia and the immediate surrounding Lowndes County area." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Benefit = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="mt-1">
      <CheckCircle className="text-brand-500" size={24} />
    </div>
    <div>
      <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      <p className="text-slate-600">{desc}</p>
    </div>
  </div>
);

const FaqItem = ({ q, a }: { q: string, a: string }) => (
  <div className="border-b border-slate-100 pb-6 last:border-0">
    <h4 className="text-lg font-semibold text-slate-900 mb-2">{q}</h4>
    <p className="text-slate-600">{a}</p>
  </div>
);

export default PartnersPage;
