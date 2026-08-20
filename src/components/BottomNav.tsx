import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="md:hidden bg-white fixed bottom-0 left-0 w-full z-50 h-16 border-t border-[#D4D8D5] shadow-[0_-2px_10px_rgba(0,0,0,0.03)] pb-safe font-['Roboto',sans-serif]">
      <div className="flex justify-around items-center px-1 w-full h-full">
        {/* Dashboard Overview */}
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#EDEFEE] text-[#41403C] font-bold shadow-2xs border border-[#D4D8D5]'
              : 'text-[#6F6D68] hover:text-[#41403C]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          <span className="text-[10px] tracking-tight mt-0.5">Overview</span>
        </button>

        {/* Genetic Risk */}
        <button
          onClick={() => setActiveTab('genetic')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'genetic'
              ? 'bg-[#EDEFEE] text-[#41403C] font-bold shadow-2xs border border-[#D4D8D5]'
              : 'text-[#6F6D68] hover:text-[#41403C]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">genetics</span>
          <span className="text-[10px] tracking-tight mt-0.5">Genetics</span>
        </button>

        {/* Drug Testing */}
        <button
          onClick={() => setActiveTab('drug-testing')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'drug-testing'
              ? 'bg-[#41403C] text-white font-bold shadow-2xs'
              : 'text-[#6F6D68] hover:text-[#41403C]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">biotech</span>
          <span className="text-[10px] tracking-tight mt-0.5">Drug Tests</span>
        </button>

        {/* Prevention */}
        <button
          onClick={() => setActiveTab('prevention')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'prevention'
              ? 'bg-[#EDEFEE] text-[#41403C] font-bold shadow-2xs border border-[#D4D8D5]'
              : 'text-[#6F6D68] hover:text-[#41403C]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">grid_view</span>
          <span className="text-[10px] tracking-tight mt-0.5">Prevention</span>
        </button>

        {/* Reports */}
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-[#EDEFEE] text-[#41403C] font-bold shadow-2xs border border-[#D4D8D5]'
              : 'text-[#6F6D68] hover:text-[#41403C]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">description</span>
          <span className="text-[10px] tracking-tight mt-0.5">Report</span>
        </button>
      </div>
    </nav>
  );
};
