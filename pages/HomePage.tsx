import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Home, Users, ClipboardCheck } from 'lucide-react';
import { FOUNDERS, CITY } from '../config';
import LocalInsights from '../components/LocalInsights';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/dkolptikx/image/upload/v1772262314/pexels-pixabay-276551_ckiuag.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Finding a home starts with <span className="text-brand-400">the right support.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Victory Independent Living helps residents in {CITY} navigate housing options, prepare applications, and connect with local landlords.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink 
                to="/apply" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-brand-600 hover:bg-brand-700 md:w-auto w-full transition-all shadow-lg hover:shadow-brand-500/25"
              >
                Start Housing Intake
                <ArrowRight className="ml-2 w-5 h-5" />
              </NavLink>
              <NavLink 
                to="/partners" 
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-lg font-semibold rounded-lg text-slate-200 bg-slate-800/50 hover:bg-slate-800 hover:text-white md:w-auto w-full transition-all backdrop-blur-sm"
              >
                I Have a Room / Property
              </NavLink>
            </div>
            <div className="mt-8 text-sm text-slate-400 font-medium">
              {FOUNDERS.role} <span className="text-brand-300">{FOUNDERS.names}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Local Insights (Gemini) Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <LocalInsights />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600">We simplify the process of finding your next home.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              icon={<ClipboardCheck size={32} />}
              title="1. Complete Intake"
              desc="Fill out our housing intake form. We'll gather your preferences, budget, and rental history."
            />
            <StepCard 
              icon={<Users size={32} />}
              title="2. Assessment"
              desc="Our team reviews your profile to understand your needs and match you with potential opportunities."
            />
            <StepCard 
              icon={<Home size={32} />}
              title="3. Placement Support"
              desc="We guide you through applications and connect you with landlords who have available spaces."
            />
          </div>
        </div>
      </section>

      {/* Services / What We Help With */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">What we can help with</h2>
              <ul className="space-y-4">
                <FeatureItem text="Finding affordable rental options in Valdosta" />
                <FeatureItem text="Connecting with room-share opportunities" />
                <FeatureItem text="Application readiness and document prep" />
                <FeatureItem text="Guidance for first-time renters" />
                <FeatureItem text="Support for landlords filling vacancies" />
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dkolptikx/image/upload/v1772262314/pexels-jvdm-3753436_efi7eg.jpg" 
                  alt="Comfortable living space" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Privacy */}
      <section className="py-16 bg-slate-900 text-slate-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Your Privacy Matters</h2>
          <p className="mb-6 leading-relaxed">
            Victory Independent Living respects your personal information. All data submitted via our intake forms is kept confidential and used solely for the purpose of housing assistance.
          </p>
          <p className="text-sm text-slate-500">
            * We help explore housing options but cannot guarantee placement. Acceptance is subject to landlord criteria and availability.
          </p>
        </div>
      </section>
    </div>
  );
};

const StepCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-8 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="text-brand-500 shrink-0 mt-0.5" size={20} />
    <span className="text-slate-700 text-lg">{text}</span>
  </li>
);

export default HomePage;
