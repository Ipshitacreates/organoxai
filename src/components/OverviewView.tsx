import React from 'react';
import { ConditionId, PatientData, AuthUser, ActiveTab } from '../types';
import { CONDITIONS_DATA } from '../data/clinicalData';
import { computeRiskForCondition } from '../utils/riskCalculator';
import { 
  Dna, 
  Activity, 
  ShieldAlert, 
  ArrowRight, 
  Layers,
  FlaskConical
} from 'lucide-react';

interface OverviewViewProps {
  patient: PatientData;
  conditionId: ConditionId;
  onSelectCondition: (cond: ConditionId) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onOrderTests: (testName: string) => void;
  onReferral: () => void;
  onExportReport: () => void;
  currentUser?: AuthUser | null;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  patient,
  conditionId,
  onSelectCondition,
  onNavigateTab,
  currentUser,
}) => {
  const conditionDetail = CONDITIONS_DATA[conditionId] || CONDITIONS_DATA.cad;
  const calculated = computeRiskForCondition(patient, conditionId);

  // Cross-condition comparison list
  const allConditions: ConditionId[] = ['cad', 't2d', 'alzheimers'];
  const conditionSummaries = allConditions.map(cId => ({
    id: cId,
    info: CONDITIONS_DATA[cId],
    calc: computeRiskForCondition(patient, cId),
  }));

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-12 animate-in fade-in duration-200 font-['Roboto',sans-serif]">
      {/* Top Clinical Notification Banner */}
      <div className="bg-white border border-[#D4D8D5] rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
        <div className="w-8 h-8 rounded-lg bg-[#FAF2EB] text-[#D08856] flex items-center justify-center shrink-0 mt-0.5 border border-[#EACAB2]">
          <span className="material-symbols-outlined text-[18px]">info</span>
        </div>
        <div className="flex-1 text-[13px] text-[#41403C] leading-relaxed">
          <strong className="font-bold text-[#41403C]">Genomic &amp; Pharmacogenomic Precision Summary:</strong> Synthesized from 1,240,000+ polygenic loci, real-time metabolic biomarkers, and drug metabolism assays.
          {currentUser?.role === 'patient' && ' Review your personal health score below and explore the dedicated tabs on the left for deeper genetic insights and positive vs. negative medication reactions.'}
        </div>
      </div>

      {/* Header with Condition Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4D8D5] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]">
              Overview Dashboard
            </span>
            <span className="text-[12px] text-[#6F6D68]">
              Patient: <strong className="text-[#41403C]">{patient.name}</strong> ({patient.id})
            </span>
          </div>
          <h1 className="text-[24px] md:text-[28px] font-bold text-[#41403C] tracking-tight leading-tight">
            Comprehensive Genomic Risk Profile
          </h1>
        </div>

        {/* Condition Selector */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#D4D8D5]">
          {allConditions.map((cId) => {
            const isSelected = cId === conditionId;
            const cInfo = CONDITIONS_DATA[cId];
            return (
              <button
                key={cId}
                onClick={() => onSelectCondition(cId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#41403C] text-white shadow-2xs'
                    : 'text-[#6F6D68] hover:text-[#41403C] hover:bg-[#EDEFEE]'
                }`}
              >
                <span>{cInfo.condition.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Multi-Condition At-A-Glance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {conditionSummaries.map(({ id, info, calc }) => {
          const isSelected = id === conditionId;
          const isHigh = calc.riskLevel === 'HIGH';
          const isElevated = calc.riskLevel === 'ELEVATED';

          return (
            <button
              key={id}
              onClick={() => onSelectCondition(id)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#AA210F] ring-2 ring-[#AA210F]/20 shadow-xs'
                  : 'bg-white border-[#D4D8D5] hover:border-[#D08856] hover:bg-[#FAF2EB]/30'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-[#41403C]">
                  {info.condition.shortName}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isHigh
                      ? 'bg-[#FDF1EF] text-[#AA210F] border border-[#F5C2BA]'
                      : isElevated
                      ? 'bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]'
                      : 'bg-[#EDEFEE] text-[#41403C] border border-[#D4D8D5]'
                  }`}
                >
                  {calc.riskLevel}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black text-[#41403C]">
                  {calc.scorePercent}%
                </span>
                <span className="text-[11px] text-[#6F6D68]">Lifetime Susceptibility</span>
              </div>
              <div className="w-full bg-[#EDEFEE] h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full ${
                    isHigh ? 'bg-[#AA210F]' : isElevated ? 'bg-[#D08856]' : 'bg-[#41403C]'
                  }`}
                  style={{ width: `${calc.scorePercent}%` }}
                />
              </div>
              <p className="text-[11px] text-[#6F6D68] line-clamp-2">
                {info.condition.primaryDriversText}
              </p>
            </button>
          );
        })}
      </div>

      {/* Executive Risk Card for Active Condition */}
      <section className="bg-white border border-[#D4D8D5] border-t-4 border-t-[#AA210F] rounded-2xl p-5 md:p-6 shadow-xs transition-all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#AA210F]">verified</span>
            <h2 className="text-[18px] md:text-[20px] font-bold text-[#41403C]">
              Executive Assessment: {conditionDetail.condition.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                calculated.riskLevel === 'HIGH'
                  ? 'bg-[#FDF1EF] text-[#AA210F] border border-[#F5C2BA]'
                  : calculated.riskLevel === 'ELEVATED'
                  ? 'bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]'
                  : 'bg-[#EDEFEE] text-[#41403C] border border-[#D4D8D5]'
              }`}
            >
              {calculated.riskLevel} CLINICAL SUSCEPTIBILITY ({calculated.scorePercent}%)
            </span>
          </div>
        </div>

        {/* Synergistic Impact Callout */}
        <div className="bg-[#FAF2EB] border border-[#EACAB2] rounded-xl p-4 mb-6 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-white text-[#D08856] shrink-0 mt-0.5 border border-[#EACAB2]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[14px] text-[#8A4A1C] mb-1">
              Synergistic Risk Factor Acceleration
            </h3>
            <p className="text-[13px] text-[#41403C] leading-relaxed">
              {calculated.synergisticNote}
            </p>
          </div>
        </div>

        {/* 3 Metric Summary Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#D4D8D5] pt-5">
          {/* PRS Box */}
          <div className="bg-[#EDEFEE] p-4 rounded-xl border border-[#D4D8D5] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F6D68]">
                  Polygenic Susceptibility
                </span>
                <Dna className="w-4 h-4 text-[#D08856]" />
              </div>
              <div className="text-3xl font-black text-[#41403C] mt-1">
                {conditionDetail.condition.prsPercentile}th
              </div>
              <p className="text-[12px] text-[#6F6D68] mt-1">
                Top {100 - conditionDetail.condition.prsPercentile}% highest genomic tier.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('genetic')}
              className="mt-3 text-xs font-bold text-[#D08856] hover:text-[#A65B27] flex items-center gap-1 group cursor-pointer"
            >
              <span>Explore Genetic Risk (PRS)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Biomarkers Box */}
          <div className="bg-[#EDEFEE] p-4 rounded-xl border border-[#D4D8D5] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F6D68]">
                  Modifiable Biomarkers
                </span>
                <Activity className="w-4 h-4 text-[#AA210F]" />
              </div>
              <div className="text-3xl font-black text-[#41403C] mt-1">
                {patient.ldl} <span className="text-xs font-normal text-[#6F6D68]">mg/dL LDL</span>
              </div>
              <p className="text-[12px] text-[#6F6D68] mt-1">
                BP {patient.systolicBp}/{patient.diastolicBp} mmHg • ApoB/A1: {patient.apobApoa1Ratio}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('modifiable')}
              className="mt-3 text-xs font-bold text-[#AA210F] hover:text-[#8F1A0B] flex items-center gap-1 group cursor-pointer"
            >
              <span>Analyze Modifiable Factors</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pharmacogenomics Box */}
          <div className="bg-[#EDEFEE] p-4 rounded-xl border border-[#D4D8D5] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F6D68]">
                  Drug Testing Results
                </span>
                <FlaskConical className="w-4 h-4 text-[#D08856]" />
              </div>
              <div className="text-3xl font-black text-[#41403C] mt-1">
                6 <span className="text-xs font-normal text-[#6F6D68]">Tested Assays</span>
              </div>
              <p className="text-[12px] text-[#6F6D68] mt-1">
                4 Positively Reacting • 2 Genomic Alerts (SLCO1B1 &amp; CYP2C19)
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('drug-testing')}
              className="mt-3 text-xs font-bold text-[#41403C] hover:text-[#D08856] flex items-center gap-1 group cursor-pointer"
            >
              <span>View Drug Reaction Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards to Dedicated Sub-Pages */}
      <div>
        <h3 className="text-[18px] font-bold text-[#41403C] mb-3">
          Dedicated Clinical Deep-Dive Pages
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateTab('genetic')}
            className="p-4 rounded-2xl bg-white border border-[#D4D8D5] hover:border-[#AA210F] hover:shadow-sm transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2] flex items-center justify-center mb-3 group-hover:bg-[#AA210F] group-hover:text-white transition-colors">
              <Dna className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#41403C] mb-1">Genetic Risk (PRS)</h4>
            <p className="text-xs text-[#6F6D68] leading-relaxed">
              In-depth PRS percentile curves, hereditary variants (9p21, ApoE, TCF7L2), and locus breakdown.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('modifiable')}
            className="p-4 rounded-2xl bg-white border border-[#D4D8D5] hover:border-[#D08856] hover:shadow-sm transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2] flex items-center justify-center mb-3 group-hover:bg-[#D08856] group-hover:text-white transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#41403C] mb-1">Modifiable Factors</h4>
            <p className="text-xs text-[#686561] leading-relaxed">
              Full biomarker metrics and interactive "What-If" simulator for blood pressure and lipid targets.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('prevention')}
            className="p-4 rounded-2xl bg-white border border-[#D4D8D5] hover:border-[#41403C] hover:shadow-sm transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EDEFEE] text-[#41403C] border border-[#D4D8D5] flex items-center justify-center mb-3 group-hover:bg-[#41403C] group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#41403C] mb-1">Prevention Matrix</h4>
            <p className="text-xs text-[#686561] leading-relaxed">
              3-Pillar prevention checklist (Lifestyle, Screening, Medical) with guideline-backed goals.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('drug-testing')}
            className="p-4 rounded-2xl bg-white border border-[#D4D8D5] hover:border-[#D08856] hover:shadow-sm transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2] flex items-center justify-center mb-3 group-hover:bg-[#D08856] group-hover:text-white transition-colors">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#41403C] mb-1">Drug Testing Results</h4>
            <p className="text-xs text-[#686561] leading-relaxed">
              Check positive vs. negative adverse reaction rates, genetic clearance profiles, and CPIC dosing.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
