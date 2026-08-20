import React, { useState } from 'react';
import { PatientData } from '../types';
import { X, CheckCircle2, FlaskConical } from 'lucide-react';

interface OrderTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTestName?: string;
  patient: PatientData;
  onConfirmOrder: (orderSummary: string) => void;
}

export const OrderTestModal: React.FC<OrderTestModalProps> = ({
  isOpen,
  onClose,
  defaultTestName = 'Lipoprotein(a) [Lp(a)] Assay',
  patient,
  onConfirmOrder,
}) => {
  if (!isOpen) return null;

  const [selectedTest, setSelectedTest] = useState(defaultTestName);
  const [priority, setPriority] = useState<'routine' | 'stat'>('routine');
  const [labPartner, setLabPartner] = useState('BioPulse Central Genomic Lab');
  const [notes, setNotes] = useState('Patient exhibits high polygenic CAD risk with strong 1st-degree early-onset family history.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onConfirmOrder(`${selectedTest} (${priority.toUpperCase()}) to ${labPartner}`);
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-['Roboto',sans-serif]">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#D4D8D5] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-[#D4D8D5] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF2EB] text-[#D08856] border border-[#EACAB2] flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#41403C]">
                Diagnostic Lab Requisition
              </h3>
              <p className="text-[12px] text-[#6F6D68]">Patient: {patient.name} ({patient.id})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#6F6D68] hover:text-[#41403C] p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#FAF2EB] text-[#D08856] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-[18px] font-bold text-[#41403C]">
              Lab Requisition Transmitted
            </h4>
            <p className="text-[13px] text-[#6F6D68] max-w-xs">
              Requisition #ORD-2026-{Math.floor(1000 + Math.random() * 9000)} created. Electronic specimen kit dispatched.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
            <div>
              <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1">
                Select Diagnostic Assay
              </label>
              <select
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="w-full border border-[#D4D8D5] rounded-xl px-3.5 py-2.5 text-[#41403C] bg-[#EDEFEE] focus:outline-none focus:ring-1 focus:ring-[#41403C]"
              >
                <option value="Lipoprotein(a) [Lp(a)] & Lipid Subfraction Assay">
                  Lipoprotein(a) [Lp(a)] Quantitative Assay
                </option>
                <option value="Coronary Artery Calcium (CAC) CT Scan">
                  Coronary Artery Calcium (CAC) CT Scan Referral
                </option>
                <option value="Fasting Insulin & C-Peptide Panel">
                  Fasting Insulin &amp; HOMA-IR Panel
                </option>
                <option value="Comprehensive Pharmacogenomics (PGx 120-Gene Panel)">
                  Comprehensive Pharmacogenomics (PGx 120-Gene Panel)
                </option>
                <option value="Advanced Glycemic Continuous Monitoring (CGM 14-Day)">
                  Advanced Glycemic Continuous Monitoring (CGM 14-Day)
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1">
                  Urgency / Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full border border-[#D4D8D5] rounded-xl px-3 py-2 text-[#41403C] bg-[#EDEFEE] focus:outline-none focus:ring-1 focus:ring-[#41403C]"
                >
                  <option value="routine">Routine (3-5 Days)</option>
                  <option value="stat">STAT Priority (24 Hours)</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1">
                  Fulfilling Lab
                </label>
                <select
                  value={labPartner}
                  onChange={(e) => setLabPartner(e.target.value)}
                  className="w-full border border-[#D4D8D5] rounded-xl px-3 py-2 text-[#41403C] bg-[#EDEFEE] focus:outline-none focus:ring-1 focus:ring-[#41403C]"
                >
                  <option value="BioPulse Central Genomic Lab">BioPulse Central Lab</option>
                  <option value="Quest Diagnostics Partner">Quest Diagnostics</option>
                  <option value="LabCorp Advanced Genomic">LabCorp Genomics</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1">
                Clinical Justification Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-[#D4D8D5] rounded-xl px-3 py-2 text-[#41403C] bg-[#EDEFEE] focus:outline-none focus:ring-1 focus:ring-[#41403C] resize-none"
              />
            </div>

            <div className="bg-[#EDEFEE] p-3 rounded-xl text-[12px] text-[#6F6D68] flex items-center gap-2 border border-[#D4D8D5]">
              <span className="material-symbols-outlined text-[16px] text-[#D08856]">verified</span>
              <span>Requisition will be electronically logged and billed to patient's clinical chart.</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#D4D8D5]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white border border-[#D4D8D5] text-[#41403C] rounded-xl hover:bg-[#EDEFEE] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#41403C] text-white rounded-xl font-semibold hover:bg-[#2F2E2B] transition-colors cursor-pointer shadow-2xs"
              >
                Authorize Requisition
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
