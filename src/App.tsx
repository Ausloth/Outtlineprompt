import React, { useState } from 'react';
import { Home } from './components/Home';
import { CustomizationForm } from './components/CustomizationForm';
import { PromptResult } from './components/PromptResult';
import { ActivityTemplate, BLANK_ACTIVITY } from './data';
import { Sparkles, Plus } from 'lucide-react';

export type ScreenState = 
  | { type: 'home' }
  | { type: 'form'; activity: ActivityTemplate }
  | { type: 'result'; prompt: string };

export default function App() {
  const [screen, setScreen] = useState<ScreenState>({ type: 'home' });

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf8] text-[#2d3436] font-sans">
      <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-[#eeeae5] shrink-0 sticky top-0 z-10 w-full">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setScreen({ type: 'home' })}>
          <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-emerald-900 hidden sm:block">Activity Prompt Generator</h1>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 uppercase tracking-widest hidden md:inline-block">NDIS Victoria</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          {screen.type !== 'home' ? (
            <button 
              onClick={() => setScreen({ type: 'home' })}
              className="text-slate-500 hover:text-slate-800 transition-colors text-xs font-semibold"
            >
              Back to Catalog
            </button>
          ) : (
            <button
              onClick={() => setScreen({ type: 'form', activity: BLANK_ACTIVITY })}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-colors font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              Make My Own
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {screen.type === 'home' && (
          <Home onSelect={(activity) => setScreen({ type: 'form', activity })} />
        )}
        {screen.type === 'form' && (
          <CustomizationForm 
            activity={screen.activity} 
            onCancel={() => setScreen({ type: 'home' })}
            onGenerate={(prompt) => setScreen({ type: 'result', prompt })}
          />
        )}
        {screen.type === 'result' && (
          <PromptResult 
            prompt={screen.prompt} 
            onRestart={() => setScreen({ type: 'home' })}
          />
        )}
      </main>
    </div>
  );
}
