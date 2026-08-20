import React from 'react';
import { ActiveTab, ConditionId, PatientData, AuthUser } from '../types';
import { User, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCondition: ConditionId;
  setSelectedCondition: (cond: ConditionId) => void;
  patient: PatientData;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCondition,
  setSelectedCondition,
  patient,
  onOpenNotifications,
  unreadNotificationsCount,
  currentUser,
  onLogout,
}) => {
  const isDoctor = currentUser?.role === 'doctor';

  return (
    <header className="bg-white border-b border-[#D4D8D5] sticky top-0 z-50 shadow-2xs font-['Roboto',sans-serif]">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 h-16 max-w-[1280px] mx-auto">
        {/* Left Branding */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#41403C] flex items-center justify-center text-white shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[20px] text-[#D08856]">biotech</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] sm:text-[18px] font-bold text-[#41403C] tracking-tight leading-none group-hover:text-[#AA210F] transition-colors">
                BioPulse Diagnostics
              </span>
              <span className="text-[10px] font-medium text-[#6F6D68] tracking-wide mt-0.5">
                {isDoctor ? 'Clinician Decision Core' : 'Patient Genomics Portal'}
              </span>
            </div>
          </button>

          {/* Quick Tab Links for Top Bar */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'text-[#41403C] bg-[#EDEFEE] font-bold border border-[#D4D8D5]'
                  : 'text-[#6F6D68] hover:text-[#41403C] hover:bg-[#EDEFEE]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('genetic')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'genetic'
                  ? 'text-[#41403C] bg-[#EDEFEE] font-bold border border-[#D4D8D5]'
                  : 'text-[#6F6D68] hover:text-[#41403C] hover:bg-[#EDEFEE]'
              }`}
            >
              Genetic Risk
            </button>
            <button
              onClick={() => setActiveTab('modifiable')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'modifiable'
                  ? 'text-[#41403C] bg-[#EDEFEE] font-bold border border-[#D4D8D5]'
                  : 'text-[#6F6D68] hover:text-[#41403C] hover:bg-[#EDEFEE]'
              }`}
            >
              Modifiable
            </button>
            <button
              onClick={() => setActiveTab('prevention')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'prevention'
                  ? 'text-[#41403C] bg-[#EDEFEE] font-bold border border-[#D4D8D5]'
                  : 'text-[#6F6D68] hover:text-[#41403C] hover:bg-[#EDEFEE]'
              }`}
            >
              Prevention
            </button>
            <button
              onClick={() => setActiveTab('drug-testing')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'drug-testing'
                  ? 'text-[#41403C] bg-[#EDEFEE] font-bold border border-[#D4D8D5]'
                  : 'text-[#6F6D68] hover:text-[#41403C] hover:bg-[#EDEFEE]'
              }`}
            >
              Drug Testing Results
            </button>
          </nav>
        </div>

        {/* Right Section: Condition Selector, Notifications, User Avatar & Role Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Condition Selector */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#EDEFEE] px-2.5 py-1 rounded-lg border border-[#D4D8D5] text-xs">
            <span className="text-[#6F6D68] font-semibold">Condition:</span>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value as ConditionId)}
              className="bg-transparent font-semibold text-[#41403C] outline-none cursor-pointer pr-1"
            >
              <option value="cad">CAD (Heart Disease)</option>
              <option value="t2d">T2D (Diabetes)</option>
              <option value="alzheimers">Alzheimer's / ApoE4</option>
            </select>
          </div>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            aria-label="notifications"
            className="relative p-2 text-[#6F6D68] hover:text-[#AA210F] transition-colors rounded-full hover:bg-[#EDEFEE] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#AA210F] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* User Profile & Role Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#D4D8D5]">
            <div className="w-8 h-8 rounded-full bg-[#EDEFEE] overflow-hidden border border-[#D4D8D5] shrink-0 flex items-center justify-center">
              {currentUser?.avatarUrl ? (
                <img
                  alt={currentUser.name}
                  className="object-cover w-full h-full"
                  src={currentUser.avatarUrl}
                />
              ) : (
                <User className="w-4 h-4 text-[#41403C]" />
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[12px] font-bold text-[#41403C] leading-tight truncate max-w-[130px]">
                {currentUser?.name || (isDoctor ? 'Dr. Julian Vance' : patient.name)}
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded w-fit ${
                isDoctor ? 'bg-[#AA210F] text-white' : 'bg-[#FAF2EB] text-[#A65B27] border border-[#EACAB2]'
              }`}>
                {isDoctor ? 'Doctor Portal' : 'Patient Portal'}
              </span>
            </div>

            {/* Logout / Switch Role button */}
            {onLogout && (
              <button
                onClick={onLogout}
                title="Switch Portal / Sign Out"
                className="p-1.5 text-[#6F6D68] hover:text-[#AA210F] hover:bg-[#FDF1EF] rounded-lg transition-colors ml-1 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
