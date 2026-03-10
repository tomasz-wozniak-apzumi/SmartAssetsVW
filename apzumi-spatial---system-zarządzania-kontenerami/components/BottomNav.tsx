import React from 'react';
import { Home } from 'lucide-react';
import { ViewType } from '../types';

interface BottomNavProps {
  currentView: ViewType;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView }) => {
  // In a real state management system, we would check isAddingAsset here.
  // For this prototype, we'll assume it's part of the context or we can use a simpler approach.
  // Since we don't have global state for the form, we keep it simple.
  
  return (
    <footer className="h-12 border-t border-gray-200 bg-[#f8f9fa] flex items-center px-0 shrink-0">
      <div className="flex items-stretch h-full">
        <div className="flex items-center justify-center w-14 border-r border-gray-200 hover:bg-gray-100 cursor-pointer text-gray-600 transition-colors">
          <div className="p-1.5 border border-gray-300 rounded shadow-sm bg-white">
            <Home size={18} strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex items-center px-6 border-r border-gray-200 bg-[#f4f7f9] text-[11px] font-bold text-gray-400 uppercase tracking-tight">
          Assety
        </div>
        <div className="flex items-center px-6 bg-white text-[#007bff] text-[11px] font-bold uppercase border-t-2 border-[#007bff] -mt-[1px] shadow-[inset_0px_1px_0px_white]">
          {currentView}
        </div>
      </div>
    </footer>
  );
};

export default BottomNav;
