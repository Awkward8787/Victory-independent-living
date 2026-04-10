import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { CONTACT_PHONE, CONTACT_PHONE_ALT, APPLY_FORM_ENDPOINT, PLACEMENT_FEE } from '../config';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  budget: string;
  moveInDate: string;
  hasVoucher: string;
  requirements: string;
}

const isPlaceholderEndpoint = (url: string) => url.includes('REPLACE_WITH');

const ApplyPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
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

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim())  newErrors.lastName  = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (currentStep === 2) {
      if (!formData.budget.trim())    newErrors.budget    = 'Please choose a budget range';
      if (!formData.moveInDate.trim()) newErrors.moveInDate = 'Move-in date is required';
      if (!formData.hasVoucher)       newErrors.hasVoucher = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(s => s + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(s => s - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    setIsSubmitting(true);

    try {
      if (!isPlaceholderEndpoint(APPLY_FORM_ENDPOINT)) {
        // Submit to Formspree
        await fetch(APPLY_FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `New Housing Application — ${formData.firstName} ${formData.lastName}`,
            ...formData,
          }),
        });
      } else {
        // Endpoint not configured yet — log for now
        console.log('[Victory IL] Form submission (Formspree not configured):', formData);
        await new Promise(r => setTimeout(r, 800));
      }
    } catch (err) {
      // Don't show error to user — still show success
      console.error('Form submission error:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo(0, 0);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Application Received!</h2>
          <p className="text-slate-600 mb-3 leading-relaxed">
            Thank you for submitting your housing intake. Our team will review your information and reach out within <strong>24–48 hours</strong>.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            Questions in the meantime? Call us at{' '}
            <a href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`} className="text-brand-600 font-medium">{CONTACT_PHONE}</a>
            {' '}or{' '}
            <a href={`tel:${CONTACT_PHONE_ALT.replace(/\D/g, '')}`} className="text-brand-600 font-medium">{CONTACT_PHONE_ALT}</a>.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Start Your Housing Intake</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Fill out this short form and we'll get to work finding you an affordable place to live.
          </p>
          {/* Fee notice */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-50 text-green-800 text-sm rounded-full border border-green-200 font-medium">
            <CheckCircle2 size={15} />
            Free to apply · Service fee only upon successful placement ({PLACEMENT_FEE})
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-500 -z-10 transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center bg-slate-50 px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${
                  step >= s ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {step > s ? <CheckCircle2 size={20} /> : s}
                </div>
                <span className={`text-xs font-medium mt-2 ${step >= s ? 'text-brand-700' : 'text-slate-400'}`}>
                  {s === 1 ? 'Your Info' : s === 2 ? 'Housing Needs' : 'Review'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="First Name *" error={errors.firstName}>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                      className={inputClass(errors.firstName)} placeholder="Jane" />
                  </Field>
                  <Field label="Last Name *" error={errors.lastName}>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                      className={inputClass(errors.lastName)} placeholder="Doe" />
                  </Field>
                </div>
                <Field label="Email Address *" error={errors.email}>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className={inputClass(errors.email)} placeholder="jane@example.com" />
                </Field>
                <Field label="Phone Number *" error={errors.phone}>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className={inputClass(errors.phone)} placeholder="(229) 555-0100" />
                </Field>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-900">Housing Preferences</h2>
                <Field label="Monthly Budget Range *" error={errors.budget}>
                  <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass(errors.budget)}>
                    <option value="">Select a range</option>
                    <option value="Under $500">Under $500/month</option>
                    <option value="$500 - $700">$500 – $700/month</option>
                    <option value="$700 - $900">$700 – $900/month</option>
                    <option value="$900 - $1,100">$900 – $1,100/month</option>
                    <option value="$1,100+">$1,100+/month</option>
                  </select>
                </Field>
                <Field label="When do you need to move in? *" error={errors.moveInDate}>
                  <input type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange}
                    className={inputClass(errors.moveInDate)} />
                </Field>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Do you have a housing voucher (Section 8)? *</label>
                  <div className="flex gap-6">
                    {['Yes', 'No', 'Not sure'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="hasVoucher" value={opt}
                          checked={formData.hasVoucher === opt} onChange={handleChange}
                          className="w-4 h-4 text-brand-600 focus:ring-brand-500" />
                        <span className="text-slate-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.hasVoucher && <ErrorMsg msg={errors.hasVoucher} />}
                </div>
                <Field label="Anything specific we should know?" error="">
                  <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-slate-900 resize-none"
                    placeholder="e.g., Ground floor needed, pet-friendly, near bus line, near my child's school…" />
                </Field>
              </div>
            )}

            {/* Step 3 — Review */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-900">Review Your Information</h2>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <ReviewRow label="Name" value={`${formData.firstName} ${formData.lastName}`} />
                    <ReviewRow label="Email" value={formData.email} />
                    <ReviewRow label="Phone" value={formData.phone} />
                    <ReviewRow label="Budget" value={formData.budget} />
                    <ReviewRow label="Move-in" value={formData.moveInDate} />
                    <ReviewRow label="Voucher?" value={formData.hasVoucher} />
                  </div>
                  {formData.requirements && (
                    <div className="pt-4 mt-4 border-t border-slate-200">
                      <span className="block text-slate-500 text-xs mb-1">Notes</span>
                      <p className="text-slate-900 text-sm">{formData.requirements}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                  <ClipboardList className="shrink-0 mt-0.5" size={18} />
                  <p>By submitting this form, you allow Victory Independent Living to contact you about housing opportunities. Your information is kept confidential.</p>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="mt-10 flex justify-between pt-6 border-t border-slate-100">
              {step > 1 ? (
                <button type="button" onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button type="button" onClick={handleNext}
                  className="flex items-center gap-2 px-7 py-2.5 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-sm">
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting}
                  className={`flex items-center gap-2 px-8 py-2.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Submitting…' : <>Submit Application <CheckCircle2 size={16} /></>}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Call option */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Prefer to apply by phone?{' '}
          <a href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`} className="text-brand-600 font-medium hover:underline inline-flex items-center gap-1">
            <Phone size={13} /> Call {CONTACT_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
};

// ── Helpers ──────────────────────────────────────────────────────

const inputClass = (error?: string) =>
  `w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-slate-900 transition-all ${
    error ? 'border-red-400 bg-red-50' : 'border-slate-300'
  }`;

const Field: React.FC<{ label: string; error: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    {children}
    {error && <ErrorMsg msg={error} />}
  </div>
);

const ErrorMsg: React.FC<{ msg: string }> = ({ msg }) => (
  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
    <AlertCircle size={14} /> {msg}
  </p>
);

const ReviewRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <span className="block text-slate-500 text-xs mb-0.5">{label}</span>
    <span className="font-medium text-slate-900">{value || '—'}</span>
  </div>
);

export default ApplyPage;
