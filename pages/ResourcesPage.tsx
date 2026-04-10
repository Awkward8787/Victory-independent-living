import React, { useState } from 'react';
import { Home, Utensils, Bus, Heart, DollarSign, Briefcase, Phone, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { CONTACT_PHONE, CONTACT_PHONE_ALT } from '../config';

interface Resource {
  name: string;
  description: string;
  phone?: string;
  website?: string;
  address?: string;
  note?: string;
}

interface Category {
  icon: React.ReactNode;
  title: string;
  color: string;
  resources: Resource[];
}

const CATEGORIES: Category[] = [
  {
    icon: <Home size={22} />,
    title: 'Housing Assistance',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    resources: [
      {
        name: 'Valdosta Housing Authority',
        description: 'Public housing units and Housing Choice Vouchers (Section 8) for eligible low-income families.',
        phone: '(229) 244-2454',
        address: '905 N. Lee St, Valdosta, GA',
        note: 'Call to check waitlist status',
      },
      {
        name: 'South Georgia Community Action Council',
        description: 'Emergency rental and utility assistance for qualifying low-income residents.',
        phone: '(229) 244-6256',
        address: 'Valdosta, GA',
      },
      {
        name: 'Lowndes County DFCS',
        description: 'State agency providing emergency housing assistance, TANF, and other safety-net services.',
        phone: '(229) 333-5200',
        address: '100 Quality Court, Valdosta, GA',
      },
      {
        name: '211 Georgia (Housing Navigation)',
        description: 'Dial 2-1-1 any time for free, confidential help finding housing resources in your area.',
        phone: '2-1-1',
        website: 'https://www.211ga.org',
        note: 'Available 24/7',
      },
    ],
  },
  {
    icon: <Utensils size={22} />,
    title: 'Food & Nutrition',
    color: 'bg-green-50 text-green-700 border-green-200',
    resources: [
      {
        name: "Second Harvest of South Georgia",
        description: 'Regional food bank serving Valdosta and surrounding counties. Find the nearest distribution site.',
        phone: '(229) 244-2678',
        website: 'https://www.feedingsga.org',
        address: '4500 Industrial Dr, Valdosta, GA',
      },
      {
        name: "God's Kitchen of Valdosta",
        description: 'Free hot meals served Monday–Friday. No ID or eligibility requirements — everyone is welcome.',
        phone: '(229) 247-0840',
        address: '116 N. Lee St, Valdosta, GA',
      },
      {
        name: 'St. Vincent de Paul Society',
        description: 'Food pantry and emergency assistance for individuals and families in need.',
        phone: '(229) 242-4857',
        address: 'Valdosta, GA',
      },
      {
        name: 'SNAP (Food Stamps)',
        description: 'Monthly food assistance through Georgia DFCS. Apply online or at the Lowndes County office.',
        phone: '(877) 423-4746',
        website: 'https://gateway.ga.gov',
        note: 'Apply online at gateway.ga.gov',
      },
    ],
  },
  {
    icon: <Bus size={22} />,
    title: 'Transportation',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    resources: [
      {
        name: 'VATS — Valdosta Area Transit System',
        description: 'Local bus service covering Valdosta and parts of Lowndes County. Fixed routes and paratransit options.',
        phone: '(229) 259-3595',
        website: 'https://www.valdostacity.com/transit',
        note: 'Fare: $1.25/ride | Reduced fare available for seniors and disabled riders',
      },
      {
        name: 'Lowndes County Senior Services (LCSS)',
        description: 'Medical transportation and senior rides for qualifying residents aged 60+.',
        phone: '(229) 671-2065',
        address: 'Valdosta, GA',
      },
    ],
  },
  {
    icon: <Heart size={22} />,
    title: 'Healthcare',
    color: 'bg-red-50 text-red-700 border-red-200',
    resources: [
      {
        name: 'Azalea Health — Community Health Center',
        description: 'Sliding-scale fees based on income. Primary care, dental, and behavioral health services.',
        phone: '(229) 242-6411',
        website: 'https://www.azaleahealth.org',
        address: 'Multiple locations in Valdosta',
      },
      {
        name: 'South Georgia Medical Center',
        description: 'Main hospital serving the Valdosta area. Financial assistance programs available for qualifying patients.',
        phone: '(229) 333-1000',
        address: '2501 N. Patterson St, Valdosta, GA',
        website: 'https://www.sgmc.org',
      },
      {
        name: 'Georgia Medicaid',
        description: 'Free or low-cost health coverage for qualifying low-income individuals and families. Apply through DFCS.',
        phone: '(877) 423-4746',
        website: 'https://gateway.ga.gov',
        note: 'Apply at gateway.ga.gov or your local DFCS office',
      },
    ],
  },
  {
    icon: <DollarSign size={22} />,
    title: 'Financial & Benefits',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    resources: [
      {
        name: 'Georgia DFCS (SNAP, Medicaid, TANF)',
        description: 'Apply for food assistance, health coverage, and cash assistance for families with children.',
        phone: '(877) 423-4746',
        website: 'https://gateway.ga.gov',
        address: '100 Quality Court, Valdosta, GA',
      },
      {
        name: '211 Georgia (Benefits Navigation)',
        description: 'Free, confidential help understanding and applying for benefits programs.',
        phone: '2-1-1',
        website: 'https://www.211ga.org',
        note: 'Available 24/7 — speak to a live specialist',
      },
      {
        name: 'South Georgia Community Action Council',
        description: 'Utility assistance (LIHEAP), weatherization, and financial coaching for low-income households.',
        phone: '(229) 244-6256',
        address: 'Valdosta, GA',
      },
    ],
  },
  {
    icon: <Briefcase size={22} />,
    title: 'Employment & Job Training',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    resources: [
      {
        name: 'GeorgiaWORKS — Valdosta Career Center',
        description: 'Free job search assistance, resume help, skills training, and unemployment services.',
        phone: '(229) 245-4504',
        website: 'https://www.dol.state.ga.us',
        address: '327 N. Ashley St, Valdosta, GA',
      },
      {
        name: 'Goodwill of North Georgia — Valdosta',
        description: 'Free employment services including job placement, skills training, and interview prep.',
        phone: '(229) 671-1200',
        website: 'https://www.goodwillng.org',
        address: 'Valdosta, GA',
      },
      {
        name: 'Wiregrass Georgia Technical College',
        description: 'Affordable vocational and technical training programs. Financial aid and workforce grants available.',
        phone: '(229) 333-2100',
        website: 'https://www.wiregrass.edu',
        address: '4089 Val Tech Rd, Valdosta, GA',
      },
    ],
  },
];

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
  <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <h4 className="font-bold text-slate-900 mb-1">{resource.name}</h4>
    <p className="text-slate-600 text-sm leading-relaxed mb-3">{resource.description}</p>
    {resource.note && (
      <p className="text-xs text-brand-700 bg-brand-50 rounded px-2 py-1 inline-block mb-3">{resource.note}</p>
    )}
    <div className="flex flex-wrap gap-3 text-sm">
      {resource.phone && (
        <a href={`tel:${resource.phone.replace(/\D/g, '')}`} className="flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium">
          <Phone size={14} />
          {resource.phone}
        </a>
      )}
      {resource.website && (
        <a href={resource.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-brand-600 transition-colors">
          <ExternalLink size={14} />
          Website
        </a>
      )}
    </div>
    {resource.address && (
      <p className="text-xs text-slate-400 mt-2">{resource.address}</p>
    )}
  </div>
);

const CategorySection: React.FC<{ category: Category }> = ({ category }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${category.color}`}>
            {category.icon}
          </div>
          <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{category.title}</h2>
        </div>
        <div className="text-slate-400">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      {open && (
        <div className="grid sm:grid-cols-2 gap-4 animate-fadeIn">
          {category.resources.map((r, i) => (
            <ResourceCard key={i} resource={r} />
          ))}
        </div>
      )}
    </div>
  );
};

const ResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Valdosta Community Resources</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Free and low-cost services available in the Valdosta, Georgia area — housing, food, healthcare, transportation, and more.
          </p>
        </div>
      </div>

      {/* Quick Help Banner */}
      <div className="bg-brand-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-medium">Need help finding the right resource? Call us — we'll point you in the right direction.</p>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-5 py-2 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors text-sm">
              <Phone size={15} />
              {CONTACT_PHONE}
            </a>
            <a href={`tel:${CONTACT_PHONE_ALT.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors text-sm border border-white/20">
              <Phone size={15} />
              {CONTACT_PHONE_ALT}
            </a>
          </div>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {CATEGORIES.map((cat, i) => (
          <CategorySection key={i} category={cat} />
        ))}

        {/* Disclaimer */}
        <div className="mt-8 p-5 bg-slate-100 rounded-xl border border-slate-200 text-sm text-slate-500 text-center">
          <p>
            This directory is provided for informational purposes only. Victory Independent Living is not affiliated with these organizations.
            Contact each organization directly to verify eligibility, hours, and current availability.
            Information may change — last reviewed April 2026.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
