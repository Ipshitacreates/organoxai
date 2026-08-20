import React from 'react';
import { X, ShieldCheck, HelpCircle } from 'lucide-react';

interface InfoModalProps {
  type: 'help' | 'privacy' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-['Roboto',sans-serif]">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#D4D8D5] animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-[#D4D8D5] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF2EB] text-[#D08856] border border-[#EACAB2] flex items-center justify-center">
              {type === 'help' ? <HelpCircle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <h3 className="text-[18px] font-bold text-[#41403C]">
              {type === 'help' ? 'BioPulse Help & Documentation' : 'HIPAA & Genomic Privacy Policy'}
            </h3>
          </div>
          <button onClick={onClose} className="text-[#6F6D68] hover:text-[#41403C] p-1 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'help' ? (
          <div className="space-y-4 text-[13px] text-[#6F6D68]">
            <div>
              <h4 className="font-bold text-[#41403C] text-[14px]">Understanding Polygenic Risk Scores (PRS)</h4>
              <p className="mt-1 leading-relaxed">
                PRS summarizes the estimated effect of many genetic variants (SNPs) across the genome to calculate lifetime risk relative to a matched population baseline.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#41403C] text-[14px]">Modifiable vs Hereditary Weighting</h4>
              <p className="mt-1 leading-relaxed">
                While genomic risk remains static throughout life, clinical trials demonstrate that optimal lifestyle and early targeted pharmacotherapy can offset up to 50% of elevated genetic risk.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#41403C] text-[14px]">Ordering Diagnostic Panels</h4>
              <p className="mt-1 leading-relaxed">
                Click "Order Tests" on any assessment to generate automated electronic requisition forms for lipid subfractions, CAC scoring, or pharmacogenomics.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-[13px] text-[#6F6D68]">
            <div className="p-3 bg-[#FAF2EB] text-[#A65B27] rounded-xl border border-[#EACAB2]">
              <strong>256-Bit Encrypted Genomic Repository:</strong> All patient genetic sequences, variant tables, and biomarker histories comply with HIPAA Security Rule 45 CFR Part 160.
            </div>
            <div>
              <h4 className="font-bold text-[#41403C] text-[14px]">GINA Compliance</h4>
              <p className="mt-1 leading-relaxed">
                Under the Genetic Information Nondiscrimination Act (GINA), genomic health information is protected against unauthorized commercial sharing or underwriting discrimination.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#41403C] text-[14px]">Access Control &amp; Audit Logging</h4>
              <p className="mt-1 leading-relaxed">
                Every review, update, and print export is timestamped with the clinician's digital signature for audit compliance.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-3 border-t border-[#D4D8D5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#41403C] text-white rounded-xl font-semibold hover:bg-[#2F2E2B] transition-colors text-[13px] cursor-pointer shadow-2xs"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
