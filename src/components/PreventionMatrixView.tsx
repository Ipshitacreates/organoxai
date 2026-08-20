import React, { useState } from 'react';
import { ConditionId, PatientData, AuthUser } from '../types';
import { CONDITIONS_DATA } from '../data/clinicalData';
import { 
  Check, 
  Download
} from 'lucide-react';

interface PreventionMatrixViewProps {
  patient: PatientData;
  conditionId: ConditionId;
  onSelectCondition: (cond: ConditionId) => void;
  onExportReport: () => void;
  currentUser?: AuthUser | null;
}

export const PreventionMatrixView: React.FC<PreventionMatrixViewProps> = ({
  patient,
  conditionId,
  onSelectCondition,
  onExportReport,
}) => {
  const conditionDetail = CONDITIONS_DATA[conditionId] || CONDITIONS_DATA.cad;

  // Local checklist state for prevention matrix
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({
    'cad-l1': true,
    'cad-s1': true,
    't2d-l1': true,
  });

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'LIFESTYLE' | 'SCREENING' | 'MEDICAL'>('ALL');

  const toggleItem = (id: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allPillarItems = conditionDetail.preventionPillars.flatMap(p => p.items);
  const completedCount = allPillarItems.filter(item => completedItems[item.id]).length;
  const progressPercent = Math.round((completedCount / (allPillarItems.length || 1)) * 100);

  const filteredPillars = activeFilter === 'ALL'
    ? conditionDetail.preventionPillars
    : conditionDetail.preventionPillars.filter(p => p.pillar === activeFilter);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-12 animate-in fade-in duration-200 font-['Roboto',sans-serif]">
      {/* Header Banner */}
      <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]">
              Evidence-Based Interventions
            </span>
            <span className="text-xs text-[#6F6D68]">
              Patient: <strong className="text-[#41403C]">{patient.name}</strong> ({patient.id})
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#41403C] tracking-tight">
            3-Pillar Prevention &amp; Management Matrix
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6D68] mt-1">
            Target Condition: <strong className="text-[#AA210F]">{conditionDetail.condition.name}</strong> • Clinical Guidelines: ACC/AHA, ESC, ADA Standards of Care
          </p>
        </div>

        {/* Condition Switcher */}
        <div className="flex items-center gap-1.5 bg-[#EDEFEE] p-1 rounded-xl border border-[#D4D8D5]">
          {(['cad', 't2d', 'alzheimers'] as ConditionId[]).map((cId) => (
            <button
              key={cId}
              onClick={() => onSelectCondition(cId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                conditionId === cId
                  ? 'bg-[#41403C] text-white shadow-2xs'
                  : 'text-[#6F6D68] hover:text-[#41403C] hover:bg-white'
              }`}
            >
              {CONDITIONS_DATA[cId].condition.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Summary Bar */}
      <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] border-2 border-[#D08856] flex items-center justify-center font-extrabold text-[#A65B27] text-sm shrink-0">
            {progressPercent}%
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#41403C]">
              Prevention Protocol Adherence: {completedCount} of {allPillarItems.length} Goals Active
            </h3>
            <p className="text-xs text-[#6F6D68]">
              Mark actions complete as interventions are initiated and monitored.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-[#EDEFEE] p-1 rounded-xl border border-[#D4D8D5] w-full sm:w-auto justify-center">
          {(['ALL', 'LIFESTYLE', 'SCREENING', 'MEDICAL'] as const).map((filterKey) => (
            <button
              key={filterKey}
              onClick={() => setActiveFilter(filterKey)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === filterKey
                  ? 'bg-[#41403C] text-white shadow-2xs'
                  : 'text-[#6F6D68] hover:text-[#41403C]'
              }`}
            >
              {filterKey === 'ALL' ? 'All Pillars' : filterKey === 'LIFESTYLE' ? 'Lifestyle' : filterKey === 'SCREENING' ? 'Screening' : 'Medical'}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Pillars Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPillars.map((pillar) => {
          const isLifestyle = pillar.pillar === 'LIFESTYLE';
          const isScreening = pillar.pillar === 'SCREENING';

          const headerBg = isLifestyle ? 'bg-[#EDEFEE]' : isScreening ? 'bg-[#FAF2EB]' : 'bg-[#FDF1EF]';
          const iconColor = isLifestyle ? 'text-[#41403C]' : isScreening ? 'text-[#D08856]' : 'text-[#AA210F]';
          const badgeText = isLifestyle ? 'Class I Level A' : isScreening ? 'Annual Frequency' : 'Therapeutic Target';

          return (
            <div
              key={pillar.pillar}
              className="bg-white border border-[#D4D8D5] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Pillar Header */}
                <div className={`p-4 ${headerBg} border-b border-[#D4D8D5] flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`material-symbols-outlined text-[22px] ${iconColor}`}>
                      {pillar.icon}
                    </span>
                    <h3 className="text-sm font-bold text-[#41403C]">
                      {pillar.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#D4D8D5] text-[#6F6D68]">
                    {badgeText}
                  </span>
                </div>

                {/* Checklist Items */}
                <div className="p-4 flex flex-col gap-3">
                  {pillar.items.map((item) => {
                    const isDone = completedItems[item.id] || false;
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                          isDone
                            ? 'bg-[#FAF2EB]/60 border-[#EACAB2] text-[#41403C]'
                            : 'bg-[#EDEFEE] border-[#D4D8D5] text-[#6F6D68] hover:bg-[#FAF2EB]/30'
                        }`}
                      >
                        <button
                          type="button"
                          aria-label="Toggle action completion"
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isDone
                              ? 'bg-[#D08856] border-[#D08856] text-white'
                              : 'bg-white border-[#D4D8D5] hover:border-[#D08856]'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <span className={`text-xs leading-relaxed ${isDone ? 'font-semibold text-[#41403C]' : 'text-[#6F6D68]'}`}>
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pillar Footer / Guideline Note */}
              <div className="p-3.5 bg-[#EDEFEE] border-t border-[#D4D8D5] text-[11px] text-[#6F6D68] flex items-center justify-between">
                <span>
                  {isLifestyle
                    ? 'Mediterranean Diet & Zone 2 Exercise'
                    : isScreening
                    ? 'CAC CT & Subfraction Assays'
                    : 'Target LDL < 55-70 mg/dL'}
                </span>
                <span className="font-semibold text-[#D08856]">Active Protocol</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-[#41403C]">Export Personalized Prevention Checklist</h4>
          <p className="text-xs text-[#6F6D68]">
            Generate a patient-ready action sheet formatted with active checkboxes and clinical notes.
          </p>
        </div>
        <button
          onClick={onExportReport}
          className="px-4 py-2.5 bg-[#41403C] text-white text-xs font-bold rounded-xl hover:bg-[#2F2E2B] transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#D08856]" />
          <span>Download Action Plan</span>
        </button>
      </div>
    </div>
  );
};
