import React, { useState } from 'react';
import { ConditionId, PatientData, AuthUser } from '../types';
import { CONDITIONS_DATA } from '../data/clinicalData';
import { computeRiskForCondition } from '../utils/riskCalculator';
import { 
  Dna, 
  GitBranch, 
  ArrowRight
} from 'lucide-react';

interface GeneticRiskViewProps {
  patient: PatientData;
  conditionId: ConditionId;
  onSelectCondition: (cond: ConditionId) => void;
  onReferral: () => void;
  currentUser?: AuthUser | null;
}

export const GeneticRiskView: React.FC<GeneticRiskViewProps> = ({
  patient,
  conditionId,
  onSelectCondition,
  onReferral,
}) => {
  const conditionDetail = CONDITIONS_DATA[conditionId] || CONDITIONS_DATA.cad;
  computeRiskForCondition(patient, conditionId);
  const [selectedVariantInfo, setSelectedVariantInfo] = useState<string | null>(null);

  // Variant registry with genomic loci details
  const variantDatabase = [
    {
      gene: '9p21.3 (CDKN2A/CDKN2B)',
      rsId: 'rs1333049',
      riskAllele: 'C/C (Homozygous Risk)',
      impact: 'High (+68% CAD Relative Risk)',
      mechanism: 'Disrupts vascular smooth muscle cell proliferation and senescence regulation.',
      frequency: '21% in European Reference Cohort',
      conditions: ['cad'],
    },
    {
      gene: 'LPA (Lipoprotein(a))',
      rsId: 'rs10455872',
      riskAllele: 'G/A (Heterozygous)',
      impact: 'High (+50% Pro-atherogenic & Anti-fibrinolytic Risk)',
      mechanism: 'Promotes elevated plasma Lp(a) concentrations independent of LDL receptors.',
      frequency: '14% in General Population',
      conditions: ['cad'],
    },
    {
      gene: 'LDLR (LDL Receptor)',
      rsId: 'rs688',
      riskAllele: 'T/T',
      impact: 'Moderate (+25% Impaired Hepatic LDL Clearance)',
      mechanism: 'Decreases LDL particle clearance rate from plasma into hepatocytes.',
      frequency: '32% Population Prevalence',
      conditions: ['cad'],
    },
    {
      gene: 'TCF7L2 (Transcription Factor 7-Like 2)',
      rsId: 'rs7903146',
      riskAllele: 'C/T (Heterozygous Risk)',
      impact: 'Very High (+40% T2D Susceptibility)',
      mechanism: 'Impairs pancreatic beta-cell insulin secretion and incretin GLP-1 hormone synthesis.',
      frequency: '28% Population Frequency',
      conditions: ['t2d'],
    },
    {
      gene: 'PPARG (Peroxisome Proliferator Receptor)',
      rsId: 'rs1801282',
      riskAllele: 'Pro12Ala',
      impact: 'Moderate (Adipogenesis & Insulin Sensitivity)',
      mechanism: 'Modulates adipocyte lipid storage and systemic peripheral insulin sensitivity.',
      frequency: '18% Population Frequency',
      conditions: ['t2d'],
    },
    {
      gene: 'APOE (Apolipoprotein E Genotype)',
      rsId: 'rs429358 / rs7412',
      riskAllele: 'ε3/ε4 Heterozygous Carrier',
      impact: 'Elevated (3-4x Late-Onset Alzheimer Risk)',
      mechanism: 'Reduces cerebral beta-amyloid plaque clearance and accelerates lipid oxidation in neurons.',
      frequency: '15-20% Population Prevalence',
      conditions: ['alzheimers'],
    },
  ];

  const currentConditionVariants = variantDatabase.filter(v => v.conditions.includes(conditionId));

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-12 animate-in fade-in duration-200 font-['Roboto',sans-serif]">
      {/* Header Banner */}
      <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]">
              Genomic Architecture
            </span>
            <span className="text-xs text-[#6F6D68]">
              Patient: <strong className="text-[#41403C]">{patient.name}</strong> ({patient.id})
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#41403C] tracking-tight">
            Polygenic Risk Score (PRS) &amp; Hereditary Variants
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6D68] mt-1">
            Target Condition: <strong className="text-[#AA210F]">{conditionDetail.condition.name}</strong> • Genome Build: GRCh38 / hg38
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

      {/* Polygenic Risk Gaussian Distribution Card */}
      <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6 pb-4 border-b border-[#D4D8D5]">
          <div>
            <h2 className="text-lg font-bold text-[#41403C] flex items-center gap-2">
              <Dna className="w-5 h-5 text-[#AA210F]" />
              <span>Population PRS Percentile Distribution</span>
            </h2>
            <p className="text-xs text-[#6F6D68] mt-0.5">
              Calculated across 1,200,000+ single nucleotide polymorphisms (SNPs) weighted by validated GWAS effect sizes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#6F6D68]">Patient Rank:</span>
            <span className="px-3 py-1 rounded-full bg-[#FDF1EF] text-[#AA210F] border border-[#F5C2BA] font-bold text-sm">
              {conditionDetail.condition.prsPercentile}th Percentile (High Genomic Risk)
            </span>
          </div>
        </div>

        {/* Visual Percentile Bell Curve Representation */}
        <div className="bg-[#EDEFEE] border border-[#D4D8D5] rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex justify-between items-center text-xs text-[#6F6D68] mb-2 font-mono">
            <span>0th (Lowest Risk)</span>
            <span>25th</span>
            <span>50th (Average)</span>
            <span>75th</span>
            <span>100th (Top Risk)</span>
          </div>

          {/* Graphical Percentile Track */}
          <div className="relative h-12 bg-gradient-to-r from-[#D4D8D5] via-[#EACAB2] to-[#F5C2BA] rounded-xl overflow-hidden shadow-inner flex items-center border border-[#D4D8D5]">
            {/* Standard Distribution Guides */}
            <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-[#41403C]/20" />
            <div className="absolute left-[75%] top-0 bottom-0 w-0.5 bg-[#41403C]/20" />
            <div className="absolute left-[90%] top-0 bottom-0 w-0.5 bg-[#41403C]/20" />

            {/* Patient Marker Pin */}
            <div
              className="absolute top-0 bottom-0 w-4 -ml-2 bg-[#41403C] rounded-sm shadow-xl flex items-center justify-center transition-all"
              style={{ left: `${conditionDetail.condition.prsPercentile}%` }}
            >
              <div className="w-1.5 h-full bg-[#D08856]" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#41403C] rounded-xs" />
              <span className="font-bold text-[#41403C]">
                {patient.name}: {conditionDetail.condition.prsPercentile}th Percentile
              </span>
            </div>
            <span className="text-[#AA210F] font-semibold">
              Top {100 - conditionDetail.condition.prsPercentile}% of susceptible individuals
            </span>
          </div>
        </div>

        {/* Key Genetic Insights Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#EDEFEE] border border-[#D4D8D5]">
            <span className="text-[11px] font-bold text-[#6F6D68] uppercase block">Lifetime Genomic Baseline</span>
            <div className="text-xl font-bold text-[#41403C] mt-1">2.4x Multiplier</div>
            <p className="text-xs text-[#6F6D68] mt-1">Compared to age &amp; gender matched average population baseline.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#EDEFEE] border border-[#D4D8D5]">
            <span className="text-[11px] font-bold text-[#6F6D68] uppercase block">Non-Modifiable DNA Factor</span>
            <div className="text-xl font-bold text-[#D08856] mt-1">Fixed Inherited Core</div>
            <p className="text-xs text-[#6F6D68] mt-1">Cannot be altered; requires compensatory biomarker optimization.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#EDEFEE] border border-[#D4D8D5]">
            <span className="text-[11px] font-bold text-[#6F6D68] uppercase block">Family History Factor</span>
            <div className="text-xl font-bold text-[#AA210F] mt-1">
              {patient.familyHistory.cad ? 'Positive (CAD)' : patient.familyHistory.t2d ? 'Positive (T2D)' : 'Negative'}
            </div>
            <p className="text-xs text-[#6F6D68] mt-1">{patient.familyHistory.earlyOnsetNotes || 'Confirmed maternal lineage prevalence'}</p>
          </div>
        </div>
      </div>

      {/* Hereditary Factors Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hereditary Risk Factors */}
        <div className="lg:col-span-6 bg-white border border-[#D4D8D5] rounded-2xl p-5 shadow-xs flex flex-col">
          <div className="flex items-center gap-2.5 mb-4 border-b border-[#D4D8D5] pb-3">
            <div className="p-2 rounded-xl bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#41403C]">
                Inherited Risk Drivers
              </h3>
              <p className="text-[12px] text-[#6F6D68]">
                Validated monogenic and oligogenic contributors
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {conditionDetail.hereditaryFactors.map((factor, index) => (
              <div
                key={index}
                className="bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl p-3.5 flex flex-col gap-2 hover:border-[#D08856] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[14px] text-[#41403C]">{factor.title}</h4>
                    {factor.subtitle && (
                      <span className="text-[12px] font-mono text-[#D08856] font-semibold">
                        {factor.subtitle}
                      </span>
                    )}
                  </div>
                  {factor.riskIncrease && (
                    <span className="px-2 py-0.5 rounded-full bg-[#FDF1EF] text-[#AA210F] border border-[#F5C2BA] text-[11px] font-bold">
                      {factor.riskIncrease}
                    </span>
                  )}
                </div>

                {factor.meterPercent !== undefined && (
                  <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#AA210F] h-full rounded-full"
                      style={{ width: `${factor.meterPercent}%` }}
                    />
                  </div>
                )}

                {factor.details && (
                  <p className="text-[12px] text-[#6F6D68] leading-relaxed">
                    {factor.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Specific Gene Variant Loci Explorer */}
        <div className="lg:col-span-6 bg-white border border-[#D4D8D5] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 border-b border-[#D4D8D5] pb-3">
              <div className="p-2 rounded-xl bg-[#41403C] text-white">
                <GitBranch className="w-5 h-5 text-[#D08856]" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#41403C]">
                  Sequenced Genetic Variant Loci
                </h3>
                <p className="text-[12px] text-[#6F6D68]">
                  Single nucleotide polymorphisms identified via Next-Gen Sequencing
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {currentConditionVariants.map((v, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedVariantInfo(v.rsId)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedVariantInfo === v.rsId
                      ? 'bg-[#FAF2EB] border-[#D08856] ring-1 ring-[#D08856] shadow-2xs'
                      : 'bg-[#EDEFEE] border-[#D4D8D5] hover:border-[#D08856]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-[#41403C] font-mono">{v.gene}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-[#D4D8D5] rounded-full text-[#6F6D68]">
                      {v.rsId}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="text-[#41403C] font-semibold">Allele: {v.riskAllele}</span>
                    <span className="text-[#AA210F] font-bold">{v.impact}</span>
                  </div>
                  <p className="text-[11px] text-[#6F6D68] mt-1.5 leading-relaxed">
                    {v.mechanism}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#D4D8D5] flex items-center justify-between">
            <span className="text-xs text-[#6F6D68]">
              Want dedicated genetic counseling for familial inheritance?
            </span>
            <button
              onClick={onReferral}
              className="px-3.5 py-2 bg-[#41403C] hover:bg-[#2F2E2B] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>Refer to Geneticist</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D08856]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
