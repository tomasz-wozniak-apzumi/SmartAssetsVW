import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DataTable from './components/DataTable';
import BottomNav from './components/BottomNav';
import { ViewType, AssetType } from './types';
import { ASSET_CONFIG } from './constants';
import { ChevronDown, Download } from 'lucide-react';

const App: React.FC = () => {
  const [currentAsset, setCurrentAsset] = useState<AssetType>('Kontenery');
  const [currentView, setCurrentView] = useState<ViewType>('Dane podstawowe');

  const handleAssetChange = (newAsset: AssetType) => {
    setCurrentAsset(newAsset);
    const config = ASSET_CONFIG[newAsset];
    if (!config.modules.includes(currentView)) {
      setCurrentView(config.defaultModule);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-800">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} currentAsset={currentAsset} />
      <main className="flex-1 flex flex-col min-w-0 bg-white z-10">
        <div className="bg-white border-b border-gray-100 p-4 shrink-0">
          <div className="text-[11px] text-gray-400 mb-6 font-bold tracking-wide">
            Assety / <span className="text-[#007bff]">{currentAsset}</span> / <span className="text-gray-600">{currentView}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 pr-4">
                <label className="text-sm font-bold text-gray-800">Asset:</label>
                <div className="relative w-48">
                    <select 
                       value={currentAsset}
                       onChange={(e) => handleAssetChange(e.target.value as AssetType)}
                       className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none outline-none font-semibold shadow-sm"
                    >
                        {(Object.keys(ASSET_CONFIG) as AssetType[]).map(asset => (
                            <option key={asset} value={asset}>{asset}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <ChevronDown size={14} />
                    </div>
                </div>
            </div>
            
            <div className="flex items-center space-x-2">
                <div className="relative w-64 mr-2 group">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </span>
                    <input
                       type="text"
                       className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                       placeholder="Szukaj..."
                    />
                </div>
                <button className="flex items-center px-4 py-2 bg-[#007bff] text-white rounded text-xs font-bold shadow-sm hover:bg-blue-600 transition-all">
                   <Download size={14} className="mr-2" />
                   EKSPORTUJ DO CSV
                   <span className="ml-3 pl-3 border-l border-white/20">
                      <ChevronDown size={14} />
                   </span>
                </button>
            </div>
          </div>

          <div className="flex space-x-8 text-sm font-semibold mt-4">
             {ASSET_CONFIG[currentAsset].modules.map(module => (
                 <button
                    key={module}
                    onClick={() => setCurrentView(module)}
                    className={`pb-3 border-b-2 transition-all ${currentView === module ? 'border-[#007bff] text-[#007bff]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                 >
                    {module}
                 </button>
             ))}
          </div>
        </div>

        <DataTable 
          view={currentView} 
          currentAsset={currentAsset}
        />
        <BottomNav currentView={currentView} />
      </main>
    </div>
  );
};

export default App;