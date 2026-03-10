import React from 'react';
import { MENU_ITEMS } from '../constants';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <aside className="w-64 bg-[#f8f9fa] border-r border-gray-200 flex flex-col h-screen overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="p-4 flex items-center space-x-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1">
             <div className="w-6 h-6 flex flex-col space-y-[2px] justify-center">
                <div className="h-[2px] w-full bg-[#cc0000]"></div>
                <div className="h-[2px] w-3/4 bg-[#cc0000]"></div>
                <div className="h-[2px] w-1/2 bg-[#cc0000]"></div>
             </div>
             <div className="flex flex-col -space-y-1">
                <span className="font-bold text-gray-800 text-xl tracking-tighter">apzumi</span>
                <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase text-right">spatial</span>
             </div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-4 mb-2">
        <div className="flex items-center justify-between p-2 border border-gray-200 rounded bg-white text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="truncate max-w-[140px]">
              <p className="font-medium text-gray-700">Tomasz NGK demo Woźniak</p>
              <p className="text-[10px] text-gray-400">tomasz.wozniak.mosina+ngk@...</p>
            </div>
          </div>
          <ChevronDown size={12} />
        </div>
      </div>

      {/* Project Selector */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between p-2 border border-gray-200 rounded bg-white text-xs text-gray-700">
           <span>NGK demo</span>
           <ChevronDown size={12} />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1">
        {MENU_ITEMS.map((item, idx) => (
          <div key={idx}>
            <div 
              className={`flex items-center px-4 py-2 cursor-pointer transition-colors group ${
                item.active ? 'bg-[#007bff] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="flex-1 text-sm font-medium">{item.title}</span>
              {item.subItems ? (
                <ChevronDown size={14} className={`${item.expanded ? 'rotate-180' : ''} transition-transform opacity-60`} />
              ) : (
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-40" />
              )}
            </div>
            
            {item.subItems && item.expanded && (
              <div className="bg-[#f0f2f5] py-1">
                {item.subItems.map((sub, subIdx) => {
                  const isCurrentView = currentView === sub;
                  const availableViews = ['Dane podstawowe', 'Numery bieżące', 'Lokalizacje', 'Serwis', 'Checklisty', 'Zdarzenia'];
                  return (
                    <div 
                      key={subIdx} 
                      onClick={() => availableViews.includes(sub) && onViewChange(sub as ViewType)}
                      className={`pl-12 pr-4 py-2 text-sm cursor-pointer transition-colors ${
                        isCurrentView ? 'text-[#007bff] font-semibold' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {sub}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer / Flags */}
      <div className="p-4 flex items-center justify-center space-x-3 mt-auto">
         <img src="https://flagcdn.com/w20/us.png" alt="USA" className="w-4 h-2.5 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 cursor-pointer" />
         <img src="https://flagcdn.com/w20/pl.png" alt="PL" className="w-4 h-2.5 cursor-pointer shadow-sm" />
         <img src="https://flagcdn.com/w20/de.png" alt="DE" className="w-4 h-2.5 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 cursor-pointer" />
      </div>
    </aside>
  );
};

export default Sidebar;