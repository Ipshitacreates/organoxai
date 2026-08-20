import React, { useState, useEffect } from 'react';
import { ConditionId, PatientData, SubSection } from '../types';
import { CONDITIONS_DATA } from '../data/clinicalData';
import { computeRiskForCondition } from '../utils/riskCalculator';
import { Check, CheckCircle2, AlertTriangle, ArrowRight, Activity, Dna, ShieldAlert, Sparkles, Plus, Stethoscope } from 'lucide-react';

interface GenomicAssessmentViewProps {
  patient: PatientData;
  conditionId: ConditionId;
  onSelectCondition: (cond: ConditionId) => void;
  onOrderTests: (testName: string) => void;
  onReferral: () => void;
  onExportReport: () => void;
  activeSubSection?: SubSection;
}

export const GenomicAssessmentView: React.FC<GenomicAssessmentViewProps> = ({
  patient,
  conditionId,
  onSelectCondition,
  onOrderTests,
  onReferral,
  onExportReport,
  activeSubSection = 'overview',
}) => {
  const conditionDetail = CONDITIONS_DATA[conditionId] || CONDITIONS_DATA.cad;
  const calculated = computeRiskForCondition(patient, conditionId);

  // Local checklist state for prevention matrix
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({
    'cad-l1': true,
    't2d-l1': true,
  });

  const toggleItem = (id: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Scroll to targeted subsection when clicked from left sidebar
  useEffect(() => {
    if (!activeSubSection) return;

    if (activeSubSection === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sectionIdMap: Record<SubSection, string> = {
      overview: 'overview-section',
      genetic: 'genetic-section',
      modifiable: 'modifiable-section',
      prevention: 'prevention-section',
      'drug-testing': 'drug-testing-section',
    };

    const targetId = sectionIdMap[activeSubSection];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Visual focus pulse ring
        el.classList.add('ring-3', 'ring-[#006a61]', 'ring-offset-2');
        const timer = setTimeout(() => {
          el.classList.remove('ring-3', 'ring-[#006a61]', 'ring-offset-2');
        }, 1800);
        return () => clearTimeout(timer);
      }
    }
  }, [activeSubSection]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-12">
      {/* Top Disclaimer Banner */}
      <div className="bg-[#d3e4fe] border border-[#b7c8e1] rounded-lg p-3.5 flex items-start gap-3 shadow-xs">
        <span className="material-symbols-outlined text-[#0b1c30] text-[20px] mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <p className="font-['Inter'] text-[13px] text-[#38485d] leading-relaxed">
          <strong className="font-semibold text-[#0b1c30]">Clinical Decision Support Framework Only.</strong> This report provides a probabilistic risk assessment based on genomic markers and clinical data. It is not a definitive diagnosis and must be reviewed with a board-certified physician or genetic counselor.
        </p>
      </div>

      {/* Condition Switcher Tabs (For fast desktop/mobile condition switching) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#c6c6cd]">
        <button
          onClick={() => onSelectCondition('cad')}
          className={`px-4 py-2 text-[14px] font-medium rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
            conditionId === 'cad'
              ? 'border-[#006a61] text-[#006a61] bg-white font-semibold shadow-xs'
              : 'border-transparent text-[#45464d] hover:text-black hover:bg-[#f2f4f6]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
          Coronary Artery Disease (CAD)
        </button>
        <button
          onClick={() => onSelectCondition('t2d')}
          className={`px-4 py-2 text-[14px] font-medium rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
            conditionId === 't2d'
              ? 'border-[#006a61] text-[#006a61] bg-white font-semibold shadow-xs'
              : 'border-transparent text-[#45464d] hover:text-black hover:bg-[#f2f4f6]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">restaurant</span>
          Type 2 Diabetes (T2D)
        </button>
        <button
          onClick={() => onSelectCondition('alzheimers')}
          className={`px-4 py-2 text-[14px] font-medium rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
            conditionId === 'alzheimers'
              ? 'border-[#006a61] text-[#006a61] bg-white font-semibold shadow-xs'
              : 'border-transparent text-[#45464d] hover:text-black hover:bg-[#f2f4f6]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">psychology</span>
          Alzheimer's / ApoE4
        </button>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-['Public_Sans'] text-[24px] md:text-[32px] font-bold text-black tracking-tight leading-tight">
            {conditionDetail.condition.name}
          </h1>
          <p className="font-['Inter'] text-[15px] text-[#45464d] mt-1">
            Patient ID: {patient.id} • Generated: {patient.dateGenerated} • Assessment {patient.assessmentVersion}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onExportReport}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white border border-[#c6c6cd] rounded-lg text-[13px] font-medium text-black hover:bg-[#f2f4f6] transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print Report
          </button>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${calculated.badgeBg} ${calculated.badgeBorder} ${calculated.badgeText}`}>
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {calculated.riskLevel === 'HIGH' ? 'warning' : calculated.riskLevel === 'ELEVATED' ? 'emergency' : 'info'}
            </span>
            <span className="font-['Inter'] text-[13px] font-bold tracking-wider uppercase">
              Calculated Risk: {calculated.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Executive Assessment Card */}
      <section
        id="overview-section"
        className={`scroll-mt-24 bg-white border ${calculated.accentBorder} border-t-4 border-[#c6c6cd] rounded-xl p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-['Public_Sans'] text-[20px] md:text-[24px] font-bold text-black">
              {conditionDetail.condition.name} Assessment
            </h2>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[12px] font-bold ${calculated.badgeBg} ${calculated.badgeText}`}>
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              warning
            </span>
            {calculated.riskLevel} Risk Profile
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-['Inter'] text-[12px] font-semibold text-[#45464d] uppercase tracking-wider mb-1">
              Primary Drivers
            </p>
            <p className="font-['Inter'] text-[15px] text-black font-medium leading-normal">
              {calculated.primaryDrivers}
            </p>
            <p className="font-['Inter'] text-[13px] text-[#45464d] mt-1">
              Polygenic score in the <strong>{conditionDetail.condition.prsPercentile}th percentile</strong> for population background.
            </p>
          </div>
          <div className="bg-[#f2f4f6] p-3.5 rounded-lg border border-[#c6c6cd] border-l-4 border-l-[#006a61]">
            <p className="font-['Inter'] text-[13px] text-[#45464d] leading-relaxed flex items-start gap-2">
              <span className="material-symbols-outlined text-[#006a61] text-[20px] shrink-0 mt-0.5">merge</span>
              <span>
                <strong className="text-black font-semibold">Synergistic Impact Note:</strong> {calculated.synergisticNote}
              </span>
            </p>
          </div>
        </div>

        {/* Risk Progress Bar */}
        <div className="mt-6 pt-4 border-t border-[#c6c6cd]/60">
          <div className="flex justify-between font-['Inter'] text-[12px] font-medium text-[#45464d] mb-1.5">
            <span>Low Risk (0–35%)</span>
            <span>Moderate Risk (35–65%)</span>
            <span>High Risk (65–100%)</span>
          </div>
          <div className="w-full h-3 bg-[#e0e3e5] rounded-full overflow-hidden flex relative">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                calculated.riskLevel === 'HIGH'
                  ? 'bg-[#ba1a1a]'
                  : calculated.riskLevel === 'ELEVATED'
                  ? 'bg-[#d97706]'
                  : 'bg-[#006a61]'
              }`}
              style={{ width: `${calculated.scorePercent}%` }}
            />
            {/* Markers */}
            <div className="absolute left-[35%] top-0 bottom-0 w-[1px] bg-white opacity-60"></div>
            <div className="absolute left-[65%] top-0 bottom-0 w-[1px] bg-white opacity-60"></div>
          </div>
          <div className="flex justify-between items-center mt-2 text-[12px] text-[#45464d]">
            <span>Calculated patient percentile composite: <strong>{calculated.scorePercent}%</strong></span>
            <span className="font-semibold text-black">Actionable Threshold Exceeded</span>
          </div>
        </div>
      </section>

      {/* Two Column Grid: Hereditary Factors & Current Health Markers */}
      <div id="genetic-section" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hereditary Factors */}
        <div className="lg:col-span-6 bg-white border border-[#c6c6cd] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex items-center gap-2.5 mb-4 border-b border-[#c6c6cd] pb-3">
            <div className="p-1.5 rounded-lg bg-[#131b2e] text-white">
              <span className="material-symbols-outlined text-[18px]">genetics</span>
            </div>
            <h3 className="font-['Public_Sans'] text-[18px] font-bold text-black">Hereditary Factors (Polygenic)</h3>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            {conditionDetail.hereditaryFactors.map((factor, idx) => (
              <div key={idx} className="p-3.5 bg-[#f2f4f6] rounded-lg border border-[#c6c6cd] flex flex-col gap-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-['Inter'] text-[14px] font-bold text-black">{factor.title}</h4>
                    {factor.subtitle && (
                      <p className="text-[12px] text-[#45464d]">{factor.subtitle}</p>
                    )}
                  </div>
                  {factor.riskIncrease && (
                    <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] rounded text-[11px] font-bold">
                      {factor.riskIncrease}
                    </span>
                  )}
                </div>
                {factor.meterPercent && (
                  <div className="w-full bg-[#e0e3e5] h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-[#ba1a1a] h-full rounded-full" style={{ width: `${factor.meterPercent}%` }}></div>
                  </div>
                )}
                {factor.details && (
                  <p className="text-[12px] text-[#45464d] mt-0.5">{factor.details}</p>
                )}
              </div>
            ))}

            <div className="p-3 bg-[#e2f8f5] rounded-lg border border-[#86f2e4] text-[12px] text-[#006f66]">
              <strong>Clinical Insight:</strong> First-degree early onset history indicates an autosomal non-classical inheritance pattern requiring intensive biomarker monitoring.
            </div>
          </div>
        </div>

        {/* Right Column: Current Health Markers */}
        <div id="modifiable-section" className="scroll-mt-24 lg:col-span-6 bg-white border border-[#c6c6cd] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex items-center gap-2.5 mb-4 border-b border-[#c6c6cd] pb-3">
            <div className="p-1.5 rounded-lg bg-[#86f2e4] text-[#006f66]">
              <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
            </div>
            <h3 className="font-['Public_Sans'] text-[18px] font-bold text-black">Current Health Biomarkers</h3>
          </div>

          <div className="flex-1 flex flex-col gap-2.5">
            {calculated.healthMarkers.map((marker, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center p-3 rounded-lg border transition-colors ${
                  marker.status === 'critical'
                    ? 'bg-[#ffdad6]/40 border-[#ffdad6]'
                    : marker.status === 'elevated'
                    ? 'bg-[#fef3c7]/40 border-[#fcd34d]'
                    : 'bg-[#f2f4f6] border-[#c6c6cd]'
                }`}
              >
                <span className="font-['Inter'] text-[13px] font-semibold text-[#45464d]">
                  {marker.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`font-['Inter'] text-[14px] font-bold ${
                    marker.status === 'critical'
                      ? 'text-[#ba1a1a]'
                      : marker.status === 'elevated'
                      ? 'text-[#92400e]'
                      : 'text-black'
                  }`}>
                    {marker.value}
                  </span>
                  {marker.statusText && (
                    <span className={`text-[12px] font-normal ${
                      marker.status === 'critical' ? 'text-[#ba1a1a]' : 'text-[#45464d]'
                    }`}>
                      {marker.statusText}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prevention Matrix (3-Pillar Bento Grid) */}
      <section id="prevention-section" className="scroll-mt-24 mt-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 border-b border-[#c6c6cd] pb-3">
          <div>
            <h3 className="font-['Public_Sans'] text-[20px] font-bold text-black">
              Integrated Prevention Matrix
            </h3>
            <p className="text-[13px] text-[#45464d]">
              Targeted multi-domain interventions tailored to both genomic score and modifiable phenotype.
            </p>
          </div>
          <span className="text-[12px] text-[#006a61] bg-[#e2f8f5] px-3 py-1 rounded-full font-semibold self-start">
            Interactive Protocol Checklist
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conditionDetail.preventionPillars.map((pillar, idx) => {
            const topColor =
              pillar.pillar === 'LIFESTYLE'
                ? 'bg-[#006a61]'
                : pillar.pillar === 'SCREENING'
                ? 'bg-[#0b1c30]'
                : 'bg-[#ba1a1a]';

            return (
              <div
                key={idx}
                className="bg-white border border-[#c6c6cd] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col"
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 ${topColor}`} />
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[20px] text-black">
                    {pillar.icon}
                  </span>
                  <h4 className="font-['Inter'] text-[13px] font-bold text-black uppercase tracking-wider">
                    {pillar.title}
                  </h4>
                </div>

                <ul className="space-y-3 font-['Inter'] text-[13px] text-black flex-1">
                  {pillar.items.map((item) => {
                    const isDone = !!completedItems[item.id];
                    return (
                      <li
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors border ${
                          isDone
                            ? 'bg-[#e2f8f5]/60 border-[#86f2e4] text-[#006f66]'
                            : 'bg-[#f7f9fb] border-[#c6c6cd]/50 hover:bg-[#f2f4f6]'
                        }`}
                      >
                        <button
                          type="button"
                          className={`mt-0.5 w-4 h-4 rounded-sm flex items-center justify-center shrink-0 border transition-colors ${
                            isDone ? 'bg-[#006a61] border-[#006a61] text-white' : 'border-[#76777d] bg-white'
                          }`}
                        >
                          {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                        </button>
                        <span className={`leading-relaxed ${isDone ? 'line-through opacity-80' : ''}`}>
                          {item.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gaps & Next Steps Banner */}
      <section
        id="next-steps-section"
        className="scroll-mt-24 mt-2 bg-[#131b2e] text-white rounded-xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(19,27,46,0.12)] border border-[#3f465c]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#86f2e4] shrink-0 border border-white/10">
            <span className="material-symbols-outlined text-[26px]">rule</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#86f2e4] bg-[#86f2e4]/20 px-2 py-0.5 rounded">
                Required Diagnostic
              </span>
              <h4 className="font-['Public_Sans'] text-[18px] font-bold text-white">
                Critical Gaps &amp; Immediate Next Steps
              </h4>
            </div>
            <p className="font-['Inter'] text-[14px] text-[#bec6e0] leading-relaxed max-w-2xl">
              Current assay lacks specific deep phenotype markers. <strong>Lipoprotein(a) [Lp(a)] and Fasting Insulin testing are strictly required</strong> to finalize cardiovascular and metabolic stratification.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => onOrderTests('Lipoprotein(a) [Lp(a)] & Lipid Subfraction Assay')}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#006a61] hover:bg-[#005049] text-white font-['Inter'] text-[13px] font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">science</span>
            Order Tests
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <button
            onClick={onReferral}
            className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-['Inter'] text-[13px] font-medium rounded-lg border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">contact_mail</span>
            Refer to Genetic Counselor
          </button>
        </div>
      </section>
    </div>
  );
};
