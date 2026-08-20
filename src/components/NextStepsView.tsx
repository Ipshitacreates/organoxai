import React, { useState } from 'react';
import { ConditionId, PatientData, AuthUser } from '../types';
import { CONDITIONS_DATA } from '../data/clinicalData';
import { 
  Stethoscope, 
  FlaskConical, 
  UserPlus, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  FileText, 
  ArrowRight, 
  ShieldAlert,
  Send,
  Building,
  Sparkles
} from 'lucide-react';

interface NextStepsViewProps {
  patient: PatientData;
  conditionId: ConditionId;
  onSelectCondition: (cond: ConditionId) => void;
  onOrderTests: (testName: string) => void;
  onReferral: () => void;
  currentUser?: AuthUser | null;
}

export const NextStepsView: React.FC<NextStepsViewProps> = ({
  patient,
  conditionId,
  onSelectCondition,
  onOrderTests,
  onReferral,
  currentUser,
}) => {
  const conditionDetail = CONDITIONS_DATA[conditionId] || CONDITIONS_DATA.cad;

  // Clinical timeline pathway items
  const timelineMilestones = [
    {
      phase: 'Immediate (0 - 14 Days)',
      title: 'Baseline Diagnostic Stratification',
      status: 'pending',
      badge: 'Urgent',
      items: [
        'Complete Lipoprotein(a) [Lp(a)] quantitative immunoassay',
        'Fasting insulin & HOMA-IR metabolic baseline evaluation',
        'Initiate baseline at-home blood pressure diary (AM/PM)',
      ],
    },
    {
      phase: 'Short-Term (30 - 60 Days)',
      title: 'Imaging & Specialist Consultation',
      status: 'scheduled',
      badge: 'Recommended',
      items: [
        'Perform Non-contrast Coronary Artery Calcium (CAC) CT Scan',
        'Consult with Preventive Cardiovascular Genomics Specialist',
        'Evaluate high-intensity statin tolerance (SLCO1B1 genotyped)',
      ],
    },
    {
      phase: 'Intermediate (3 - 6 Months)',
      title: 'Therapeutic Target Re-Assessment',
      status: 'upcoming',
      badge: 'Monitoring',
      items: [
        'Repeat Lipid Subfraction Panel (Target LDL-C < 70 mg/dL, ApoB < 80 mg/dL)',
        'Check liver transaminases (ALT/AST) and hs-CRP inflammatory marker',
        'Assess aerobic fitness progression (Vo2 Max / Exercise stress test)',
      ],
    },
    {
      phase: 'Annual (12 Months)',
      title: 'Longitudinal Genomic Recalibration',
      status: 'upcoming',
      badge: 'Longitudinal',
      items: [
        'Annual multi-factorial cardiovascular risk recalculation',
        'Carotid intima-media thickness (CIMT) ultrasound evaluation',
        'Update clinical guideline recommendations against latest PRS algorithms',
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white border border-[#c6c6cd] rounded-xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#ba1a1a] text-white">
              Clinical Action Pathway
            </span>
            <span className="text-xs text-[#45464d]">
              Patient: <strong className="text-black">{patient.name}</strong> ({patient.id})
            </span>
          </div>
          <h1 className="font-['Public_Sans'] text-2xl md:text-3xl font-bold text-black tracking-tight">
            Diagnostic Gaps &amp; Clinical Next Steps
          </h1>
          <p className="text-xs sm:text-sm text-[#45464d] mt-1">
            Requisition missing biomarkers, dispatch genetic referrals, and monitor the clinical care pathway.
          </p>
        </div>

        {/* Condition Switcher */}
        <div className="flex items-center gap-1.5 bg-[#f2f4f6] p-1 rounded-xl border border-[#c6c6cd]">
          {(['cad', 't2d', 'alzheimers'] as ConditionId[]).map((cId) => (
            <button
              key={cId}
              onClick={() => onSelectCondition(cId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                conditionId === cId
                  ? 'bg-[#006a61] text-white shadow-xs'
                  : 'text-[#45464d] hover:text-black hover:bg-[#e0e3e5]'
              }`}
            >
              {CONDITIONS_DATA[cId].condition.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Critical Gaps & 1-Click Action Requisitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Diagnostic Assay Orders Card */}
        <div className="bg-white border border-[#c6c6cd] rounded-xl p-5 md:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#c6c6cd]">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#86f2e4] text-[#006f66]">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Public_Sans'] text-[16px] font-bold text-black">
                    Diagnostic Lab Gaps
                  </h3>
                  <p className="text-[12px] text-[#45464d]">
                    Required to finalize precision risk stratification
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a]">
                Action Required
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Gap 1: Lp(a) */}
              <div className="p-3.5 bg-[#fff8f6] border border-[#ffdad6] rounded-xl flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-[#410002]">Lipoprotein(a) [Lp(a)] Assay</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-[#ba1a1a] text-white rounded font-semibold">Priority</span>
                  </div>
                  <p className="text-[11px] text-[#410002]/80 mt-0.5">
                    90% genetically determined risk amplifier. Never tested in patient history.
                  </p>
                </div>
                <button
                  onClick={() => onOrderTests('Lipoprotein(a) [Lp(a)] & Lipid Subfraction Assay')}
                  className="px-3 py-1.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-xs active:scale-98"
                >
                  Order Test
                </button>
              </div>

              {/* Gap 2: CAC CT Scan */}
              <div className="p-3.5 bg-[#f7f9fb] border border-[#c6c6cd]/80 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-xs text-black">Coronary Artery Calcium (CAC) CT</span>
                  <p className="text-[11px] text-[#45464d] mt-0.5">
                    Quantifies anatomical calcified plaque burden to guide statin intensity.
                  </p>
                </div>
                <button
                  onClick={() => onOrderTests('Coronary Artery Calcium (CAC) Agatston Scoring CT')}
                  className="px-3 py-1.5 bg-[#006a61] hover:bg-[#00524b] text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-xs active:scale-98"
                >
                  Order Imaging
                </button>
              </div>

              {/* Gap 3: Fasting Insulin */}
              <div className="p-3.5 bg-[#f7f9fb] border border-[#c6c6cd]/80 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-xs text-black">Fasting Insulin &amp; HOMA-IR Panel</span>
                  <p className="text-[11px] text-[#45464d] mt-0.5">
                    Assesses peripheral insulin resistance in context of TCF7L2 genetic risk.
                  </p>
                </div>
                <button
                  onClick={() => onOrderTests('Fasting Insulin & HOMA-IR Metabolic Assay')}
                  className="px-3 py-1.5 bg-white hover:bg-[#f2f4f6] text-[#006a61] border border-[#006a61] text-xs font-bold rounded-lg transition-colors shrink-0 active:scale-98"
                >
                  Requisition
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specialist Referrals Card */}
        <div className="bg-white border border-[#c6c6cd] rounded-xl p-5 md:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#c6c6cd]">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#006a61] text-white">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Public_Sans'] text-[16px] font-bold text-black">
                    Specialty Telehealth Referrals
                  </h3>
                  <p className="text-[12px] text-[#45464d]">
                    Connect patient directly to board-certified genetics subspecialists
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Referral 1 */}
              <div className="p-3.5 bg-[#f7f9fb] border border-[#c6c6cd]/80 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-xs text-black">Cardiovascular Genomics Clinic</span>
                  <p className="text-[11px] text-[#45464d] mt-0.5">
                    BioPulse Heart Institute • Dr. Sarah Lin, MD (Molecular Genetics)
                  </p>
                </div>
                <button
                  onClick={onReferral}
                  className="px-3 py-1.5 bg-[#006a61] hover:bg-[#00524b] text-white text-xs font-bold rounded-lg transition-colors shrink-0 flex items-center gap-1 shadow-xs active:scale-98"
                >
                  <Send className="w-3 h-3" />
                  <span>Refer</span>
                </button>
              </div>

              {/* Referral 2 */}
              <div className="p-3.5 bg-[#f7f9fb] border border-[#c6c6cd]/80 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-xs text-black">Registered Cardiometabolic Dietitian</span>
                  <p className="text-[11px] text-[#45464d] mt-0.5">
                    Precision Nutrition Network • Mediterranean &amp; Glycemic Index coaching
                  </p>
                </div>
                <button
                  onClick={onReferral}
                  className="px-3 py-1.5 bg-white hover:bg-[#f2f4f6] text-[#006a61] border border-[#006a61] text-xs font-bold rounded-lg transition-colors shrink-0 flex items-center gap-1 active:scale-98"
                >
                  <Send className="w-3 h-3" />
                  <span>Refer</span>
                </button>
              </div>

              {/* Referral 3 */}
              <div className="p-3.5 bg-[#f7f9fb] border border-[#c6c6cd]/80 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-xs text-black">Licensed Genetic Counselor (CGC)</span>
                  <p className="text-[11px] text-[#45464d] mt-0.5">
                    Familial pedigree cascade screening &amp; progeny counseling
                  </p>
                </div>
                <button
                  onClick={onReferral}
                  className="px-3 py-1.5 bg-white hover:bg-[#f2f4f6] text-[#006a61] border border-[#006a61] text-xs font-bold rounded-lg transition-colors shrink-0 flex items-center gap-1 active:scale-98"
                >
                  <Send className="w-3 h-3" />
                  <span>Refer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Timeline Pathway */}
      <div className="bg-white border border-[#c6c6cd] rounded-xl p-5 md:p-6 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#c6c6cd]">
          <Calendar className="w-5 h-5 text-[#006a61]" />
          <div>
            <h3 className="font-['Public_Sans'] text-[18px] font-bold text-black">
              Longitudinal Clinical Care Pathway
            </h3>
            <p className="text-xs text-[#45464d]">
              Chronological milestones for biomarker monitoring and therapy adjustment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {timelineMilestones.map((milestone, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#f7f9fb] border border-[#c6c6cd]/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-[#006a61] uppercase tracking-wider">
                    {milestone.phase}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white border border-[#c6c6cd] text-[#45464d]">
                    {milestone.badge}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-black mb-3">{milestone.title}</h4>
                <ul className="flex flex-col gap-2">
                  {milestone.items.map((it, i) => (
                    <li key={i} className="text-[11px] text-[#45464d] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] mt-1.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
