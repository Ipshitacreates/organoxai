import React, { useState } from 'react';
import { ActiveTab, PatientData, AuthUser } from '../types';
import { CLINIC_LOGO, SAMPLE_PATIENTS } from '../data/clinicalData';
import { 
  Users, 
  ChevronDown, 
  FlaskConical, 
  UserPlus, 
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  patient: PatientData;
  onSelectPatient?: (patient: PatientData) => void;
  onExportReport: () => void;
  onOrderTest?: () => void;
  onReferral?: () => void;
  onOpenHelp: () => void;
  onOpenPrivacy: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  patient,
  onSelectPatient,
  onExportReport,
  onOrderTest,
  onReferral,
  onOpenHelp,
  onOpenPrivacy,
  currentUser,
  onLogout,
}) => {
  const [isPatientSwitcherOpen, setIsPatientSwitcherOpen] = useState(false);
  const isDoctor = currentUser?.role === 'doctor';

  return (
    <aside className="hidden md:flex flex-col bg-white border-r border-[#D4D8D5] h-[calc(100vh-4rem)] w-64 fixed left-0 top-16 overflow-y-auto p-4 gap-2 z-40 selection:bg-[#F1DDD0] font-['Roboto',sans-serif]">
      {/* Patient Header Card */}
      <div className="relative mb-2">
        <div className="flex flex-col items-center text-center p-3 bg-[#EDEFEE] rounded-xl border border-[#D4D8D5] shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-white mb-2 overflow-hidden border border-[#D4D8D5] flex items-center justify-center relative group">
            <img
              alt="Medical Facility Logo"
              className="object-cover w-full h-full"
              src={CLINIC_LOGO}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#D08856] border-2 border-white rounded-full"></span>
          </div>

          <div className="flex items-center gap-1.5 justify-center">
            <span className="text-[13px] font-bold text-[#41403C]">{patient.id}</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#FAF2EB] text-[#A65B27] rounded font-bold border border-[#EACAB2]">
              {isDoctor ? 'Patient Record' : 'My Health Profile'}
            </span>
          </div>
          <p className="text-[13px] text-[#41403C] font-semibold mt-0.5">{patient.name}</p>
          <p className="text-[11px] text-[#6F6D68]">{patient.age}y • {patient.gender} • DOB {patient.dob.split('-')[0]}</p>
          
          <div className="mt-2 flex items-center gap-1.5 w-full">
            {isDoctor ? (
              <button
                onClick={() => setIsPatientSwitcherOpen(!isPatientSwitcherOpen)}
                className="flex-1 py-1 px-2 bg-white hover:bg-[#FAF2EB] text-[#41403C] hover:text-[#D08856] rounded-md text-[11px] font-bold transition-colors flex items-center justify-center gap-1 border border-[#D4D8D5] cursor-pointer"
                title="Switch Patient Record"
              >
                <Users className="w-3 h-3" />
                <span>Switch Case</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            ) : (
              <div className="flex-1 py-1 px-2 bg-white text-[#41403C] rounded-md text-[11px] font-bold text-center border border-[#D4D8D5]">
                Active Patient Case
              </div>
            )}
            
            <button
              onClick={() => setActiveTab('input')}
              className="py-1 px-2 bg-white hover:bg-[#FAF2EB] text-[#6F6D68] hover:text-[#41403C] rounded-md text-[11px] font-semibold transition-colors border border-[#D4D8D5] cursor-pointer"
              title="Edit Biomarkers"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Patient Switcher Dropdown for Doctors */}
        {isDoctor && isPatientSwitcherOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-lg border border-[#D4D8D5] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-[10px] font-bold text-[#6F6D68] uppercase px-2 py-1 tracking-wider border-b border-[#D4D8D5] mb-1">
              Select Patient Case
            </div>
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              {SAMPLE_PATIENTS.map((p) => {
                const isSelected = p.id === patient.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (onSelectPatient) onSelectPatient(p);
                      setIsPatientSwitcherOpen(false);
                    }}
                    className={`flex flex-col text-left px-2.5 py-1.5 rounded-lg text-[12px] transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF2EB] text-[#A65B27] font-bold'
                        : 'hover:bg-[#EDEFEE] text-[#6F6D68] hover:text-[#41403C]'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-[10px] font-mono opacity-80">{p.id}</span>
                    </div>
                    <span className="text-[10px] text-[#6F6D68] font-normal truncate">
                      {p.clinicalDiagnoses[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="text-[11px] font-bold text-[#6F6D68] uppercase tracking-wider px-2 pt-1">
        Genomic &amp; Clinical Pages
      </div>

      <nav className="flex flex-col gap-1 text-[13px]">
        {/* 1. Overview Summary */}
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#41403C] text-white font-bold shadow-xs'
              : 'text-[#6F6D68] hover:bg-[#EDEFEE] hover:text-[#41403C]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
            <span>Overview Summary</span>
          </div>
        </button>

        {/* 2. Genetic Risk (PRS) */}
        <button
          onClick={() => setActiveTab('genetic')}
          className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left cursor-pointer ${
            activeTab === 'genetic'
              ? 'bg-[#41403C] text-white font-bold shadow-xs'
              : 'text-[#6F6D68] hover:bg-[#EDEFEE] hover:text-[#41403C]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px]">genetics</span>
            <span>Genetic Risk (PRS)</span>
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            activeTab === 'genetic' ? 'bg-white/20 text-white' : 'bg-[#FDF1EF] text-[#AA210F]'
          }`}>
            92%
          </span>
        </button>

        {/* 3. Modifiable Factors */}
        <button
          onClick={() => setActiveTab('modifiable')}
          className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left cursor-pointer ${
            activeTab === 'modifiable'
              ? 'bg-[#41403C] text-white font-bold shadow-xs'
              : 'text-[#6F6D68] hover:bg-[#EDEFEE] hover:text-[#41403C]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
            <span>Modifiable Factors</span>
          </div>
        </button>

        {/* 4. Prevention Matrix */}
        <button
          onClick={() => setActiveTab('prevention')}
          className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left cursor-pointer ${
            activeTab === 'prevention'
              ? 'bg-[#41403C] text-white font-bold shadow-xs'
              : 'text-[#6F6D68] hover:bg-[#EDEFEE] hover:text-[#41403C]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
            <span>Prevention Matrix</span>
          </div>
        </button>

        {/* 5. Drug Testing Results */}
        <button
          onClick={() => setActiveTab('drug-testing')}
          className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left cursor-pointer ${
            activeTab === 'drug-testing'
              ? 'bg-[#41403C] text-white font-bold shadow-xs'
              : 'text-[#6F6D68] hover:bg-[#EDEFEE] hover:text-[#41403C]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px]">biotech</span>
            <span>Drug Testing Results</span>
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            activeTab === 'drug-testing' ? 'bg-white/20 text-white' : 'bg-[#FAF2EB] text-[#A65B27]'
          }`}>
            PGx
          </span>
        </button>

        <div className="text-[11px] font-bold text-[#6F6D68] uppercase tracking-wider px-2 pt-3 pb-1">
          Clinical Tools &amp; Reports
        </div>

        {/* 6. Health Data Input */}
        <button
          onClick={() => setActiveTab('input')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left cursor-pointer ${
            activeTab === 'input'
              ? 'bg-[#41403C] text-white font-bold shadow-xs'
              : 'text-[#6F6D68] hover:bg-[#EDEFEE] hover:text-[#41403C]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">edit_note</span>
          <span>Health Data Input</span>
        </button>

        {/* 7. Printable Report */}
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-[#41403C] text-white font-bold shadow-xs'
              : 'text-[#6F6D68] hover:bg-[#EDEFEE] hover:text-[#41403C]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">description</span>
          <span>Printable Report</span>
        </button>
      </nav>

      {/* Quick Clinical Action Buttons for Doctors */}
      {isDoctor && (
        <div className="pt-2 flex flex-col gap-1.5">
          {onOrderTest && (
            <button
              onClick={onOrderTest}
              className="w-full py-1.5 px-3 bg-white hover:bg-[#FAF2EB] text-[#D08856] border border-[#EACAB2] rounded-lg text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs active:scale-98 cursor-pointer"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Order Diagnostic Test</span>
            </button>
          )}
          {onReferral && (
            <button
              onClick={onReferral}
              className="w-full py-1.5 px-3 bg-white hover:bg-[#EDEFEE] text-[#6F6D68] hover:text-[#41403C] border border-[#D4D8D5] rounded-lg text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 shadow-2xs active:scale-98 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#D08856]" />
              <span>Refer to Specialist</span>
            </button>
          )}
        </div>
      )}

      {/* Bottom Export, Help & Logout */}
      <div className="mt-auto pt-3 border-t border-[#D4D8D5] flex flex-col gap-2">
        <button
          onClick={onExportReport}
          className="w-full py-2.5 px-3 bg-[#AA210F] text-white rounded-lg text-[13px] font-bold hover:bg-[#8F1A0B] transition-colors flex items-center justify-center gap-2 shadow-xs active:scale-98 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export Full Report
        </button>

        <div className="flex flex-col gap-0.5 text-[12px] text-[#6F6D68]">
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#EDEFEE] hover:text-[#41403C] rounded-md transition-colors text-left font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#D08856]">help</span>
            Help Center &amp; Guides
          </button>
          <button
            onClick={onOpenPrivacy}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#EDEFEE] hover:text-[#41403C] rounded-md transition-colors text-left font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#D08856]">shield_person</span>
            HIPAA &amp; Privacy Policy
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-2 py-1.5 text-[#AA210F] hover:bg-[#FDF1EF] rounded-md transition-colors text-left font-medium mt-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-[#AA210F]" />
              <span>Sign Out / Switch Portal</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
