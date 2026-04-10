import React from 'react';
import { NavLink } from 'react-router-dom';
import { SITE_NAME, CITY, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_ALT } from '../config';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/dkolptikx/image/upload/v1772261893/mom_oqle0o.png"
                alt="Victory Independent Living Logo"
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-xl font-bold text-white">{SITE_NAME}</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Connecting people with affordable housing in {CITY}. We help you find rooms, prepare applications, and get matched with landlords ready to help.
            </p>
            <p className="text-xs text-slate-500">
              Disclaimer: We are a housing facilitation service. We do not guarantee placement.
              All final decisions are made by property owners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigate</h4>
            <ul className="space-y-3 text-sm">
              <li><NavLink to="/apply"     className="hover:text-brand-400 transition-colors">Find Housing</NavLink></li>
              <li><NavLink to="/partners"  className="hover:text-brand-400 transition-colors">List a Property</NavLink></li>
              <li><NavLink to="/resources" className="hover:text-brand-400 transition-colors">Community Resources</NavLink></li>
              <li><NavLink to="/contact"   className="hover:text-brand-400 transition-colors">Contact Us</NavLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-500 shrink-0 mt-0.5" size={16} />
                <span>{CITY}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-500 shrink-0" size={16} />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`} className="hover:text-white transition-colors">{CONTACT_PHONE}</a>
                  <a href={`tel:${CONTACT_PHONE_ALT.replace(/\D/g, '')}`} className="hover:text-white transition-colors">{CONTACT_PHONE_ALT}</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-500 shrink-0" size={16} />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors break-all">{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved. | Serving {CITY}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
