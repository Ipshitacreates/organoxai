import React, { useState } from 'react';
import { PatientData } from '../types';
import { CONDITIONS_DATA } from '../data/clinicalData';
import { computeRiskForCondition } from '../utils/riskCalculator';
import { BarChart3, TrendingUp, Users, Activity, Dna, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

interface AnalyticsViewProps {
  patient: PatientData;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ patient }) => {
  const [activeMetric, setActiveMetric] = useState<'cad' | 't2d' | 'alzheimers'>('cad');

  const cadRisk = computeRiskForCondition(patient, 'cad');
  const t2dRisk = computeRiskForCondition(patient, 't2d');
  const alzRisk = computeRiskForCondition(patient, 'alzheimers');

  // Distribution chart mock data for cohort bell curve
  const cohortDistribution = [
    { percentile: '0-10%', count: 120, isCurrentPatient: false },
    { percentile: '10-25%', count: 280, isCurrentPatient: false },
    { percentile: '25-50%', count: 620, isCurrentPatient: false },
    { percentile: '50-75%', count: 580, isCurrentPatient: false },
    { percentile: '75-90%', count: 310, isCurrentPatient: cadRisk.scorePercent >= 75 && cadRisk.scorePercent < 90 },
    { percentile: '90-99%', count: 140, isCurrentPatient: cadRisk.scorePercent >= 90 },
  ];

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col gap-6 pb-16 font-['Inter']">
      {/* Title */}
      <div>
        <h1 className="font-['Public_Sans'] text-[24px] md:text-[32px] font-bold text-black tracking-tight">
          Population Cohort &amp; Genomic Analytics
        </h1>
        <p className="text-[15px] text-[#45464d] mt-1">
          Comparative polygenic risk distribution across reference cohorts (N=240,000 biobank individuals).
        </p>
      </div>

      {/* Top Stat Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* CAD Card */}
        <div
          onClick={() => setActiveMetric('cad')}
          className={`p-5 rounded-xl border cursor-pointer transition-all ${
            activeMetric === 'cad'
              ? 'bg-white border-[#006a61] shadow-md ring-1 ring-[#006a61]'
              : 'bg-white border-[#c6c6cd] hover:border-black shadow-xs'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[12px] font-bold text-[#45464d] uppercase">Coronary Artery Disease</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${cadRisk.badgeBg} ${cadRisk.badgeText}`}>
              {cadRisk.riskLevel}
            </span>
          </div>
          <div className="text-[28px] font-bold text-black font-['Public_Sans']">
            {cadRisk.scorePercent}th <span className="text-[14px] font-normal text-[#45464d]">Percentile</span>
          </div>
          <p className="text-[12px] text-[#45464d] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">trending_up</span>
            <span>+2.4x lifetime relative hazard vs mean</span>
          </p>
        </div>

        {/* T2D Card */}
        <div
          onClick={() => setActiveMetric('t2d')}
          className={`p-5 rounded-xl border cursor-pointer transition-all ${
            activeMetric === 't2d'
              ? 'bg-white border-[#006a61] shadow-md ring-1 ring-[#006a61]'
              : 'bg-white border-[#c6c6cd] hover:border-black shadow-xs'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[12px] font-bold text-[#45464d] uppercase">Type 2 Diabetes</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${t2dRisk.badgeBg} ${t2dRisk.badgeText}`}>
              {t2dRisk.riskLevel}
            </span>
          </div>
          <div className="text-[28px] font-bold text-black font-['Public_Sans']">
            {t2dRisk.scorePercent}th <span className="text-[14px] font-normal text-[#45464d]">Percentile</span>
          </div>
          <p className="text-[12px] text-[#45464d] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#006a61]">trending_down</span>
            <span>-35% potential reduction with lifestyle</span>
          </p>
        </div>

        {/* Alzheimers Card */}
        <div
          onClick={() => setActiveMetric('alzheimers')}
          className={`p-5 rounded-xl border cursor-pointer transition-all ${
            activeMetric === 'alzheimers'
              ? 'bg-white border-[#006a61] shadow-md ring-1 ring-[#006a61]'
              : 'bg-white border-[#c6c6cd] hover:border-black shadow-xs'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[12px] font-bold text-[#45464d] uppercase">Alzheimer's / ApoE</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${alzRisk.badgeBg} ${alzRisk.badgeText}`}>
              {alzRisk.riskLevel}
            </span>
          </div>
          <div className="text-[28px] font-bold text-black font-['Public_Sans']">
            {alzRisk.scorePercent}th <span className="text-[14px] font-normal text-[#45464d]">Percentile</span>
          </div>
          <p className="text-[12px] text-[#45464d] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#0b1c30]">info</span>
            <span>Microvascular modulation indicated</span>
          </p>
        </div>
      </div>

      {/* Polygenic Risk Distribution Bell Curve Graphic */}
      <div className="bg-white border border-[#c6c6cd] rounded-xl p-6 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[#c6c6cd] pb-4">
          <div>
            <h2 className="font-['Public_Sans'] text-[18px] font-bold text-black">
              Population Polygenic Risk Distribution: {activeMetric.toUpperCase()}
            </h2>
            <p className="text-[12px] text-[#45464d]">
              Patient placement within the global age &amp; ancestry-matched genomic database.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ba1a1a]"></span>
            <span className="text-[12px] text-[#45464d]">Patient #882-XJ Position ({cadRisk.scorePercent}th %)</span>
          </div>
        </div>

        {/* CSS Bell Curve Chart Bars */}
        <div className="pt-6 pb-2">
          <div className="flex items-end justify-between gap-3 h-48 px-4 border-b border-[#c6c6cd]">
            {cohortDistribution.map((col, idx) => {
              const maxVal = 620;
              const heightPct = (col.count / maxVal) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                  {col.isCurrentPatient && (
                    <div className="absolute -top-8 bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap animate-bounce">
                      Current Patient
                    </div>
                  )}
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      col.isCurrentPatient
                        ? 'bg-[#ba1a1a] ring-2 ring-[#ba1a1a]/30'
                        : 'bg-[#d3e4fe] group-hover:bg-[#b7c8e1]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  ></div>
                  <span className="text-[11px] text-[#45464d] font-medium rotate-0 text-center">
                    {col.percentile}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] text-[#45464d] px-4 pt-2">
            <span>Low Risk Range</span>
            <span>Population Median (50th %)</span>
            <span>High Vulnerability Range</span>
          </div>
        </div>

        <div className="bg-[#f2f4f6] p-4 rounded-lg border border-[#c6c6cd] text-[13px] text-[#45464d]">
          <strong className="text-black">Scientific Methodology:</strong> Polygenic risk scores are calculated using a validated 6.6-million SNP Bayesian regression model (LDPred2) normalized across multi-ancestry cohorts.
        </div>
      </div>
    </div>
  );
};
