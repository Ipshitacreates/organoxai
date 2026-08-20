import React, { useState } from 'react';
import { PatientData, AuthUser } from '../types';
import { SAMPLE_DRUG_TEST_RESULTS } from '../data/clinicalData';
import { 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Filter, 
  Stethoscope,
  User,
  PlusCircle
} from 'lucide-react';

interface DrugTestingResultsViewProps {
  patient: PatientData;
  currentUser?: AuthUser | null;
  onOrderTest?: (testName: string) => void;
  onNavigateToDataInput?: () => void;
}

export const DrugTestingResultsView: React.FC<DrugTestingResultsViewProps> = ({
  patient,
  currentUser,
  onOrderTest,
}) => {
  const isDoctor = currentUser?.role === 'doctor';
  const [viewMode, setViewMode] = useState<'auto' | 'doctor' | 'patient'>('auto');
  const [statusFilter, setStatusFilter] = useState<'all' | 'positive' | 'negative' | 'caution'>('all');
  const [selectedDrugId, setSelectedDrugId] = useState<string>('dt-atorvastatin');
  const [testedSearchQuery, setTestedSearchQuery] = useState('');

  const effectiveMode = viewMode === 'auto' ? (isDoctor ? 'doctor' : 'patient') : viewMode;

  const patientDrugResults = SAMPLE_DRUG_TEST_RESULTS[patient.id] || SAMPLE_DRUG_TEST_RESULTS['#882-XJ'];

  const filteredDrugs = patientDrugResults.filter(drug => {
    const matchesFilter = statusFilter === 'all' || drug.overallReaction === statusFilter;
    const matchesSearch = drug.name.toLowerCase().includes(testedSearchQuery.toLowerCase()) ||
                          drug.brandName.toLowerCase().includes(testedSearchQuery.toLowerCase()) ||
                          drug.geneTested.toLowerCase().includes(testedSearchQuery.toLowerCase()) ||
                          drug.drugClass.toLowerCase().includes(testedSearchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedDrug = patientDrugResults.find(d => d.id === selectedDrugId) || filteredDrugs[0] || patientDrugResults[0];

  const positiveCount = patientDrugResults.filter(d => d.overallReaction === 'positive').length;
  const negativeCount = patientDrugResults.filter(d => d.overallReaction === 'negative').length;
  const cautionCount = patientDrugResults.filter(d => d.overallReaction === 'caution').length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-12 animate-in fade-in duration-200 font-['Roboto',sans-serif]">
      {/* Top Header Card */}
      <div className="bg-white border border-[#D4D8D5] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF2EB] border border-[#EACAB2] flex items-center justify-center text-[#D08856] shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[28px]">biotech</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-[#41403C]">
                Pharmacogenomic Drug Testing Results
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]">
                CPIC &amp; FDA Validated
              </span>
            </div>
            <p className="text-sm text-[#6F6D68] mt-1">
              Individualized drug efficacy, genetic clearance profiling, and positive vs. negative adverse reaction analytics for <strong className="text-[#41403C]">{patient.name}</strong> ({patient.id}).
            </p>
          </div>
        </div>

        {/* Doctor vs Patient View Switcher */}
        <div className="flex items-center gap-2 bg-[#EDEFEE] p-1 rounded-xl border border-[#D4D8D5] self-start md:self-center shrink-0">
          <button
            onClick={() => setViewMode('doctor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              effectiveMode === 'doctor'
                ? 'bg-[#41403C] text-white shadow-xs'
                : 'text-[#6F6D68] hover:text-[#41403C]'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#D08856]" />
            <span>Doctor View</span>
          </button>
          <button
            onClick={() => setViewMode('patient')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              effectiveMode === 'patient'
                ? 'bg-[#41403C] text-white shadow-xs'
                : 'text-[#6F6D68] hover:text-[#41403C]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#D08856]" />
            <span>Patient View</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tested */}
        <div className="bg-white border border-[#D4D8D5] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#6F6D68] mb-2 text-xs font-semibold uppercase tracking-wider">
            <span>Tested Medications</span>
            <FlaskConical className="w-4 h-4 text-[#41403C]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#41403C]">{patientDrugResults.length}</span>
            <span className="text-xs text-[#6F6D68]">Assays Run</span>
          </div>
          <div className="text-[11px] text-[#6F6D68] mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#41403C]"></span>
            <span>Covering 6 key metabolic enzymes</span>
          </div>
        </div>

        {/* Positively Reacting */}
        <div className="bg-white border border-[#D4D8D5] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#41403C] mb-2 text-xs font-semibold uppercase tracking-wider">
            <span>Positively Reacting</span>
            <CheckCircle2 className="w-4 h-4 text-[#D08856]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#41403C]">{positiveCount}</span>
            <span className="text-xs text-[#6F6D68] font-medium">Optimal Efficacy</span>
          </div>
          <div className="text-[11px] text-[#6F6D68] mt-1">
            High therapeutic benefit &amp; safe clearance
          </div>
        </div>

        {/* Negatively Reacting / Adverse Risk */}
        <div className="bg-[#FDF1EF] border border-[#F5C2BA] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#AA210F] mb-2 text-xs font-semibold uppercase tracking-wider">
            <span>Negatively Reacting</span>
            <AlertOctagon className="w-4 h-4 text-[#AA210F]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#AA210F]">{negativeCount}</span>
            <span className="text-xs text-[#AA210F]/90 font-semibold">Action Required</span>
          </div>
          <div className="text-[11px] text-[#AA210F] mt-1">
            Elevated toxicity or diminished activation
          </div>
        </div>

        {/* Caution / Monitored */}
        <div className="bg-[#FAF2EB] border border-[#EACAB2] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#A65B27] mb-2 text-xs font-semibold uppercase tracking-wider">
            <span>Dose Caution / Monitored</span>
            <AlertTriangle className="w-4 h-4 text-[#D08856]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#A65B27]">{cautionCount}</span>
            <span className="text-xs text-[#A65B27]/80 font-medium">Adjustment Recommended</span>
          </div>
          <div className="text-[11px] text-[#A65B27] mt-1">
            Requires dose titration or symptom tracking
          </div>
        </div>
      </div>

      {/* Main Content Layout: Drug List on Left, Deep Analytics & Guideline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Drug Navigation & Filter (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="bg-white border border-[#D4D8D5] rounded-2xl p-4 shadow-xs">
            {/* Filter buttons */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-[#41403C] uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#D08856]" />
                Reaction Filter
              </span>
              <span className="text-xs text-[#6F6D68] font-mono">
                {filteredDrugs.length} of {patientDrugResults.length}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mb-3 bg-[#EDEFEE] p-1 rounded-xl">
              <button
                onClick={() => setStatusFilter('all')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white text-[#41403C] shadow-2xs'
                    : 'text-[#6F6D68] hover:text-[#41403C]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('positive')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                  statusFilter === 'positive'
                    ? 'bg-[#41403C] text-white shadow-2xs'
                    : 'text-[#41403C] hover:bg-white/50'
                }`}
              >
                Positive
              </button>
              <button
                onClick={() => setStatusFilter('negative')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                  statusFilter === 'negative'
                    ? 'bg-[#AA210F] text-white shadow-2xs'
                    : 'text-[#AA210F] hover:bg-white/50'
                }`}
              >
                Negative
              </button>
              <button
                onClick={() => setStatusFilter('caution')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                  statusFilter === 'caution'
                    ? 'bg-[#D08856] text-white shadow-2xs'
                    : 'text-[#A65B27] hover:bg-white/50'
                }`}
              >
                Caution
              </button>
            </div>

            {/* Search input */}
            <div className="relative mb-3">
              <input
                type="text"
                value={testedSearchQuery}
                onChange={(e) => setTestedSearchQuery(e.target.value)}
                placeholder="Search drug, gene (e.g. SLCO1B1), class..."
                className="w-full pl-8 pr-3 py-2 bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl text-xs text-[#41403C] placeholder-[#6F6D68] outline-none focus:border-[#41403C] focus:ring-1 focus:ring-[#41403C]"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[16px] text-[#6F6D68]">
                search
              </span>
            </div>

            {/* List of tested medications */}
            <div className="flex flex-col gap-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredDrugs.map((drug) => {
                const isSelected = drug.id === selectedDrug.id;
                const isPositive = drug.overallReaction === 'positive';
                const isNegative = drug.overallReaction === 'negative';

                return (
                  <button
                    key={drug.id}
                    onClick={() => setSelectedDrugId(drug.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-[#FAF2EB] border-[#D08856] ring-1 ring-[#D08856] shadow-2xs'
                        : 'bg-white border-[#D4D8D5] hover:bg-[#EDEFEE]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[14px] text-[#41403C]">
                            {drug.name}
                          </span>
                          <span className="text-xs text-[#6F6D68] font-medium">
                            ({drug.brandName})
                          </span>
                        </div>
                        <span className="text-[11px] text-[#6F6D68] block line-clamp-1">
                          {drug.drugClass}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                          isPositive
                            ? 'bg-[#EDEFEE] text-[#41403C] border border-[#D4D8D5]'
                            : isNegative
                            ? 'bg-[#FDF1EF] text-[#AA210F] border border-[#F5C2BA]'
                            : 'bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]'
                        }`}
                      >
                        {isPositive ? 'Positively Reacting' : isNegative ? 'Negatively Reacting' : 'Caution / Monitor'}
                      </span>
                    </div>

                    {/* Gene & Analytics Mini-Bar */}
                    <div className="flex items-center justify-between text-xs text-[#6F6D68] pt-1 border-t border-[#D4D8D5]/60">
                      <span className="font-mono text-[11px] text-[#D08856] font-semibold">
                        {drug.geneTested.split(' ')[0]}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px]">
                          Efficacy: <strong className={isPositive ? 'text-[#41403C]' : 'text-[#6F6D68]'}>{drug.analytics.positiveEfficacyRate}%</strong>
                        </span>
                        <span className="text-[11px]">
                          Adverse: <strong className={isNegative ? 'text-[#AA210F]' : 'text-[#6F6D68]'}>{drug.analytics.negativeAdverseRate}%</strong>
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredDrugs.length === 0 && (
                <div className="p-8 text-center text-[#6F6D68] text-xs">
                  No medications match your filter criteria.
                </div>
              )}
            </div>
          </div>

          {/* Quick Action: Order New Pharmacogenomic Panel */}
          {isDoctor && (
            <div className="bg-white border border-[#D4D8D5] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-5 h-5 text-[#D08856]" />
                <div>
                  <h4 className="text-xs font-bold text-[#41403C]">Order Expanded PGx Panel</h4>
                  <p className="text-[11px] text-[#6F6D68]">Test CYP2D6, DPYD, TPMT, HLA-B*5701</p>
                </div>
              </div>
              {onOrderTest && (
                <button
                  onClick={() => onOrderTest('Expanded 16-Gene Pharmacogenomic Testing Panel')}
                  className="px-3 py-1.5 bg-[#41403C] hover:bg-[#2F2E2B] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
                >
                  Order Assay
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Analytics & Doctor/Patient Guidance (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {selectedDrug ? (
            <div className="bg-white border border-[#D4D8D5] rounded-2xl p-6 shadow-xs flex flex-col gap-6">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#D4D8D5]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-[#41403C]">
                      {selectedDrug.name} <span className="text-lg text-[#6F6D68] font-normal">({selectedDrug.brandName})</span>
                    </h2>
                  </div>
                  <p className="text-xs text-[#6F6D68] mt-0.5">{selectedDrug.drugClass} • Target: {selectedDrug.targetCondition}</p>
                </div>

                {/* Status Pill */}
                <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      selectedDrug.overallReaction === 'positive'
                        ? 'bg-[#EDEFEE] text-[#41403C] border border-[#D4D8D5]'
                        : selectedDrug.overallReaction === 'negative'
                        ? 'bg-[#FDF1EF] text-[#AA210F] border border-[#F5C2BA]'
                        : 'bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]'
                    }`}
                  >
                    {selectedDrug.overallReaction === 'positive'
                      ? '✓ Positively Reacting'
                      : selectedDrug.overallReaction === 'negative'
                      ? '⚠ Negatively Reacting'
                      : '⚡ Caution / Adjustment'}
                  </span>
                  <span className="text-[11px] text-[#6F6D68] font-mono">
                    Status: {selectedDrug.patientCurrentStatus.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Reaction Headline Box */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  selectedDrug.overallReaction === 'positive'
                    ? 'bg-[#EDEFEE] border-[#D4D8D5]'
                    : selectedDrug.overallReaction === 'negative'
                    ? 'bg-[#FDF1EF] border-[#F5C2BA]'
                    : 'bg-[#FAF2EB] border-[#EACAB2]'
                }`}
              >
                {selectedDrug.overallReaction === 'positive' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#41403C] shrink-0 mt-0.5" />
                ) : selectedDrug.overallReaction === 'negative' ? (
                  <AlertOctagon className="w-5 h-5 text-[#AA210F] shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-[#D08856] shrink-0 mt-0.5" />
                )}
                <div>
                  <h3
                    className={`font-bold text-sm ${
                      selectedDrug.overallReaction === 'positive'
                        ? 'text-[#41403C]'
                        : selectedDrug.overallReaction === 'negative'
                        ? 'text-[#AA210F]'
                        : 'text-[#A65B27]'
                    }`}
                  >
                    {selectedDrug.reactionHeadline}
                  </h3>
                  <p className="text-xs text-[#41403C] mt-1 leading-relaxed">
                    {effectiveMode === 'patient' ? selectedDrug.patientExplanation : selectedDrug.reactionSummary}
                  </p>
                </div>
              </div>

              {/* Reaction Analytics Breakdown (Positive vs Negative Response Rates) */}
              <div>
                <h4 className="text-xs font-bold text-[#41403C] uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Pharmacogenomic Reaction Analytics</span>
                  <span className="text-[11px] text-[#6F6D68] font-normal">
                    Evidence: {selectedDrug.analytics.clinicalEvidenceLevel}
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {/* Positive Efficacy Rate */}
                  <div className="bg-[#EDEFEE] border border-[#D4D8D5] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6F6D68] uppercase font-semibold block">Positive Efficacy Rate</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-[#41403C]">
                        {selectedDrug.analytics.positiveEfficacyRate}%
                      </span>
                    </div>
                    {/* Visual Meter */}
                    <div className="w-full bg-white h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[#41403C] h-full rounded-full"
                        style={{ width: `${selectedDrug.analytics.positiveEfficacyRate}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#6F6D68] mt-1 block">Therapeutic target success</span>
                  </div>

                  {/* Negative Adverse Rate */}
                  <div className="bg-[#EDEFEE] border border-[#D4D8D5] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6F6D68] uppercase font-semibold block">Negative Adverse Risk</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={`text-2xl font-black ${
                        selectedDrug.analytics.negativeAdverseRate > 15 ? 'text-[#AA210F]' : 'text-[#6F6D68]'
                      }`}>
                        {selectedDrug.analytics.negativeAdverseRate}%
                      </span>
                    </div>
                    {/* Visual Meter */}
                    <div className="w-full bg-white h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          selectedDrug.analytics.negativeAdverseRate > 15 ? 'bg-[#AA210F]' : 'bg-[#D08856]'
                        }`}
                        style={{ width: `${Math.min(100, selectedDrug.analytics.negativeAdverseRate * 3)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#6F6D68] mt-1 block">Toxicity &amp; side-effect index</span>
                  </div>

                  {/* Patient Compatibility Match */}
                  <div className="bg-[#EDEFEE] border border-[#D4D8D5] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6F6D68] uppercase font-semibold block">Patient DNA Compatibility</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-[#41403C]">
                        {selectedDrug.analytics.patientCompatibilityScore}
                      </span>
                      <span className="text-xs text-[#6F6D68]">/100</span>
                    </div>
                    {/* Visual Meter */}
                    <div className="w-full bg-white h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          selectedDrug.analytics.patientCompatibilityScore >= 80 ? 'bg-[#D08856]' : 'bg-[#AA210F]'
                        }`}
                        style={{ width: `${selectedDrug.analytics.patientCompatibilityScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#6F6D68] mt-1 block">Precision genetic match</span>
                  </div>
                </div>

                {/* Specific Adverse Reaction Surveillance */}
                <div className="bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl p-3.5">
                  <span className="text-xs font-bold text-[#41403C] block mb-2">
                    Reaction Risk Profile &amp; Side-Effect Monitoring
                  </span>
                  <div className="flex flex-col gap-2">
                    {selectedDrug.analytics.adverseEffects.map((effect, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-3 text-xs bg-white p-2.5 rounded-lg border border-[#D4D8D5]/80">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#41403C]">{effect.symptom}</strong>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                              effect.riskLevel === 'high'
                                ? 'bg-[#FDF1EF] text-[#AA210F]'
                                : effect.riskLevel === 'elevated'
                                ? 'bg-[#FAF2EB] text-[#A65B27]'
                                : 'bg-[#EDEFEE] text-[#41403C]'
                            }`}>
                              {effect.riskLevel} risk
                            </span>
                          </div>
                          {effect.description && (
                            <p className="text-[11px] text-[#6F6D68] mt-0.5">{effect.description}</p>
                          )}
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#41403C] shrink-0">
                          {effect.frequency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mode-Specific Section: Doctor Pharmacology vs Patient Action Guide */}
              {effectiveMode === 'doctor' ? (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#D4D8D5]">
                  <div className="bg-[#EDEFEE] p-4 rounded-xl border border-[#D4D8D5]">
                    <div className="flex items-center gap-2 mb-2 text-[#41403C] font-bold text-xs uppercase tracking-wider">
                      <Stethoscope className="w-4 h-4 text-[#D08856]" />
                      <span>Clinician Genomic Pharmacology (CPIC Guideline)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                      <div>
                        <span className="text-[#6F6D68] block">Tested Gene &amp; Locus:</span>
                        <strong className="text-[#41403C] font-mono">{selectedDrug.geneTested}</strong>
                      </div>
                      <div>
                        <span className="text-[#6F6D68] block">Patient Genotype:</span>
                        <strong className="text-[#41403C] font-mono">{selectedDrug.patientGenotype}</strong>
                      </div>
                      <div>
                        <span className="text-[#6F6D68] block">Metabolic Phenotype:</span>
                        <strong className="text-[#41403C]">{selectedDrug.phenotype}</strong>
                      </div>
                      <div>
                        <span className="text-[#6F6D68] block">Evidence Rating:</span>
                        <strong className="text-[#41403C]">{selectedDrug.analytics.clinicalEvidenceLevel}</strong>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-[#D4D8D5] text-xs text-[#41403C] leading-relaxed">
                      <strong className="text-[#AA210F] block mb-1">Clinical Recommendation:</strong>
                      {selectedDrug.clinicalGuideline}
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#D4D8D5] text-xs">
                    <strong className="text-[#41403C] block mb-1">Dr. Julian Vance's Clinical Assessment Notes:</strong>
                    <p className="text-[#6F6D68] leading-relaxed">{selectedDrug.doctorNotes}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#D4D8D5]">
                  <div className="bg-[#FAF2EB] p-4 rounded-xl border border-[#EACAB2]">
                    <div className="flex items-center gap-2 mb-2 text-[#A65B27] font-bold text-xs uppercase tracking-wider">
                      <User className="w-4 h-4 text-[#D08856]" />
                      <span>What Marcus Should Know (Patient Care Tips)</span>
                    </div>
                    <ul className="flex flex-col gap-2 text-xs text-[#41403C]">
                      {selectedDrug.patientActionTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#EACAB2]">
                          <span className="w-4 h-4 rounded-full bg-[#FAF2EB] text-[#A65B27] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-[#D4D8D5] rounded-2xl p-12 text-center text-[#6F6D68]">
              Select a drug from the left to view detailed pharmacogenomic reaction analytics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
