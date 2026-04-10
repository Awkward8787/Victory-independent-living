import React, { useState } from 'react';
import { Search, MapPin, Sparkles, ExternalLink, Loader2 } from 'lucide-react';
import { searchKnowledgeBase, findLocalAmenities } from '../services/geminiService';
import { ChatMessage } from '../types';

const LocalInsights: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ChatMessage | null>(null);
  const [mode, setMode] = useState<'search' | 'maps'>('search');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    let result: ChatMessage;
    if (mode === 'search') {
      result = await searchKnowledgeBase(query);
    } else {
      result = await findLocalAmenities(query);
    }

    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-brand-900 to-slate-900 rounded-2xl overflow-hidden shadow-xl text-white">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-yellow-400" size={24} />
          <h2 className="text-2xl font-bold">Local Insights Assistant</h2>
        </div>
        <p className="text-brand-100 mb-6">
          Ask about housing resources in Valdosta or find nearby amenities. Powered by Google Gemini.
        </p>

        {/* Mode Toggles */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('search')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'search' 
                ? 'bg-white text-brand-900' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Search size={16} />
            Ask Question
          </button>
          <button
            onClick={() => setMode('maps')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'maps' 
                ? 'bg-white text-brand-900' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <MapPin size={16} />
            Find Places
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === 'search' ? "E.g., What are tenant rights in GA?" : "E.g., Affordable grocery stores nearby"}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-brand-200/50 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white/20 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-2 p-2 bg-brand-500 rounded-lg hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowIcon />}
          </button>
        </form>

        {/* Response Area */}
        {response && (
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 animate-fade-in">
            <div className="prose prose-invert max-w-none mb-4">
              <p className="leading-relaxed whitespace-pre-wrap">{response.text}</p>
            </div>

            {/* Sources / Grounding */}
            {response.sources && response.sources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-semibold text-brand-300 uppercase tracking-wider mb-3">
                  {mode === 'search' ? 'Sources' : 'Locations Found'}
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {response.sources.map((source, idx) => {
                    const data = source.web || source.maps;
                    if (!data) return null;
                    return (
                      <a
                        key={idx}
                        href={data.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                      >
                        <div className="mt-1 text-brand-400">
                          {source.maps ? <MapPin size={14} /> : <ExternalLink size={14} />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">
                            {data.title}
                          </div>
                          <div className="text-xs text-brand-200/60 truncate max-w-[200px]">
                            {data.uri}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default LocalInsights;
