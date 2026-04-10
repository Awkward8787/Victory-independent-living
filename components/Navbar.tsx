import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { SITE_NAME, CONTACT_PHONE } from '../config';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Find Housing',    path: '/apply',     primary: true },
    { name: 'List a Property', path: '/partners',  primary: false },
    { name: 'Resources',       path: '/resources', primary: false },
    { name: 'Contact',         path: '/contact',   primary: false },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-3 text-brand-700 hover:text-brand-800 transition-colors">
              <img
                src="https://res.cloudinary.com/dkolptikx/image/upload/v1772261893/mom_oqle0o.png"
                alt="Victory Independent Living Logo"
                className="h-14 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="hidden sm:block">
                <span className="font-bold text-lg tracking-tight text-slate-900 block leading-tight">Victory Independent</span>
                <span className="font-bold text-lg tracking-tight text-brand-600 block leading-tight">Living</span>
              </div>
              <span className="font-bold text-lg sm:hidden tracking-tight text-slate-900">Victory IL</span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {/* Quick call link */}
            <a
              href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-500 hover:text-brand-600 transition-colors mr-2"
            >
              <Phone size={14} />
              {CONTACT_PHONE}
            </a>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    link.primary
                      ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm'
                      : isActive
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <a href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`} className="text-brand-600">
              <Phone size={20} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-500 hover:text-brand-600 hover:bg-slate-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    link.primary
                      ? 'bg-brand-600 text-white'
                      : isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-brand-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a
              href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50"
            >
              <Phone size={16} />
              {CONTACT_PHONE}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
