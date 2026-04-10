import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { getFormUrlWithUtm } from '../config';

interface FormCtaCardProps {
  title: string;
  description: string;
  buttonText: string;
  formUrl: string;
  utmCampaign: string;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

const FormCtaCard: React.FC<FormCtaCardProps> = ({
  title,
  description,
  buttonText,
  formUrl,
  utmCampaign,
  variant = 'primary',
  icon
}) => {
  const finalUrl = getFormUrlWithUtm(formUrl, utmCampaign);

  const baseClasses = "flex flex-col h-full p-6 rounded-2xl transition-all duration-300 border shadow-sm hover:shadow-md";
  const variantClasses = variant === 'primary' 
    ? "bg-white border-slate-200 hover:border-brand-500" 
    : "bg-slate-50 border-slate-200 hover:border-slate-400";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <div className="mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
          variant === 'primary' ? 'bg-brand-100 text-brand-600' : 'bg-slate-200 text-slate-600'
        }`}>
          {icon || <FileText size={24} />}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
      
      <div className="mt-auto pt-4">
        <a 
          href={finalUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center w-full px-6 py-3 text-base font-semibold rounded-lg transition-colors duration-200 ${
            variant === 'primary'
              ? 'bg-brand-600 text-white hover:bg-brand-700'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          {buttonText}
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default FormCtaCard;
