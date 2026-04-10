import React, { useState } from 'react';
import { ClipboardList, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

const ApplyPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    budget: '',
    moveInDate: '',
    hasVoucher: '',
    requirements: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (currentStep === 2) {
      if (!formData.budget.trim()) newErrors.budget = 'Budget range is required';
      if (!formData.moveInDate.trim()) newErrors.moveInDate = 'Move-in date is required';
      if (!formData.hasVoucher) newErrors.hasVoucher = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form Data Submitted:', formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo(0, 0);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Application Received!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for completing the intake form. Our team will review your information and contact you within 24–48 hours.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Start Housing Intake</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Complete the form below to help us understand your housing needs.
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
            <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-brand-500 -z-10 transition-all duration-300`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            
            {[1, 2, 3].map((s) => (
              <div key={s} className={`flex flex-col items-center bg-slate-50 px-2`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${
                  step >= s 
                    ? 'bg-brand-600 border-brand-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {step > s ? <CheckCircle2 size={20} /> : s}
                </div>
                <span className={`text-xs font-medium mt-2 ${step >= s ? 'text-brand-700' : 'text-slate-400'}`}>
                  {s === 1 ? 'Basic Info' : s === 2 ? 'Housing Needs' : 'Review'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                      placeholder="Jane"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} /> {errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} /> {errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} /> {errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} /> {errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Housing Needs */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Housing Preferences</h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Budget Range *</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all ${errors.budget ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                  >
                    <option value="">Select a range</option>
                    <option value="Under $600">Under $600</option>
                    <option value="$600 - $800">$600 - $800</option>
                    <option value="$800 - $1000">$800 - $1000</option>
                    <option value="$1000 - $1200">$1000 - $1200</option>
                    <option value="$1200+">$1200+</option>
                  </select>
                  {errors.budget && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} /> {errors.budget}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Desired Move-in Date *</label>
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all ${errors.moveInDate ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                  />
                  {errors.moveInDate && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} /> {errors.moveInDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Do you have a housing voucher? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasVoucher"
                        value="Yes"
                        checked={formData.hasVoucher === 'Yes'}
                        onChange={handleChange}
                        className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasVoucher"
                        value="No"
                        checked={formData.hasVoucher === 'No'}
                        onChange={handleChange}
                        className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {errors.hasVoucher && <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} /> {errors.hasVoucher}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Specific Requirements or Notes</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder="e.g., Ground floor required, pet friendly, near bus line..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Review Your Information</h2>
                
                <div className="bg-slate-50 rounded-lg p-6 space-y-4 border border-slate-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-slate-500">Name</span>
                      <span className="font-medium text-slate-900">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Email</span>
                      <span className="font-medium text-slate-900">{formData.email}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Phone</span>
                      <span className="font-medium text-slate-900">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Budget</span>
                      <span className="font-medium text-slate-900">{formData.budget}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Move-in Date</span>
                      <span className="font-medium text-slate-900">{formData.moveInDate}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Voucher</span>
                      <span className="font-medium text-slate-900">{formData.hasVoucher}</span>
                    </div>
                  </div>
                  {formData.requirements && (
                    <div className="pt-4 border-t border-slate-200">
                      <span className="block text-slate-500 text-sm mb-1">Notes</span>
                      <p className="text-slate-900 text-sm">{formData.requirements}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                  <ClipboardList className="shrink-0 mt-0.5" size={18} />
                  <p>By submitting this form, you agree to allow Victory Independent Living to contact you regarding housing opportunities. Your information is kept confidential.</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between pt-6 border-t border-slate-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center px-6 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </button>
              ) : (
                <div></div> // Spacer
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-6 py-2.5 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
                >
                  Next Step
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center px-8 py-2.5 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  {!isSubmitting && <CheckCircle2 className="ml-2 w-4 h-4" />}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
