import React, { useState, useMemo } from 'react';
import { ACTIVITIES, CATEGORIES, ActivityTemplate } from '../data';
import { Icon } from './Icon';
import { Search, Shuffle } from 'lucide-react';

export function Home({ onSelect }: { onSelect: (act: ActivityTemplate) => void }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return ACTIVITIES.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                            a.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? a.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleRandom = () => {
    const random = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
    onSelect(random);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900 mb-1">Program Catalog</h2>
          <p className="text-sm text-slate-500 max-w-xl">
            Select an activity template below to customize and generate a professional LLM prompt for your NDIS day program.
          </p>
        </div>
        <button 
          onClick={handleRandom}
          className="px-4 py-2 bg-[#f4f1ee] border border-[#e5e0db] rounded-lg text-xs font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-white transition-colors whitespace-nowrap shadow-sm"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Surprise Me
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-2.5 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input 
            type="text" 
            placeholder="Search activities..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#e5e0db] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setCategory(null)}
          className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${!category ? 'bg-emerald-600 text-white' : 'bg-white border border-[#e5e0db] text-slate-600 hover:border-emerald-300'}`}
        >
          All
        </button>
        {CATEGORIES.map(c => (
          <button 
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${category === c ? 'bg-emerald-600 text-white' : 'bg-white border border-[#e5e0db] text-slate-600 hover:border-emerald-300'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(act => (
          <div 
            key={act.id} 
            onClick={() => onSelect(act)}
            className="p-4 bg-white rounded-xl border border-[#e5e0db] hover:border-emerald-300 transition-all cursor-pointer flex flex-col h-full shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                <Icon name={act.iconName} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {act.name}
                </h3>
                <span className="inline-block px-2 py-0.5 mt-1 bg-slate-100 text-slate-600 text-[9px] uppercase font-bold tracking-wider rounded">
                  {act.category}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 flex-1 leading-relaxed">
              {act.description}
            </p>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white border border-[#e5e0db] rounded-2xl border-dashed">
          <p className="text-slate-500 text-sm font-medium">No activities found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
