import React, { useState } from 'react';
import { PatientData } from '../types';
import { X, CheckCircle2 } from 'lucide-react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientData;
  onConfirmReferral: (summary: string) => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
  isOpen,
  onClose,
  patient,
  onConfirmReferral,
}) => {
  if (!isOpen) return null;

  const [specialty, setSpecialty] = useState('Cardiovascular Genetic Counselor');
  const [urgency, setUrgency] = useState('Standard (2-3 Weeks)');
  const [reason, setReason] = useState('Review high CAD polygenic risk score, 9p21 variant, and family cascade screening for 1st-degree relatives.');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDone(true);
    setTimeout(() => {
      onConfirmReferral(`${specialty} Referral Transmitted`);
      setIsDone(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-['Roboto',sans-serif]">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#D4D8D5] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-center border-b border-[#D4D8D5] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF2EB] text-[#D08856] border border-[#EACAB2] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">contact_mail</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#41403C]">
                Genetic Counselor Referral
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

        {isDone ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#FAF2EB] text-[#D08856] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-[18px] font-bold text-[#41403C]">
              Referral Packet Transmitted
            </h4>
            <p className="text-[13px] text-[#6F6D68] max-w-xs">
              Secure HIPAA referral sent to Genomics Telehealth Network. Patient will receive scheduling notification.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
            <div>
              <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1">
                Subspecialty Service
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full border border-[#D4D8D5] rounded-xl px-3.5 py-2.5 text-[#41403C] bg-[#EDEFEE] focus:outline-none focus:ring-1 focus:ring-[#41403C]"
              >
                <option value="Cardiovascular Genetic Counselor">Cardiovascular Genomics &amp; Familial Hypercholesterolemia</option>
                <option value="Metabolic & Endocrine Geneticist">Metabolic &amp; Type 2 Diabetes Stratification</option>
                <option value="Neurogenetics & Dementia Counselor">Neurogenetics &amp; ApoE4 Consult</option>
                <option value="Hereditary Cancer Specialist">Hereditary Cancer (BRCA1/2 &amp; Lynch Syndrome)</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1">
                Referral Urgency
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full border border-[#D4D8D5] rounded-xl px-3 py-2 text-[#41403C] bg-[#EDEFEE] focus:outline-none focus:ring-1 focus:ring-[#41403C]"
              >
                <option value="Standard (2-3 Weeks)">Standard Priority (Next Available 2-3 Weeks)</option>
                <option value="Urgent (Within 5 Days)">Urgent Priority (Clinical Event Risk &lt; 5 Days)</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#6F6D68] uppercase mb-1">
                Clinical Referral Summary &amp; Cascade Screening Goals
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border border-[#D4D8D5] rounded-xl px-3 py-2 text-[#41403C] bg-[#EDEFEE] focus:outline-none focus:ring-1 focus:ring-[#41403C] resize-none"
              />
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
                Transmit Referral
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
