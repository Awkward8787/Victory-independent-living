import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SITE_NAME } from '../config';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Apply for Housing', path: '/apply', primary: true },
    { name: 'Partner / Landlord', path: '/partners', primary: false },
    { name: 'Contact', path: '/contact', primary: false },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-3 text-brand-700 hover:text-brand-800 transition-colors">
              <img 
                src="https://res.cloudinary.com/dkolptikx/image/upload/v1772261893/mom_oqle0o.png" 
                alt="Victory Independent Living Logo" 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-xl hidden sm:block tracking-tight">{SITE_NAME}</span>
              <span className="font-bold text-xl sm:hidden tracking-tight">Victory IL</span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    link.primary
                      ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md'
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
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-500 hover:text-brand-600 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium ${
                    link.primary
                      ? 'bg-brand-600 text-white shadow-sm'
                      : isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
