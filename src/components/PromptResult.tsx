import React, { useState } from 'react';
import { Copy, CheckCircle2, RotateCcw } from 'lucide-react';

export function PromptResult({ prompt, onRestart }: { prompt: string, onRestart: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-emerald-900 mb-1 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Prompt Generated successfully
          </h2>
          <p className="text-sm text-slate-500">
            Copy the text below and paste it into ChatGPT, Claude, or your preferred LLM.
          </p>
        </div>
        <button 
          onClick={onRestart}
          className="px-4 py-2 border border-[#e5e0db] bg-white text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Create Another
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e5e0db] flex flex-col overflow-hidden">
        <div className="bg-slate-50/50 px-5 py-3 flex items-center justify-between border-b border-[#eeeae5]">
          <span className="font-semibold text-slate-700 text-xs uppercase tracking-wider">LLM Instructions</span>
          <button 
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${copied ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Prompt
              </>
            )}
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[65vh] bg-[#fcfaf8] custom-scrollbar selection:bg-emerald-200">
          <pre className="text-[13px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
            {prompt}
          </pre>
        </div>
      </div>
    </div>
  );
}
