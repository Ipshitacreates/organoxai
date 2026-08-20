import React, { useState } from 'react';
import { ConditionId, PatientData, AuthUser } from '../types';
import { CONDITIONS_DATA } from '../data/clinicalData';
import { computeRiskForCondition } from '../utils/riskCalculator';
import { 
  Activity, 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  FlaskConical,
  Scale,
  Cigarette,
  Footprints
} from 'lucide-react';

interface ModifiableFactorsViewProps {
  patient: PatientData;
  conditionId: ConditionId;
  onSelectCondition: (cond: ConditionId) => void;
  onNavigateToDataInput: () => void;
  onOrderTests: (testName: string) => void;
  currentUser?: AuthUser | null;
}

export const ModifiableFactorsView: React.FC<ModifiableFactorsViewProps> = ({
  patient,
  conditionId,
  onNavigateToDataInput,
  onOrderTests,
}) => {
  CONDITIONS_DATA[conditionId] || CONDITIONS_DATA.cad;
  const initialCalculated = computeRiskForCondition(patient, conditionId);

  // Interactive "What-If" Simulator State
  const [simulatedLdl, setSimulatedLdl] = useState<number>(patient.ldl);
  const [simulatedSystolic, setSimulatedSystolic] = useState<number>(patient.systolicBp);
  const [simulatedGlucose, setSimulatedGlucose] = useState<number>(patient.fastingGlucose);
  const [simulatedActivity, setSimulatedActivity] = useState<'sedentary' | 'moderate' | 'active'>(patient.activityLevel);

  // Virtual patient for simulation
  const simulatedPatient: PatientData = {
    ...patient,
    ldl: simulatedLdl,
    systolicBp: simulatedSystolic,
    fastingGlucose: simulatedGlucose,
    activityLevel: simulatedActivity,
  };

  const simulatedCalculated = computeRiskForCondition(simulatedPatient, conditionId);
  const riskDifference = initialCalculated.scorePercent - simulatedCalculated.scorePercent;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-12 animate-in fade-in duration-200 font-['Roboto',sans-serif]">
      {/* Header Banner */}
      <div className="bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]">
              Clinical Phenomics
            </span>
            <span className="text-xs text-[#6F6D68]">
              Patient: <strong className="text-[#41403C]">{patient.name}</strong> ({patient.id})
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#41403C] tracking-tight">
            Modifiable Factors &amp; Phenotypic Biomarkers
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6D68] mt-1">
            Analyze laboratory values, lifestyle parameters, and simulate projected risk reduction from targeted interventions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToDataInput}
            className="px-3.5 py-2 bg-[#41403C] text-white text-xs font-bold rounded-xl hover:bg-[#2F2E2B] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#D08856]">edit_note</span>
            <span>Edit Patient Values</span>
          </button>
        </div>
      </div>

      {/* Main Biomarkers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Clinical Laboratory Markers */}
        <div className="lg:col-span-7 bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D4D8D5]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#41403C]">
                    Current Laboratory Markers
                  </h3>
                  <p className="text-[12px] text-[#6F6D68]">
                    Evaluated against clinical guidelines (AHA/ACC, ADA)
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#6F6D68]">Recent Fasting Panel</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* ApoB / ApoA1 */}
              <div className="p-3.5 rounded-xl bg-[#EDEFEE] border border-[#D4D8D5] flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-[#41403C]">ApoB / ApoA1 Ratio</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FDF1EF] text-[#AA210F] border border-[#F5C2BA] text-[10px] font-bold">
                    Elevated
                  </span>
                </div>
                <div className="my-2">
                  <span className="text-2xl font-black text-[#41403C]">
                    {patient.apobApoa1Ratio}
                  </span>
                  <span className="text-xs text-[#6F6D68] ml-1">ratio</span>
                </div>
                <span className="text-[11px] text-[#6F6D68]">Target: &lt;0.70 (Atherogenic particle excess)</span>
              </div>

              {/* LDL Cholesterol */}
              <div className="p-3.5 rounded-xl bg-[#EDEFEE] border border-[#D4D8D5] flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-[#41403C]">LDL-C (Low-Density Lipoprotein)</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    patient.ldl > 100 ? 'bg-[#FDF1EF] text-[#AA210F] border border-[#F5C2BA]' : 'bg-[#EDEFEE] text-[#41403C] border border-[#D4D8D5]'
                  }`}>
                    {patient.ldl > 130 ? 'High' : patient.ldl > 100 ? 'Borderline' : 'Optimal'}
                  </span>
                </div>
                <div className="my-2">
                  <span className="text-2xl font-black text-[#41403C]">
                    {patient.ldl}
                  </span>
                  <span className="text-xs text-[#6F6D68] ml-1">mg/dL</span>
                </div>
                <span className="text-[11px] text-[#6F6D68]">Target: &lt;70 mg/dL for high genetic risk</span>
              </div>

              {/* Blood Pressure */}
              <div className="p-3.5 rounded-xl bg-[#EDEFEE] border border-[#D4D8D5] flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-[#41403C]">Blood Pressure (Systolic / Diastolic)</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FDF1EF] text-[#AA210F] border border-[#F5C2BA] text-[10px] font-bold">
                    Stage 2 HTN
                  </span>
                </div>
                <div className="my-2">
                  <span className="text-2xl font-black text-[#41403C]">
                    {patient.systolicBp}/{patient.diastolicBp}
                  </span>
                  <span className="text-xs text-[#6F6D68] ml-1">mmHg</span>
                </div>
                <span className="text-[11px] text-[#6F6D68]">Target: &lt;120/80 mmHg</span>
              </div>

              {/* Fasting Blood Glucose */}
              <div className="p-3.5 rounded-xl bg-[#EDEFEE] border border-[#D4D8D5] flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-[#41403C]">Fasting Blood Glucose / HbA1c</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2] text-[10px] font-bold">
                    Pre-diabetic
                  </span>
                </div>
                <div className="my-2">
                  <span className="text-2xl font-black text-[#41403C]">
                    {patient.fastingGlucose}
                  </span>
                  <span className="text-xs text-[#6F6D68] ml-1">mg/dL • HbA1c {patient.hba1c}%</span>
                </div>
                <span className="text-[11px] text-[#6F6D68]">Target: &lt;100 mg/dL • HbA1c &lt;5.7%</span>
              </div>
            </div>
          </div>

          {/* Missing Diagnostic Lp(a) callout */}
          {!patient.lpaTested && (
            <div className="mt-4 p-3.5 bg-[#FAF2EB] border border-[#EACAB2] rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <FlaskConical className="w-5 h-5 text-[#D08856] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#8A4A1C]">Missing Lipoprotein(a) [Lp(a)] Assay</h4>
                  <p className="text-[11px] text-[#8A4A1C]">
                    High clinical priority: Lp(a) is 90% genetically determined and unmeasured.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOrderTests('Lipoprotein(a) [Lp(a)] & Lipid Subfraction Assay')}
                className="px-3 py-1.5 bg-[#D08856] hover:bg-[#BC7747] text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
              >
                Order Test
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Lifestyle & Anthropometric Factors */}
        <div className="lg:col-span-5 bg-white border border-[#D4D8D5] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D4D8D5]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#41403C] text-white">
                  <Scale className="w-5 h-5 text-[#D08856]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#41403C]">
                    Lifestyle &amp; Biometrics
                  </h3>
                  <p className="text-[12px] text-[#6F6D68]">
                    Behavioral modifiers affecting phenotypic expression
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3.5 bg-[#EDEFEE] rounded-xl border border-[#D4D8D5] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#41403C]">Body Mass Index (BMI)</span>
                  <p className="text-[11px] text-[#6F6D68]">{patient.heightCm} cm • {patient.weightKg} kg</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#41403C]">{patient.bmi} kg/m²</span>
                  <span className="block text-[10px] text-[#AA210F] font-semibold">Overweight Class I</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#EDEFEE] rounded-xl border border-[#D4D8D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cigarette className="w-4 h-4 text-[#6F6D68]" />
                  <div>
                    <span className="text-xs font-bold text-[#41403C]">Smoking History</span>
                    <p className="text-[11px] text-[#6F6D68]">Former Smoker (Quit 4 years ago)</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-white text-[#41403C] border border-[#D4D8D5] rounded-full text-[10px] font-bold">
                  Sustained Cessation
                </span>
              </div>

              <div className="p-3.5 bg-[#EDEFEE] rounded-xl border border-[#D4D8D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-[#D08856]" />
                  <div>
                    <span className="text-xs font-bold text-[#41403C]">Physical Activity</span>
                    <p className="text-[11px] text-[#6F6D68]">Currently {patient.activityLevel} (approx 60-90 min/wk)</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2] rounded-full text-[10px] font-bold">
                  Below 150m Target
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-[#EDEFEE] rounded-xl text-xs text-[#6F6D68] border border-[#D4D8D5]">
            <strong className="text-[#41403C]">Clinical Note:</strong> Achieving 150 min/wk of Zone 2 aerobic activity and Mediterranean dietary adherence attenuates high genetic PRS risk by approximately 45%.
          </div>
        </div>
      </div>

      {/* Interactive "What-If" Biomarker Risk Recalculator */}
      <div className="bg-[#41403C] text-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#555450]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-4 mb-6 border-b border-[#555450]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D08856]" />
              <h2 className="text-lg md:text-xl font-bold text-white">
                Interactive "What-If" Risk Reduction Simulator
              </h2>
            </div>
            <p className="text-xs text-[#CED3D0] mt-1">
              Adjust modifiable clinical biomarkers below to see simulated real-time impact on lifetime risk.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#32312E] px-4 py-2 rounded-xl border border-[#555450]">
            <div>
              <span className="text-[10px] text-[#CED3D0] uppercase block">Baseline vs Simulated</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-[#F5C2BA]">{initialCalculated.scorePercent}%</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D08856]" />
                <span className="text-2xl font-black text-[#D08856]">{simulatedCalculated.scorePercent}%</span>
              </div>
            </div>
            {riskDifference > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-[#D08856]/30 text-[#FAF2EB] text-xs font-bold border border-[#D08856]/60 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>-{riskDifference}% Risk</span>
              </span>
            )}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LDL-C Slider */}
          <div className="bg-[#32312E] p-4 rounded-xl border border-[#555450]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white">LDL Cholesterol Target</span>
              <span className="text-sm font-mono font-bold text-[#D08856]">{simulatedLdl} mg/dL</span>
            </div>
            <input
              type="range"
              min="50"
              max="200"
              step="5"
              value={simulatedLdl}
              onChange={(e) => setSimulatedLdl(Number(e.target.value))}
              className="w-full accent-[#D08856] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#CED3D0] mt-1 font-mono">
              <span>50 (Aggressive)</span>
              <span>100 (Standard)</span>
              <span>200 (Severe)</span>
            </div>
          </div>

          {/* Systolic BP Slider */}
          <div className="bg-[#32312E] p-4 rounded-xl border border-[#555450]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white">Systolic Blood Pressure</span>
              <span className="text-sm font-mono font-bold text-[#D08856]">{simulatedSystolic} mmHg</span>
            </div>
            <input
              type="range"
              min="110"
              max="180"
              step="2"
              value={simulatedSystolic}
              onChange={(e) => setSimulatedSystolic(Number(e.target.value))}
              className="w-full accent-[#D08856] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#CED3D0] mt-1 font-mono">
              <span>115 (Normal)</span>
              <span>130 (Stage 1)</span>
              <span>180 (Crisis)</span>
            </div>
          </div>

          {/* Fasting Glucose Slider */}
          <div className="bg-[#32312E] p-4 rounded-xl border border-[#555450]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white">Fasting Blood Glucose</span>
              <span className="text-sm font-mono font-bold text-[#D08856]">{simulatedGlucose} mg/dL</span>
            </div>
            <input
              type="range"
              min="75"
              max="180"
              step="2"
              value={simulatedGlucose}
              onChange={(e) => setSimulatedGlucose(Number(e.target.value))}
              className="w-full accent-[#D08856] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#CED3D0] mt-1 font-mono">
              <span>85 (Optimal)</span>
              <span>100 (Impaired)</span>
              <span>180 (Diabetic)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setSimulatedLdl(patient.ldl);
              setSimulatedSystolic(patient.systolicBp);
              setSimulatedGlucose(patient.fastingGlucose);
              setSimulatedActivity(patient.activityLevel);
            }}
            className="text-xs text-[#CED3D0] hover:text-white underline cursor-pointer"
          >
            Reset Simulator to Baseline
          </button>
        </div>
      </div>
    </div>
  );
};
