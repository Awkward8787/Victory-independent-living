import React from 'react';
import { NavLink } from 'react-router-dom';
import { SITE_NAME, CITY, CONTACT_EMAIL, CONTACT_PHONE } from '../config';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://res.cloudinary.com/dkolptikx/image/upload/v1772261893/mom_oqle0o.png" 
                alt="Victory Independent Living Logo" 
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-2xl font-bold text-white">{SITE_NAME}</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Connecting people with housing solutions in {CITY}. We help you explore options, prepare applications, and find stability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <NavLink to="/apply" className="hover:text-brand-400 transition-colors">Start Housing Intake</NavLink>
              </li>
              <li>
                <NavLink to="/partners" className="hover:text-brand-400 transition-colors">Partner with Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-brand-400 transition-colors">Contact Support</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-500 shrink-0" size={20} />
                <span>{CITY}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-500 shrink-0" size={20} />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">{CONTACT_EMAIL}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-500 shrink-0" size={20} />
                <a href={`tel:${CONTACT_PHONE}`} className="hover:text-white transition-colors">{CONTACT_PHONE}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p className="mb-2">&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>
            Disclaimer: We are a housing assistance facilitation service. We do not guarantee housing placement. 
            All final decisions are made by property owners and landlords.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
