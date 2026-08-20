import React, { useState } from 'react';
import { DRUG_DATA } from '../data/clinicalData';
import { PatientData } from '../types';
import { Pill, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Stethoscope, Search } from 'lucide-react';

interface DrugEffectsDetailProps {
  patient: PatientData;
}

export const DrugEffectsDetail: React.FC<DrugEffectsDetailProps> = ({ patient }) => {
  const [selectedDrugId, setSelectedDrugId] = useState<string>('atorvastatin');
  const [searchQuery, setSearchQuery] = useState('');

  const activeDrug = DRUG_DATA.find((d) => d.id === selectedDrugId) || DRUG_DATA[0];

  // Filter drugs based on optional search
  const filteredDrugs = DRUG_DATA.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.drugClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col gap-6 pb-16">
      {/* Title */}
      <div>
        <h1 className="font-['Public_Sans'] text-[24px] md:text-[32px] font-bold text-black tracking-tight">
          Drug Effects Detail
        </h1>
        <p className="font-['Inter'] text-[15px] text-[#45464d] mt-1">
          Pharmacological profile, target organ biodistribution, and genomic drug-gene interactions.
        </p>
      </div>

      {/* Drug Selector (Horizontal Cards / Tabs matching screenshot) */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 gap-3 hide-scrollbar">
        {DRUG_DATA.map((drug) => {
          const isSelected = drug.id === selectedDrugId;
          return (
            <button
              key={drug.id}
              onClick={() => setSelectedDrugId(drug.id)}
              className={`flex-shrink-0 rounded-xl px-5 py-3.5 flex flex-col items-start min-w-[200px] sm:min-w-[220px] transition-all text-left relative overflow-hidden border ${
                isSelected
                  ? 'bg-[#f2f4f6] border-[#006a61] text-[#006a61] shadow-xs'
                  : 'bg-white border-[#c6c6cd] text-black hover:bg-[#f2f4f6]'
              }`}
            >
              {isSelected && <div className="absolute top-0 left-0 w-full h-1 bg-[#006a61]" />}
              <span className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isSelected ? 'text-[#006a61]' : 'text-[#45464d]'
              }`}>
                {isSelected ? 'Active Selection' : 'Alternative / Add-on'}
              </span>
              <span className="font-['Public_Sans'] text-[16px] sm:text-[18px] font-bold">
                {drug.name}
              </span>
              <span className="text-[11px] text-[#45464d] truncate max-w-[190px] mt-0.5">
                {drug.drugClass.split('(')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Patient Specific Pharmacogenomic Callout */}
      <div className="bg-[#e2f8f5] border border-[#86f2e4] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#006a61] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">genetics</span>
          </div>
          <div>
            <span className="font-['Inter'] text-[13px] font-bold text-[#006f66]">
              Genomic Compatibility Check for {patient.name} ({patient.id})
            </span>
            <p className="text-[12px] text-[#006f66]/90">
              Prescribed: <strong>{patient.medications}</strong> • No SLCO1B1*5 severe myopathy risk alleles detected.
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-white text-[#006f66] text-[11px] font-bold rounded-md border border-[#86f2e4] shrink-0">
          Standard Dosing Compatible
        </span>
      </div>

      {/* Drug Detail Card with Detailed Table */}
      <div className="bg-white border border-[#c6c6cd] rounded-xl overflow-hidden shadow-xs flex flex-col">
        {/* Card Header */}
        <div className="bg-[#f2f4f6] px-5 py-4 border-b border-[#c6c6cd] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="font-['Public_Sans'] text-[18px] sm:text-[20px] font-bold text-black">
              Pharmacodynamics &amp; Organ Effects: {activeDrug.name}
            </h2>
            <p className="text-[12px] text-[#45464d]">{activeDrug.drugClass}</p>
          </div>
          <span className="bg-[#89f5e7] text-[#00201d] px-3 py-1 rounded-full text-[12px] font-bold">
            {activeDrug.name === 'Atorvastatin'
              ? 'Statin Class'
              : activeDrug.name === 'Metformin'
              ? 'Biguanide Class'
              : activeDrug.name === 'Lisinopril'
              ? 'ACE Inhibitor'
              : 'PCSK9 Antibody'}
          </span>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#eceef0] border-b border-[#c6c6cd] font-['Inter'] text-[12px] font-bold text-[#45464d] uppercase tracking-wider">
                <th className="py-3.5 px-5 w-1/4">Target Organ</th>
                <th className="py-3.5 px-5 w-1/4">Indication</th>
                <th className="py-3.5 px-5 w-1/3">Mechanism</th>
                <th className="py-3.5 px-5 w-1/4">Side Effects &amp; Monitoring</th>
              </tr>
            </thead>
            <tbody className="font-['Inter'] text-[13px] align-top divide-y divide-[#c6c6cd]/60">
              {activeDrug.rows.map((row, index) => (
                <tr key={index} className="hover:bg-[#f7f9fb] transition-colors">
                  {/* Target Organ */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30] shrink-0">
                        <span className="material-symbols-outlined text-[18px]">{row.organIcon}</span>
                      </div>
                      <span className="font-semibold text-black">{row.targetOrgan}</span>
                    </div>
                  </td>

                  {/* Indication */}
                  <td className="py-4 px-5 text-black font-medium leading-relaxed">
                    {row.indication}
                  </td>

                  {/* Mechanism */}
                  <td className="py-4 px-5 text-[#45464d] leading-relaxed">
                    {row.mechanism}
                  </td>

                  {/* Side Effects Badge & Details */}
                  <td className="py-4 px-5">
                    <div
                      className={`rounded-lg p-3 border inline-block w-full ${
                        row.sideEffectRisk === 'Severe Risk'
                          ? 'bg-[#ffdad6] text-[#93000a] border-[#ffb4ab]'
                          : row.sideEffectRisk === 'Moderate Risk'
                          ? 'bg-[#ffdad6]/60 text-[#ba1a1a] border-[#ffb4ab]'
                          : row.sideEffectRisk === 'Monitor'
                          ? 'bg-[#e6e8ea] text-[#191c1e] border-[#c6c6cd]'
                          : 'bg-[#e6e8ea] text-[#45464d] border-[#c6c6cd]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 font-bold text-[11px] uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[15px]">
                          {row.sideEffectRisk.includes('Risk') ? 'warning' : 'info'}
                        </span>
                        <span>{row.sideEffectRisk}</span>
                      </div>
                      <p className="text-[12px] leading-snug font-normal">
                        {row.sideEffectDetail}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-[#d3e4fe] text-[#0b1c30] p-4 rounded-lg flex items-start gap-3 border border-[#b7c8e1]">
        <span className="material-symbols-outlined text-[#006a61] text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <p className="font-['Inter'] text-[13px] text-[#38485d] leading-relaxed">
          This information is for clinical reference only and does not constitute medical advice. Treatment decisions should be based on comprehensive patient evaluation and current clinical guidelines. Monitor patient response and adjust dosing as necessary.
        </p>
      </div>
    </div>
  );
};
