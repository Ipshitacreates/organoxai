import React, { useState } from 'react';
import { PatientData } from '../types';
import { computeRiskForCondition } from '../utils/riskCalculator';
import { Save, Check, X, ShieldCheck } from 'lucide-react';

interface ClinicalDataInputProps {
  patient: PatientData;
  onUpdatePatient: (updated: PatientData) => void;
  onNavigateToOverview: () => void;
}

export const ClinicalDataInput: React.FC<ClinicalDataInputProps> = ({
  patient,
  onUpdatePatient,
  onNavigateToOverview,
}) => {
  const [activeMode, setActiveMode] = useState<'patient' | 'clinician'>('patient');

  // Form State
  const [formData, setFormData] = useState<PatientData>({ ...patient });
  const [newDiagnosisInput, setNewDiagnosisInput] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  // Height & Weight helpers for BMI
  const [heightCm, setHeightCm] = useState(patient.heightCm || 178);
  const [weightKg, setWeightKg] = useState(patient.weightKg || 90);

  const handleBmiRecalc = (h: number, w: number) => {
    if (h > 50 && w > 20) {
      const calculatedBmi = Number((w / Math.pow(h / 100, 2)).toFixed(1));
      setFormData(prev => ({ ...prev, bmi: calculatedBmi, heightCm: h, weightKg: w }));
    }
  };

  const handleAddDiagnosis = () => {
    if (newDiagnosisInput.trim()) {
      if (!formData.clinicalDiagnoses.includes(newDiagnosisInput.trim())) {
        setFormData(prev => ({
          ...prev,
          clinicalDiagnoses: [...prev.clinicalDiagnoses, newDiagnosisInput.trim()],
        }));
      }
      setNewDiagnosisInput('');
    }
  };

  const handleRemoveDiagnosis = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      clinicalDiagnoses: prev.clinicalDiagnoses.filter(d => d !== tag),
    }));
  };

  const handleAddVariant = (variantName: string) => {
    if (variantName && variantName !== 'none' && !formData.geneticVariants.includes(variantName)) {
      setFormData(prev => ({
        ...prev,
        geneticVariants: [...prev.geneticVariants, variantName],
      }));
    }
  };

  const handleRemoveVariant = (variant: string) => {
    setFormData(prev => ({
      ...prev,
      geneticVariants: prev.geneticVariants.filter(v => v !== variant),
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdatePatient(formData);
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
      onNavigateToOverview();
    }, 1200);
  };

  const previewRisk = computeRiskForCondition(formData, 'cad');

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 pb-16 font-['Roboto',sans-serif]">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-[#41403C] tracking-tight">
          {activeMode === 'patient' ? 'Health Data Input' : 'Clinical Data Entry'}
        </h1>
        <p className="text-[15px] text-[#6F6D68] mt-1">
          {activeMode === 'patient'
            ? 'Update primary health metrics to recalculate risk models.'
            : 'Enter physician-verified biomarkers, diagnostic codings, and genomic panels.'}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="bg-[#EDEFEE] p-1 rounded-xl flex w-full max-w-md border border-[#D4D8D5] shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveMode('patient')}
          className={`flex-1 py-2 px-4 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
            activeMode === 'patient'
              ? 'bg-white text-[#41403C] font-semibold shadow-2xs border border-[#D4D8D5]'
              : 'text-[#6F6D68] hover:text-[#41403C]'
          }`}
        >
          Patient Data
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('clinician')}
          className={`flex-1 py-2 px-4 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
            activeMode === 'clinician'
              ? 'bg-white text-[#41403C] font-semibold shadow-2xs border border-[#D4D8D5]'
              : 'text-[#6F6D68] hover:text-[#41403C]'
          }`}
        >
          Clinician Overrides
        </button>
      </div>

      {/* Live Impact Preview Chip */}
      <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-[#D4D8D5] shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#D08856] text-[20px]">sync</span>
          <div>
            <span className="text-[13px] font-semibold text-[#41403C]">Real-time Risk Modeling</span>
            <p className="text-[11px] text-[#6F6D68]">Calculated composite adapts instantly to edits below.</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-[12px] font-bold border ${previewRisk.badgeBg} ${previewRisk.badgeBorder} ${previewRisk.badgeText}`}>
          CAD Risk: {previewRisk.riskLevel} ({previewRisk.scorePercent}%)
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {activeMode === 'patient' ? (
          /* ================= PATIENT DATA MODE ================= */
          <div className="flex flex-col gap-5">
            {/* Biometrics Card */}
            <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col gap-4">
              <h2 className="text-[18px] font-bold text-[#41403C] border-b border-[#D4D8D5] pb-2">
                Biometrics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1" htmlFor="height">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    type="number"
                    value={heightCm}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setHeightCm(val);
                      handleBmiRecalc(val, weightKg);
                    }}
                    className="w-full bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl px-3.5 py-2.5 text-[14px] text-[#41403C] focus:outline-none focus:border-[#41403C] focus:ring-1 focus:ring-[#41403C]"
                    placeholder="178"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1" htmlFor="weight">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    value={weightKg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setWeightKg(val);
                      handleBmiRecalc(heightCm, val);
                    }}
                    className="w-full bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl px-3.5 py-2.5 text-[14px] text-[#41403C] focus:outline-none focus:border-[#41403C] focus:ring-1 focus:ring-[#41403C]"
                    placeholder="90"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1" htmlFor="bmi">
                    Body Mass Index (BMI)
                  </label>
                  <div className="relative">
                    <input
                      id="bmi"
                      name="bmi"
                      type="number"
                      step="0.1"
                      value={formData.bmi}
                      onChange={(e) => setFormData({ ...formData, bmi: Number(e.target.value) })}
                      className="w-full bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl px-3.5 py-2.5 pr-14 text-[14px] font-semibold text-[#41403C] focus:outline-none focus:border-[#41403C] focus:ring-1 focus:ring-[#41403C]"
                      placeholder="24.5"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#6F6D68] font-medium">
                      kg/m²
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle Factors Card */}
            <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col gap-4">
              <h2 className="text-[18px] font-bold text-[#41403C] border-b border-[#D4D8D5] pb-2">
                Lifestyle Factors
              </h2>

              {/* Smoking Status */}
              <div>
                <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-2">
                  Smoking Status
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['never', 'former', 'current'] as const).map((status) => (
                    <label
                      key={status}
                      className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                        formData.smokingStatus === status
                          ? 'border-[#41403C] bg-[#EDEFEE] font-semibold text-[#41403C]'
                          : 'border-[#D4D8D5] bg-white hover:bg-[#EDEFEE] text-[#41403C]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="smoking"
                        value={status}
                        checked={formData.smokingStatus === status}
                        onChange={() => setFormData({ ...formData, smokingStatus: status })}
                        className="text-[#41403C] focus:ring-[#41403C] mr-3"
                      />
                      <span className="text-[14px] capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Physical Activity */}
              <div>
                <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1" htmlFor="activity">
                  Physical Activity Level
                </label>
                <select
                  id="activity"
                  name="activity"
                  value={formData.activityLevel}
                  onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
                  className="w-full bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl px-3.5 py-2.5 text-[14px] text-[#41403C] focus:outline-none focus:border-[#41403C] focus:ring-1 focus:ring-[#41403C]"
                >
                  <option value="sedentary">Sedentary (&lt; 150 mins/week)</option>
                  <option value="moderate">Moderate (150-300 mins/week)</option>
                  <option value="active">Highly Active (&gt; 300 mins/week)</option>
                </select>
              </div>
            </div>

            {/* Family History Card */}
            <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col gap-4">
              <h2 className="text-[18px] font-bold text-[#41403C] border-b border-[#D4D8D5] pb-2">
                Family History (First-Degree Relatives)
              </h2>

              <div className="space-y-2.5">
                <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                  formData.familyHistory.t2d ? 'border-[#41403C] bg-[#EDEFEE] font-semibold text-[#41403C]' : 'border-[#D4D8D5] bg-white hover:bg-[#EDEFEE]'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.familyHistory.t2d}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyHistory: { ...formData.familyHistory, t2d: e.target.checked }
                    })}
                    className="rounded text-[#41403C] focus:ring-[#41403C] mr-3 w-4 h-4"
                  />
                  <span className="text-[14px] text-[#41403C]">Type 2 Diabetes Mellitus</span>
                </label>

                <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                  formData.familyHistory.cad ? 'border-[#41403C] bg-[#EDEFEE] font-semibold text-[#41403C]' : 'border-[#D4D8D5] bg-white hover:bg-[#EDEFEE]'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.familyHistory.cad}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyHistory: { ...formData.familyHistory, cad: e.target.checked }
                    })}
                    className="rounded text-[#41403C] focus:ring-[#41403C] mr-3 w-4 h-4"
                  />
                  <span className="text-[14px] text-[#41403C]">Coronary Artery Disease (CAD) / Early-onset Infarction</span>
                </label>

                <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                  formData.familyHistory.cancer ? 'border-[#41403C] bg-[#EDEFEE] font-semibold text-[#41403C]' : 'border-[#D4D8D5] bg-white hover:bg-[#EDEFEE]'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.familyHistory.cancer}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyHistory: { ...formData.familyHistory, cancer: e.target.checked }
                    })}
                    className="rounded text-[#41403C] focus:ring-[#41403C] mr-3 w-4 h-4"
                  />
                  <span className="text-[14px] text-[#41403C]">Oncology / Cancer (Any type)</span>
                </label>

                <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                  formData.familyHistory.alzheimers ? 'border-[#41403C] bg-[#EDEFEE] font-semibold text-[#41403C]' : 'border-[#D4D8D5] bg-white hover:bg-[#EDEFEE]'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.familyHistory.alzheimers}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyHistory: { ...formData.familyHistory, alzheimers: e.target.checked }
                    })}
                    className="rounded text-[#41403C] focus:ring-[#41403C] mr-3 w-4 h-4"
                  />
                  <span className="text-[14px] text-[#41403C]">Late-onset Neurodegeneration / Dementia</span>
                </label>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1">
                  Early Onset Lineage Notes
                </label>
                <input
                  type="text"
                  value={formData.familyHistory.earlyOnsetNotes}
                  onChange={(e) => setFormData({
                    ...formData,
                    familyHistory: { ...formData.familyHistory, earlyOnsetNotes: e.target.value }
                  })}
                  placeholder="e.g. Maternal side < 50; Father MI at 45"
                  className="w-full bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl px-3.5 py-2.5 text-[14px] text-[#41403C] focus:outline-none focus:border-[#41403C] focus:ring-1 focus:ring-[#41403C]"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ================= CLINICIAN OVERRIDES MODE ================= */
          <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col gap-5">
            {/* Clinical Diagnoses with tag manager */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#6F6D68] uppercase" htmlFor="diagnoses">
                Clinical Diagnoses &amp; Phenotypic Codes
              </label>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#6F6D68] text-[20px]">
                    search
                  </span>
                  <input
                    id="diagnoses"
                    type="text"
                    value={newDiagnosisInput}
                    onChange={(e) => setNewDiagnosisInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDiagnosis();
                      }
                    }}
                    placeholder="Search conditions (e.g. T2D, Hypertension, Hypercholesterolemia)"
                    className="w-full pl-10 pr-4 py-2.5 border border-[#D4D8D5] rounded-xl bg-[#EDEFEE] text-[#41403C] text-[14px] focus:ring-2 focus:ring-[#41403C] focus:border-[#41403C] outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddDiagnosis}
                  className="px-4 py-2.5 bg-[#41403C] text-white rounded-xl text-[13px] font-semibold hover:bg-[#2F2E2B] transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.clinicalDiagnoses.map((diag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-[#EDEFEE] px-3 py-1 rounded-full text-[13px] border border-[#D4D8D5] text-[#41403C] font-medium"
                  >
                    {diag}
                    <button
                      type="button"
                      onClick={() => handleRemoveDiagnosis(diag)}
                      className="text-[#6F6D68] hover:text-[#AA210F] p-0.5 rounded-full cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-[#D4D8D5]" />

            {/* Laboratory Biomarkers Grid */}
            <div>
              <h3 className="text-[13px] font-bold text-[#41403C] uppercase tracking-wider mb-3">
                Laboratory Biomarkers (Quantitative)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] text-[#6F6D68] font-semibold mb-1" htmlFor="ldl">
                    LDL-C (mg/dL)
                  </label>
                  <input
                    id="ldl"
                    type="number"
                    value={formData.ldl}
                    onChange={(e) => setFormData({ ...formData, ldl: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-[#D4D8D5] rounded-xl focus:ring-2 focus:ring-[#41403C] focus:border-[#41403C] bg-[#EDEFEE] text-[#41403C] text-[14px] font-semibold"
                    placeholder="160"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#6F6D68] font-semibold mb-1" htmlFor="hba1c">
                    HbA1c (%)
                  </label>
                  <input
                    id="hba1c"
                    type="number"
                    step="0.1"
                    value={formData.hba1c}
                    onChange={(e) => setFormData({ ...formData, hba1c: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-[#D4D8D5] rounded-xl focus:ring-2 focus:ring-[#41403C] focus:border-[#41403C] bg-[#EDEFEE] text-[#41403C] text-[14px] font-semibold"
                    placeholder="5.7"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#6F6D68] font-semibold mb-1" htmlFor="systolicBp">
                    Systolic BP (mmHg)
                  </label>
                  <input
                    id="systolicBp"
                    type="number"
                    value={formData.systolicBp}
                    onChange={(e) => setFormData({ ...formData, systolicBp: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-[#D4D8D5] rounded-xl focus:ring-2 focus:ring-[#41403C] focus:border-[#41403C] bg-[#EDEFEE] text-[#41403C] text-[14px] font-semibold"
                    placeholder="142"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#6F6D68] font-semibold mb-1" htmlFor="diastolicBp">
                    Diastolic BP (mmHg)
                  </label>
                  <input
                    id="diastolicBp"
                    type="number"
                    value={formData.diastolicBp}
                    onChange={(e) => setFormData({ ...formData, diastolicBp: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-[#D4D8D5] rounded-xl focus:ring-2 focus:ring-[#41403C] focus:border-[#41403C] bg-[#EDEFEE] text-[#41403C] text-[14px]"
                    placeholder="90"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#6F6D68] font-semibold mb-1" htmlFor="apobRatio">
                    ApoB / ApoA1 Ratio
                  </label>
                  <input
                    id="apobRatio"
                    type="number"
                    step="0.01"
                    value={formData.apobApoa1Ratio}
                    onChange={(e) => setFormData({ ...formData, apobApoa1Ratio: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-[#D4D8D5] rounded-xl focus:ring-2 focus:ring-[#41403C] focus:border-[#41403C] bg-[#EDEFEE] text-[#41403C] text-[14px]"
                    placeholder="0.95"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#6F6D68] font-semibold mb-1" htmlFor="glucose">
                    Fasting Glucose (mg/dL)
                  </label>
                  <input
                    id="glucose"
                    type="number"
                    value={formData.fastingGlucose}
                    onChange={(e) => setFormData({ ...formData, fastingGlucose: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-[#D4D8D5] rounded-xl focus:ring-2 focus:ring-[#41403C] focus:border-[#41403C] bg-[#EDEFEE] text-[#41403C] text-[14px]"
                    placeholder="104"
                  />
                </div>
              </div>
            </div>

            <hr className="border-[#D4D8D5]" />

            {/* Medication Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#6F6D68] uppercase" htmlFor="medications">
                Medication Status &amp; Daily Dosages
              </label>
              <textarea
                id="medications"
                rows={3}
                value={formData.medications}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                placeholder="Enter current prescriptions and dosages (e.g. Atorvastatin 20mg, Metformin 500mg)..."
                className="w-full px-3.5 py-2.5 border border-[#D4D8D5] rounded-xl focus:ring-2 focus:ring-[#41403C] focus:border-[#41403C] bg-[#EDEFEE] text-[#41403C] text-[14px] resize-none"
              />
            </div>

            <hr className="border-[#D4D8D5]" />

            {/* Genetic Markers */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#6F6D68] uppercase" htmlFor="genetic">
                Genetic Markers (Known Pathogenic / Polygenic Variants)
              </label>
              <select
                id="genetic"
                value={selectedVariant}
                onChange={(e) => {
                  setSelectedVariant(e.target.value);
                  handleAddVariant(e.target.value);
                }}
                className="w-full px-3.5 py-2.5 border border-[#D4D8D5] rounded-xl focus:ring-2 focus:ring-[#41403C] focus:border-[#41403C] bg-[#EDEFEE] text-[#41403C] text-[14px]"
              >
                <option value="">Select known variant to append...</option>
                <option value="9p21 Locus Variant (rs10757278-G)">9p21 Locus Variant (CAD / Endothelial Risk)</option>
                <option value="LDLR Missense Mutation (rs121908028)">LDLR Missense Mutation (Hypercholesterolemia)</option>
                <option value="ApoE4 (rs429358 ε4 allele)">ApoE4 (Alzheimer's / Lipid Clearance Risk)</option>
                <option value="TCF7L2 (rs7903146 Risk Allele)">TCF7L2 (Type 2 Diabetes Beta-Cell Risk)</option>
                <option value="BRCA1 / BRCA2 Missense Variant">BRCA1 / BRCA2 (Hereditary Breast/Ovarian Risk)</option>
                <option value="SLCO1B1*5 (Statin Myopathy Risk)">SLCO1B1*5 (Pharmacogenomic Statin Sensitivity)</option>
              </select>

              <div className="flex flex-wrap gap-2 mt-1">
                {formData.geneticVariants.map((v, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-[#FAF2EB] text-[#A65B27] px-3 py-1 rounded-full text-[12px] font-semibold border border-[#EACAB2]"
                  >
                    <span className="material-symbols-outlined text-[14px]">genetics</span>
                    {v}
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(v)}
                      className="text-[#6F6D68] hover:text-[#AA210F] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer Card */}
        <div className="bg-white border border-[#D4D8D5] p-4 rounded-2xl flex gap-3 items-start">
          <ShieldCheck className="w-5 h-5 text-[#D08856] shrink-0 mt-0.5" />
          <p className="text-[13px] text-[#6F6D68] leading-relaxed">
            Data entered is securely encrypted and logged per HIPAA compliance standards. Ensure all laboratory values are verified before final submission to the patient's genomic profile.
          </p>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#41403C] text-white text-[14px] font-semibold py-3.5 rounded-xl hover:bg-[#2F2E2B] transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
          >
            {showSavedFeedback ? (
              <>
                <Check className="w-4 h-4 stroke-[3] text-[#D08856]" />
                Saved &amp; Recalculated!
              </>
            ) : activeMode === 'patient' ? (
              <>
                <Save className="w-4 h-4 text-[#D08856]" />
                Save Updates &amp; Recalculate
              </>
            ) : (
              <>
                Submit Clinical Review
                <span className="material-symbols-outlined text-[18px] text-[#D08856]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
