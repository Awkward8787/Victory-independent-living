import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Home, Users, ClipboardCheck,
  Phone, Heart, Building2, Utensils, Bus, BookOpen
} from 'lucide-react';
import { FOUNDERS, CITY, CONTACT_PHONE, CONTACT_PHONE_ALT } from '../config';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/dkolptikx/image/upload/v1772262314/pexels-pixabay-276551_ckiuag.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/20 text-brand-300 rounded-full text-sm font-medium mb-6 border border-brand-500/30">
              <Home size={14} />
              Serving {CITY}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Affordable housing help,{' '}
              <span className="text-brand-400">right here in Valdosta.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Victory Independent Living connects residents with affordable rooms and shared housing — and connects property owners with ready-to-move tenants.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <NavLink
                to="/apply"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-brand-600 hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/25"
              >
                I Need Housing
                <ArrowRight className="ml-2 w-5 h-5" />
              </NavLink>
              <NavLink
                to="/partners"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-600 hover:text-white transition-all"
              >
                I Have a Room / Property
              </NavLink>
            </div>

            {/* Phone CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">Prefer to call?</span>
              <a href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`} className="flex items-center gap-1.5 text-brand-300 hover:text-brand-200 font-medium transition-colors">
                <Phone size={14} /> {CONTACT_PHONE}
              </a>
              <span className="hidden sm:inline text-slate-600">or</span>
              <a href={`tel:${CONTACT_PHONE_ALT.replace(/\D/g, '')}`} className="flex items-center gap-1.5 text-brand-300 hover:text-brand-200 font-medium transition-colors">
                <Phone size={14} /> {CONTACT_PHONE_ALT}
              </a>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              {FOUNDERS.role} <span className="text-brand-300 font-medium">{FOUNDERS.names}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two Paths ────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Who do you need help for?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tenant card */}
            <div className="border-2 border-brand-200 rounded-2xl p-8 hover:border-brand-500 transition-colors group">
              <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mb-5">
                <Home size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">I'm Looking for Housing</h3>
              <ul className="space-y-2 text-slate-600 mb-6 text-sm">
                <CheckItem text="Need an affordable room or shared housing" />
                <CheckItem text="Have a housing voucher (Section 8) welcome" />
                <CheckItem text="First-time renter or rebuilding after hardship" />
                <CheckItem text="Flexible or short-term arrangements" />
              </ul>
              <NavLink
                to="/apply"
                className="flex items-center justify-center gap-2 w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors group-hover:shadow-md"
              >
                Start Housing Intake <ArrowRight size={16} />
              </NavLink>
            </div>

            {/* Landlord card */}
            <div className="border-2 border-slate-200 rounded-2xl p-8 hover:border-slate-400 transition-colors group">
              <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mb-5">
                <Building2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">I Have a Room / Property</h3>
              <ul className="space-y-2 text-slate-600 mb-6 text-sm">
                <CheckItem text="Fill vacancies faster with ready tenants" />
                <CheckItem text="Free to list — no upfront cost to you" />
                <CheckItem text="We do the initial tenant matching" />
                <CheckItem text="Community impact in Valdosta" />
              </ul>
              <NavLink
                to="/partners"
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-900 transition-colors group-hover:shadow-md"
              >
                List My Property <ArrowRight size={16} />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
            <p className="mt-3 text-lg text-slate-500">Three simple steps to get housed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              step="1"
              icon={<ClipboardCheck size={28} />}
              title="Complete Intake"
              desc="Fill out our short housing form online. Tell us your budget, timeline, and what you need. Takes about 5 minutes."
            />
            <StepCard
              step="2"
              icon={<Users size={28} />}
              title="We Review & Match"
              desc="Our team reviews your profile and looks for available rooms and properties that fit your needs and budget."
            />
            <StepCard
              step="3"
              icon={<Home size={28} />}
              title="Get Placed"
              desc="We connect you directly with the landlord. We guide you through the application and help you get in the door."
            />
          </div>
        </div>
      </section>

      {/* ── What We Help With ─────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What we help with</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                We know finding housing is stressful — especially on a tight budget. Victory IL takes the guesswork out of it.
              </p>
              <ul className="space-y-3">
                <FeatureItem text="Affordable rooms and shared housing in Valdosta" />
                <FeatureItem text="Room-share and co-living opportunities" />
                <FeatureItem text="Housing voucher (Section 8) friendly listings" />
                <FeatureItem text="First-time renter guidance and document prep" />
                <FeatureItem text="Connecting landlords with qualified tenants" />
                <FeatureItem text="Support for people rebuilding after hardship" />
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <NavLink
                  to="/apply"
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
                >
                  Apply Now — It's Free
                </NavLink>
                <NavLink
                  to="/resources"
                  className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Community Resources
                </NavLink>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl shadow-xl overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dkolptikx/image/upload/v1772262314/pexels-jvdm-3753436_efi7eg.jpg"
                  alt="Comfortable living space"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Resources Preview ───────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Valdosta Community Resources</h2>
            <p className="text-slate-500">Housing is just one piece. We keep a directory of free services to help you stay stable.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <ResourcePreviewCard icon={<Home size={20} />} title="Housing Assistance" desc="Vouchers, emergency rent help, DFCS" />
            <ResourcePreviewCard icon={<Utensils size={20} />} title="Food & Nutrition" desc="Food banks, hot meals, SNAP" />
            <ResourcePreviewCard icon={<Bus size={20} />} title="Transportation" desc="VATS bus service, senior rides" />
            <ResourcePreviewCard icon={<Heart size={20} />} title="Healthcare" desc="Affordable clinics, Medicaid" />
          </div>
          <div className="text-center">
            <NavLink
              to="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
            >
              <BookOpen size={18} />
              View Full Resource Directory
            </NavLink>
          </div>
        </div>
      </section>

      {/* ── Trust & Privacy ───────────────────────────────────────── */}
      <section className="py-14 bg-slate-900 text-slate-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Your Privacy Matters</h2>
          <p className="mb-4 leading-relaxed">
            Victory Independent Living respects your personal information. All data submitted through our intake forms is kept confidential and used solely for housing assistance.
          </p>
          <p className="text-sm text-slate-500">
            * We help explore housing options but cannot guarantee placement. Acceptance is subject to landlord criteria and availability. A small service fee may apply upon successful placement.
          </p>
        </div>
      </section>

    </div>
  );
};

// ── Sub-components ────────────────────────────────────────────────

const StepCard = ({ step, icon, title, desc }: { step: string, icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
    <div className="absolute top-4 right-5 text-6xl font-black text-slate-100 leading-none select-none">{step}</div>
    <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-5 relative z-10">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2.5">
    <CheckCircle2 className="text-brand-500 shrink-0 mt-0.5" size={17} />
    <span className="text-slate-700">{text}</span>
  </li>
);

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="text-brand-500 shrink-0 mt-0.5" size={20} />
    <span className="text-slate-700 text-lg">{text}</span>
  </li>
);

const ResourcePreviewCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <NavLink
    to="/resources"
    className="p-5 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-md transition-all block text-center group"
  >
    <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-100 transition-colors">
      {icon}
    </div>
    <h4 className="font-bold text-slate-900 text-sm mb-1">{title}</h4>
    <p className="text-xs text-slate-500 leading-snug">{desc}</p>
  </NavLink>
);

export default HomePage;
