import React from 'react';
import { PatientData, ConditionId } from '../types';
import { CONDITIONS_DATA } from '../data/clinicalData';
import { computeRiskForCondition } from '../utils/riskCalculator';
import { Printer, Download, ArrowLeft } from 'lucide-react';

interface PatientReportPrintViewProps {
  patient: PatientData;
  conditionId: ConditionId;
  onBack: () => void;
}

export const PatientReportPrintView: React.FC<PatientReportPrintViewProps> = ({
  patient,
  conditionId,
  onBack,
}) => {
  const calculated = computeRiskForCondition(patient, conditionId);
  const conditionInfo = CONDITIONS_DATA[conditionId] || CONDITIONS_DATA.cad;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ patient, calculated, conditionInfo }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `BioPulse_Report_${patient.id.replace('#', '')}_${conditionId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full flex flex-col items-center py-4 sm:py-8 bg-[#EDEFEE] min-h-screen font-['Roboto',sans-serif]">
      {/* Top Action Bar (hidden when printing) */}
      <div className="no-print w-full max-w-[850px] mb-6 flex flex-wrap items-center justify-between gap-3 px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#D4D8D5] text-[#41403C] rounded-xl text-[13px] font-medium hover:bg-[#EDEFEE] transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#D08856]" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#D4D8D5] text-[#41403C] rounded-xl text-[13px] font-medium hover:bg-[#EDEFEE] transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#D08856]" />
            Export Raw JSON
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-[#41403C] text-white rounded-xl text-[13px] font-bold hover:bg-[#2F2E2B] transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#D08856]" />
            Print Report / Save PDF
          </button>
        </div>
      </div>

      {/* Printable A4 Report Card */}
      <div className="a4-page w-full max-w-[850px] bg-white border border-[#D4D8D5] shadow-sm rounded-2xl px-8 sm:px-12 py-10 flex flex-col relative text-[#41403C]">
        {/* Header */}
        <header className="flex justify-between items-start border-b-2 border-[#41403C] pb-5 mb-6">
          <div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#41403C] tracking-tight leading-none">
              BioPulse Diagnostics
            </h1>
            <p className="text-[14px] text-[#6F6D68] mt-1.5 font-medium">
              Clinical Genomic &amp; Pharmacogenomics Assessment
            </p>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold text-[#6F6D68] uppercase tracking-wider">Report Details</div>
            <div className="text-[14px] font-bold text-[#41403C] mt-0.5">Patient ID: {patient.id}</div>
            <div className="text-[12px] text-[#6F6D68] mt-0.5">Date: {patient.dateGenerated}</div>
            <div className="text-[12px] text-[#6F6D68]">Report ID: {patient.reportId}</div>
          </div>
        </header>

        {/* Disclaimer */}
        <div className="bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl p-3.5 mb-6 flex gap-3 items-start">
          <span className="material-symbols-outlined text-[#D08856] text-[18px] mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            info
          </span>
          <p className="text-[12px] text-[#6F6D68] leading-relaxed">
            <strong className="text-[#41403C] font-semibold">Clinical Decision Support Tool Only.</strong> This report provides a probabilistic risk assessment based on currently understood genomic markers and clinical data. It is not a definitive diagnostic tool. All recommendations must be reviewed by a licensed healthcare provider in the context of the patient's full medical history.
          </p>
        </div>

        {/* Executive Summary */}
        <section className="mb-8">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-[#41403C] mb-4 border-b border-[#D4D8D5] pb-1.5">
            Executive Summary
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-[#FDF1EF] border border-[#F5C2BA] rounded-xl p-5 w-full sm:w-1/3 text-center shrink-0">
              <div className="text-[11px] font-bold text-[#AA210F] uppercase tracking-wider mb-1">
                Calculated Risk Level
              </div>
              <div className="text-[36px] sm:text-[40px] text-[#AA210F] font-black tracking-tight leading-none">
                {calculated.riskLevel}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#41403C] mb-1">
                {conditionInfo.condition.name}
              </h3>
              <p className="text-[13px] text-[#6F6D68] leading-relaxed">
                Patient {patient.id} exhibits a significantly elevated polygenic risk score for {conditionInfo.condition.shortName}, compounded by specific modifiable clinical factors. Immediate clinical intervention and lifestyle modifications are strongly indicated to mitigate long-term event probabilities.
              </p>
            </div>
          </div>
        </section>

        {/* Primary Risk Drivers */}
        <section className="mb-8">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-[#41403C] mb-4 border-b border-[#D4D8D5] pb-1.5">
            Primary Risk Drivers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Hereditary Factors */}
            <div className="border border-[#D4D8D5] rounded-xl overflow-hidden">
              <div className="bg-[#EDEFEE] px-3.5 py-2 border-b border-[#D4D8D5] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#41403C] text-[16px]">genetics</span>
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#41403C]">
                  Hereditary Factors (Polygenic)
                </h3>
              </div>
              <div className="p-3.5 space-y-3">
                {conditionInfo.hereditaryFactors.map((factor, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1 text-[13px]">
                      <span className="font-semibold text-[#41403C]">{factor.title}</span>
                      <span className="text-[#AA210F] font-bold">{factor.riskIncrease || '+20% Risk'}</span>
                    </div>
                    <div className="w-full bg-[#EDEFEE] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#AA210F] h-full" style={{ width: `${factor.meterPercent || 75}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modifiable Factors */}
            <div className="border border-[#D4D8D5] rounded-xl overflow-hidden">
              <div className="bg-[#EDEFEE] px-3.5 py-2 border-b border-[#D4D8D5] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#41403C] text-[16px]">monitor_heart</span>
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#41403C]">
                  Modifiable Factors (Clinical)
                </h3>
              </div>
              <div className="p-3.5 space-y-2 text-[13px]">
                <div className="flex justify-between items-center border-b border-[#D4D8D5]/50 pb-1.5">
                  <span className="text-[#6F6D68]">LDL-C Levels</span>
                  <span className="bg-[#FDF1EF] text-[#AA210F] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#F5C2BA]">
                    {patient.ldl} mg/dL (Elevated)
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#D4D8D5]/50 pb-1.5">
                  <span className="text-[#6F6D68]">Systolic BP</span>
                  <span className="bg-[#EDEFEE] text-[#41403C] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#D4D8D5]">
                    {patient.systolicBp} mmHg ({patient.systolicBp >= 140 ? 'Stage 2' : 'Borderline'})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6F6D68]">ApoB/ApoA1 Ratio</span>
                  <span className="bg-[#FDF1EF] text-[#AA210F] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#F5C2BA]">
                    {patient.apobApoa1Ratio.toFixed(2)} (High)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prevention Matrix (3 Columns) */}
        <section className="mb-8">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-[#41403C] mb-4 border-b border-[#D4D8D5] pb-1.5">
            Prevention Matrix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Lifestyle */}
            <div className="border border-[#D4D8D5] rounded-xl p-3.5 bg-white border-t-4 border-t-[#41403C]">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="material-symbols-outlined text-[#41403C] text-[18px]">directions_run</span>
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#41403C]">Lifestyle</h3>
              </div>
              <ul className="space-y-2 text-[12px] text-[#6F6D68] list-disc pl-4">
                <li>Strict adherence to Mediterranean diet profile.</li>
                <li>Minimum 150 minutes of moderate aerobic exercise weekly.</li>
                <li>Target BMI reduction to &lt; 25 kg/m².</li>
              </ul>
            </div>

            {/* Screening */}
            <div className="border border-[#D4D8D5] rounded-xl p-3.5 bg-white border-t-4 border-t-[#D08856]">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="material-symbols-outlined text-[#D08856] text-[18px]">screen_search_desktop</span>
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#41403C]">Clinical Screening</h3>
              </div>
              <ul className="space-y-2 text-[12px] text-[#6F6D68] list-disc pl-4">
                <li>Bi-annual comprehensive lipid panel.</li>
                <li>Coronary Artery Calcium (CAC) scoring recommended within 6 months.</li>
                <li>Monthly home blood pressure monitoring.</li>
              </ul>
            </div>

            {/* Medical */}
            <div className="border border-[#D4D8D5] rounded-xl p-3.5 bg-white border-t-4 border-t-[#AA210F]">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="material-symbols-outlined text-[#AA210F] text-[18px]">medication</span>
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#41403C]">Medical</h3>
              </div>
              <ul className="space-y-2 text-[12px] text-[#6F6D68] list-disc pl-4">
                <li>Initiate high-intensity statin therapy (e.g. Atorvastatin 40-80mg).</li>
                <li>Consider PCSK9 inhibitor if LDL-C targets are not met within 3 months.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Critical Next Steps & Gaps */}
        <section className="mb-10">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-[#41403C] mb-3 border-b border-[#D4D8D5] pb-1.5">
            Critical Next Steps &amp; Diagnostic Actions
          </h2>
          <div className="bg-[#EDEFEE] border border-[#D4D8D5] rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-[#D4D8D5]">
              <div className="bg-[#41403C] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#41403C]">Lipoprotein(a) Testing Required</h4>
                <p className="text-[12px] text-[#6F6D68]">
                  Lp(a) levels were not included in the current assay. Given the hereditary profile, establishing a baseline Lp(a) is critical for completing cardiovascular risk stratification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#41403C] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#41403C]">Genetic Counseling Referral</h4>
                <p className="text-[12px] text-[#6F6D68]">
                  Refer patient to a certified genetic counselor to discuss implications of polygenic risk and missense variants for first-degree family members.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Signature & Footer Block */}
        <footer className="pt-6 border-t border-[#D4D8D5] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-auto">
          <div className="w-full sm:w-1/2">
            <div className="italic text-[14px] text-[#41403C] border-b border-[#41403C] pb-1 mb-1 font-serif">
              Dr. Julian Vance, MD, FACC (Electronically Signed)
            </div>
            <div className="text-[11px] font-bold text-[#6F6D68] uppercase">Reviewing Physician Signature</div>
          </div>

          <div className="text-left sm:text-right text-[11px] text-[#6F6D68]">
            <div>© 2026 BioPulse Genomics Institute. All rights reserved.</div>
            <div className="font-semibold mt-0.5">Page 1 of 1 • BioPulse Genomic Platform</div>
          </div>
        </footer>
      </div>
    </div>
  );
};
