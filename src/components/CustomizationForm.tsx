import React, { useState } from 'react';
import { ActivityTemplate } from '../data';
import { CustomizationData, generatePrompt } from '../lib/promptGenerator';
import { Icon } from './Icon';
import { ArrowRight } from 'lucide-react';

export function CustomizationForm({ activity, onCancel, onGenerate }: { activity: ActivityTemplate, onCancel: () => void, onGenerate: (prompt: string) => void }) {
  const [data, setData] = useState<CustomizationData>({
    activityName: activity.name,
    activityBlurb: activity.blurb || '',
    category: activity.category,
    durationWeeks: 24,
    sessionType: 'All Day',
    suburbCity: '',
    availableTransport: 'Organisation bus',
    maxParticipants: 12,
    minParticipants: 4,
    costPerPerson: 10,
    capacityLevel: 'Medium (Step access okay)',
    accessibilityLevel: 'Medium (Step access okay)',
    groupSizeSupportRatio: 'Maximum 12 / Minimum 4 - 1:4 support',
    locationPreference: 'Mix of Onsite & Offsite',
    targetParticipantProfile: 'Adults with mild to moderate intellectual disabilities who enjoy active participation.',
    ndisGoals: 'Social connection, Skill building',
    additionalNotes: ''
  });

  const handleChange = (field: keyof CustomizationData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = generatePrompt(data);
    onGenerate(prompt);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl border border-[#e5e0db] shadow-sm flex flex-col overflow-hidden">
        <div className="p-5 border-b border-[#eeeae5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white border border-[#e5e0db] rounded-xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
               <Icon name={activity.iconName} className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Configure Program Outline</h2>
              <p className="text-[11px] text-slate-500 font-medium">{activity.name} — NDIS Victoria</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-4 py-2 border border-[#e5e0db] rounded-lg text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors"
            >
              Generate LLM Prompt
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Top inline form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-6 border-b border-dashed border-slate-200">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Program Name</label>
              <input type="text" value={data.activityName} onChange={e => handleChange('activityName', e.target.value)} required 
                className="w-full text-xs font-medium border-b border-slate-200 py-1.5 focus:border-emerald-500 outline-none bg-transparent text-slate-900" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location Suburb</label>
              <input type="text" value={data.suburbCity} onChange={e => handleChange('suburbCity', e.target.value)} placeholder="e.g. Frankston" required 
                className="w-full text-xs font-medium border-b border-slate-200 py-1.5 focus:border-emerald-500 outline-none bg-transparent text-slate-900" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Duration</label>
              <div className="flex items-center gap-2">
                <input type="number" min="1" value={data.durationWeeks} onChange={e => handleChange('durationWeeks', parseInt(e.target.value))} required 
                  className="w-16 text-xs font-medium border-b border-slate-200 py-1.5 focus:border-emerald-500 outline-none bg-transparent text-slate-900" />
                <span className="text-[10px] text-slate-400 font-medium">Weeks</span>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-3 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Activity Blurb / Concept</label>
              <textarea 
                rows={2} 
                value={data.activityBlurb} 
                onChange={e => handleChange('activityBlurb', e.target.value)} 
                required
                placeholder="A warm, inclusive overview of the activity concept to drive the LLM's outline generation..." 
                className="w-full text-xs bg-slate-50 p-3 rounded border border-slate-100 resize-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900 hover:border-emerald-200 transition-colors" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800">Logistics</h4>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-medium">Session Timing</label>
                <select value={data.sessionType} onChange={e => handleChange('sessionType', e.target.value)} 
                  className="w-full text-xs bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900">
                  <option>All Day</option>
                  <option>Morning (9:30am - 12:30pm)</option>
                  <option>Afternoon (1:00pm - 4:00pm)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-medium">Transport Method</label>
                <input type="text" value={data.availableTransport} onChange={e => handleChange('availableTransport', e.target.value)} 
                  className="w-full text-xs bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-medium">Location Type</label>
                <select value={data.locationPreference} onChange={e => handleChange('locationPreference', e.target.value)} 
                  className="w-full text-xs bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900">
                  <option>Mix of Onsite & Offsite</option>
                  <option>Onsite only</option>
                  <option>Offsite only</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800">Capacity & Access</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-medium">Min Parts.</label>
                  <input type="number" min="1" value={data.minParticipants} onChange={e => handleChange('minParticipants', parseInt(e.target.value))} required 
                    className="w-full text-xs bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-medium">Max Parts.</label>
                  <input type="number" min="1" value={data.maxParticipants} onChange={e => handleChange('maxParticipants', parseInt(e.target.value))} required 
                    className="w-full text-xs bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-medium">Accessibility & Capacity Level</label>
                <div className="grid grid-cols-2 gap-2">
                  <select value={data.accessibilityLevel} onChange={e => handleChange('accessibilityLevel', e.target.value)} 
                    title="Accessibility Level"
                    className="w-full text-[11px] bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900">
                    <option>Low</option>
                    <option>Medium (Step access okay)</option>
                    <option>High (All abilities)</option>
                  </select>
                  <select value={data.capacityLevel} onChange={e => handleChange('capacityLevel', e.target.value)} 
                    title="Capacity Level"
                    className="w-full text-[11px] bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-medium">Support Ratio Details</label>
                <input type="text" value={data.groupSizeSupportRatio} onChange={e => handleChange('groupSizeSupportRatio', e.target.value)} placeholder="e.g. 1:4 Support Ratio" 
                  className="w-full text-xs bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900" />
              </div>
            </div>
            
            <div className="space-y-4 md:col-span-2 border-t border-dashed border-slate-200 pt-6">
               <h4 className="text-xs font-bold text-slate-800">Additional Details</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-medium">Supported NDIS Goals (comma separated)</label>
                  <input type="text" value={data.ndisGoals} onChange={e => handleChange('ndisGoals', e.target.value)} placeholder="Social connection, Independence, Skill building..." 
                    className="w-full text-xs bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-medium">Cost per Week ($)</label>
                    <input type="number" min="0" step="0.01" value={data.costPerPerson} onChange={e => handleChange('costPerPerson', parseFloat(e.target.value))} required 
                      className="w-full text-xs bg-slate-50 p-2.5 rounded border border-slate-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900" />
                 </div>
               </div>
               
               <div className="space-y-1 mt-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Participant Profile</label>
                  <textarea rows={2} value={data.targetParticipantProfile} onChange={e => handleChange('targetParticipantProfile', e.target.value)} placeholder="Describe the participants this program is designed for..." 
                    className="w-full text-xs bg-slate-50 p-3 rounded border border-slate-100 resize-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900" />
               </div>

               <div className="space-y-1 mt-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Additional Notes / Special Requirements</label>
                  <textarea rows={2} value={data.additionalNotes} onChange={e => handleChange('additionalNotes', e.target.value)} placeholder="Any special instructions for the AI..." 
                    className="w-full text-xs bg-slate-50 p-3 rounded border border-slate-100 resize-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900" />
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
