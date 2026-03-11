import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Menu, 
  Settings, 
  PhoneCall, 
  BookOpen, 
  QrCode, 
  FileText, 
  ListTodo, 
  Wrench,
  ChevronRight,
  ChevronDown,
  Filter,
  Package,
  Layers,
  ShoppingCart,
  Truck
} from 'lucide-react';

type MobileView = 'Menu' | 'Znajdź' | 'Numery bieżące' | 'Numery kontenerów' | 'Listy kontrolne' | 'Serwis';
type AssetType = 'Kontenery' | 'Regały' | 'Trolleye' | 'HSW';

interface AssetConfig {
  label: string;
  singularGenitive: string; // "kontenera" / "regału" etc.
  pluralGenitive: string;   // "kontenerów" / "regałów" etc.
  icon: React.ReactNode;
  color: string;
}

const ASSET_CONFIG: Record<AssetType, AssetConfig> = {
  Kontenery: {
    label: 'Kontenery',
    singularGenitive: 'kontenera',
    pluralGenitive: 'kontenerów',
    icon: <Package size={20} />,
    color: '#2a3b6c',
  },
  Regały: {
    label: 'Regały',
    singularGenitive: 'regału',
    pluralGenitive: 'regałów',
    icon: <Layers size={20} />,
    color: '#1a6c3b',
  },
  Trolleye: {
    label: 'Trolleye',
    singularGenitive: 'trolleya',
    pluralGenitive: 'trolleyów',
    icon: <ShoppingCart size={20} />,
    color: '#6c2a2a',
  },
  HSW: {
    label: 'HSW',
    singularGenitive: 'HSW',
    pluralGenitive: 'HSW',
    icon: <Truck size={20} />,
    color: '#5c3a6c',
  },
};

interface MobileAppProps {
  onClose: () => void;
}

const MobileApp: React.FC<MobileAppProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<MobileView>('Menu');
  const [activeTab, setActiveTab] = useState<'TWORZENIE' | 'EDYCJA'>('TWORZENIE');
  const [selectedAsset, setSelectedAsset] = useState<AssetType>('Kontenery');
  const [assetyExpanded, setAssetyExpanded] = useState(false);

  const asset = ASSET_CONFIG[selectedAsset];

  // ─── Asset Header Banner (shown in non-menu views) ────────────────────────
  const renderAssetHeader = () => (
    <div 
      className="flex items-center px-4 py-2 shrink-0"
      style={{ backgroundColor: asset.color + '15', borderBottom: `2px solid ${asset.color}30` }}
    >
      <span style={{ color: asset.color }} className="mr-2">{asset.icon}</span>
      <span className="text-xs font-bold tracking-wide uppercase" style={{ color: asset.color }}>
        {asset.label}
      </span>
    </div>
  );

  // ─── Top Bar ──────────────────────────────────────────────────────────────
  const renderTopBar = (title: string, showBack: boolean = false) => (
    <div className="flex items-center p-4 bg-white border-b border-gray-200 shrink-0 sticky top-0 z-10">
      {showBack ? (
        <button onClick={() => setCurrentView('Znajdź')} className="mr-4 text-[#1a2b4c]">
          <ChevronLeft size={24} />
        </button>
      ) : (
        <div className="w-6 mr-4" />
      )}
      <h1 className="flex-1 text-center text-lg font-bold text-[#1a2b4c]">{title}</h1>
      {title === 'Numery bieżące' && (
        <button className="ml-4 text-[#1a2b4c]">
          <Filter size={20} />
        </button>
      )}
      {title !== 'Numery bieżące' && <div className="w-6 ml-4" />}
    </div>
  );

  // ─── Bottom Nav ───────────────────────────────────────────────────────────
  const renderBottomNav = () => {
    if (currentView === 'Menu') {
      return (
        <div className="flex bg-white border-t border-gray-200 mt-auto shrink-0 pb-2 pt-2 px-2 justify-between">
          <button className="flex flex-col items-center flex-1 text-gray-400">
            <PhoneCall size={24} className="mb-1" /><span className="text-[10px]">Spatial Call</span>
          </button>
          <button className="flex flex-col items-center flex-1 text-gray-400">
            <BookOpen size={24} className="mb-1" /><span className="text-[10px]">Procedury</span>
          </button>
          <button className="flex flex-col items-center flex-1 text-gray-400">
            <QrCode size={24} className="mb-1" /><span className="text-[10px]">QR</span>
          </button>
          <button className="flex flex-col items-center flex-1 text-gray-400">
            <Settings size={24} className="mb-1" /><span className="text-[10px]">Serwis</span>
          </button>
          <button className="flex flex-col items-center flex-1 text-[#1a2b4c]">
            <Menu size={24} className="mb-1" /><span className="text-[10px] font-bold">Menu</span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex bg-white border-t border-gray-200 mt-auto shrink-0 pb-2 pt-2 px-1 justify-between">
        {[
          { id: 'Znajdź', icon: <Search size={22} />, label: 'Znajdź' },
          { id: 'Numery bieżące', icon: <FileText size={22} />, label: 'Numery\nbieżące' },
          { id: 'Numery kontenerów', icon: <ListTodo size={22} />, label: `Numery\n${asset.pluralGenitive}` },
          { id: 'Listy kontrolne', icon: <BookOpen size={22} />, label: 'Listy\nkontrolne' },
          { id: 'Serwis', icon: <Wrench size={22} />, label: 'Serwis' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setCurrentView(item.id as MobileView)}
            className={`flex flex-col items-center flex-1 whitespace-pre-line text-center ${currentView === item.id ? 'text-[#1a2b4c]' : 'text-gray-400'}`}
          >
            <div className={`mb-1 ${currentView === item.id ? 'font-bold' : ''}`}>{item.icon}</div>
            <span className={`text-[10px] leading-tight ${currentView === item.id ? 'font-bold' : ''}`}>{item.label}</span>
            {currentView === item.id && <div className="w-10 h-0.5 bg-[#1a2b4c] mt-1 rounded-t" />}
          </button>
        ))}
      </div>
    );
  };

  // ─── Menu View ────────────────────────────────────────────────────────────
  const renderMenu = () => (
    <div className="flex flex-col h-full bg-white text-gray-800">
      {renderTopBar('Menu')}
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-4 text-lg">
          TWA
        </div>
        <div>
          <div className="text-sm font-semibold text-[#1a2b4c]">Tomasz Woźniak Apzumi</div>
          <div className="text-xs text-gray-500">tomasz.wozniak@apzumi.pl</div>
          <div className="text-xs text-gray-500">Serwer: spatial-dev.apzumi.pl</div>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Przestrzeń */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 cursor-default opacity-50">
          <span className="text-[#1a2b4c] font-medium text-[15px]">Przestrzeń: Adamowe</span>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

        {/* Assety — expandable */}
        <div>
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
            onClick={() => setAssetyExpanded(prev => !prev)}
          >
            <span className="text-[#1a2b4c] font-medium text-[15px]">Assety</span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${assetyExpanded ? 'rotate-180' : ''}`} />
          </div>

          {assetyExpanded && (
            <div className="bg-gray-50 border-b border-gray-100">
              {(Object.keys(ASSET_CONFIG) as AssetType[]).map(type => (
                <div
                  key={type}
                  className={`flex items-center px-6 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${selectedAsset === type ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setSelectedAsset(type);
                    setAssetyExpanded(false);
                    setCurrentView('Znajdź');
                  }}
                >
                  <span className="mr-3" style={{ color: ASSET_CONFIG[type].color }}>
                    {ASSET_CONFIG[type].icon}
                  </span>
                  <span className={`text-sm flex-1 ${selectedAsset === type ? 'font-bold text-[#1a2b4c]' : 'text-gray-700'}`}>
                    {ASSET_CONFIG[type].label}
                  </span>
                  {selectedAsset === type && (
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ASSET_CONFIG[type].color }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Other non-clickable menu items */}
        {['Czyszczenie linii', 'Wizualizacje', 'Zmień rozdzielczość wideo', 'Wyloguj'].map((label, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-100 cursor-default opacity-50">
            <span className="text-[#1a2b4c] font-medium text-[15px]">{label}</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Znajdź View ──────────────────────────────────────────────────────────
  const renderZnajdz = () => (
    <div className="flex flex-col h-full bg-white relative">
      {renderTopBar('Znajdź', false)}
      {renderAssetHeader()}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
        <button className="w-full bg-[#2a3b6c] text-white py-4 px-4 rounded shadow flex items-center justify-center text-lg font-bold tracking-wide">
          <QrCode className="mr-3" size={24} />
          ZNAJDŹ WEDŁUG QR
        </button>
        <button className="w-full bg-[#2a3b6c] text-white py-4 px-4 rounded shadow flex items-center justify-center text-lg font-bold tracking-wide">
          <ListTodo className="mr-3" size={24} />
          ZNAJDŹ WEDŁUG TYPU
        </button>
      </div>
    </div>
  );

  // ─── Search Input ────────────────────────────────────────────────────────
  const SearchInput = () => (
    <div className="p-3 bg-white shrink-0 border-b border-gray-100">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Szukaj według numeru lub nazwy" 
          className="w-full bg-gray-100 border-none rounded-sm py-2 pl-10 pr-4 text-sm text-gray-700 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>
  );

  // ─── Numery Bieżące ───────────────────────────────────────────────────────
  const renderNumeryBiezace = () => (
    <div className="flex flex-col h-full bg-white relative">
      {renderTopBar('Numery bieżące', true)}
      {renderAssetHeader()}
      <SearchInput />
      <div className="flex-1 overflow-y-auto">
        {[963, 964, 965].map(id => (
          <div key={id} className="p-4 border-b border-gray-200 text-sm">
            <div className="flex justify-between mb-2">
              <div className="w-1/2">
                <div className="text-gray-500 text-xs mb-1">Numer {asset.singularGenitive}</div>
                <div className="text-[#1a2b4c] font-medium text-lg">40</div>
              </div>
              <div className="w-1/2">
                <div className="text-gray-500 text-xs mb-1">Nazwa {asset.singularGenitive}</div>
                <div className="text-[#1a2b4c] font-medium text-lg">3</div>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="w-1/2">
                <div className="text-gray-500 text-xs mb-1">Status</div>
                <div className="text-green-600 font-bold">W użyciu</div>
              </div>
              <div className="w-1/2">
                <div className="text-gray-500 text-xs mb-1">Następna weryfikacja</div>
                <div className="text-red-600 font-medium">2021-01-20</div>
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-xs mb-1">Lokalizacja</div>
              <div className="text-[#1a2b4c] font-medium text-base">Gestamp Działkowców {id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Numery Kontenerów ────────────────────────────────────────────────────
  const renderNumeryKontenerow = () => (
    <div className="flex flex-col h-full bg-white relative">
      {renderTopBar(`Numery ${asset.pluralGenitive}`, true)}
      {renderAssetHeader()}
      <SearchInput />
      <div className="flex-1 overflow-y-auto">
       {[
         { kNumer: '5', nazwa: '2', zNumer: '77238938', proto: '0', curr: '180', total: '180' },
         { kNumer: '6', nazwa: '8', zNumer: 'Brak', proto: '0', curr: '230', total: '230' },
         { kNumer: '7', nazwa: '154', zNumer: '123', proto: '0', curr: '237', total: '237' },
         { kNumer: '1', nazwa: '1', zNumer: 'Brak', proto: '0', curr: '0', total: '0' }
       ].map((item, id) => (
          <div key={id} className="p-4 border-b border-gray-200 text-sm">
            <div className="flex justify-between mb-3">
              <div className="w-1/3">
                <div className="text-gray-500 text-[11px] mb-1 leading-tight">Numer {asset.singularGenitive}</div>
                <div className="text-[#1a2b4c] font-medium text-lg">{item.kNumer}</div>
              </div>
              <div className="w-1/3">
                <div className="text-gray-500 text-[11px] mb-1 leading-tight">Nazwa {asset.singularGenitive}</div>
                <div className="text-[#1a2b4c] font-medium text-lg">{item.nazwa}</div>
              </div>
              <div className="w-1/3">
                <div className="text-gray-500 text-[11px] mb-1 leading-tight">Numer zamówienia</div>
                <div className="text-[#1a2b4c] font-medium text-base">{item.zNumer}</div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-1/3">
                <div className="text-gray-500 text-[11px] mb-1">Prototypy</div>
                <div className="text-[#1a2b4c] font-medium text-base">{item.proto}</div>
              </div>
              <div className="w-1/3">
                <div className="text-gray-500 text-[11px] mb-1">Numery bieżące</div>
                <div className="text-[#1a2b4c] font-medium text-base">{item.curr}</div>
              </div>
              <div className="w-1/3">
                <div className="text-gray-500 text-[11px] mb-1">Razem</div>
                <div className="text-[#1a2b4c] font-medium text-base">{item.total}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Listy Kontrolne ──────────────────────────────────────────────────────
  const renderListyKontrolne = () => (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex pt-4 bg-white border-b-2 border-gray-100 text-sm font-bold shadow-sm z-10 shrink-0">
        <div 
          onClick={() => setActiveTab('TWORZENIE')}
          className={`flex-1 text-center pb-3 cursor-pointer ${activeTab === 'TWORZENIE' ? 'border-b-2 border-[#1a2b4c] text-[#1a2b4c]' : 'text-gray-500'}`}
        >
          TWORZENIE
        </div>
        <div 
          onClick={() => setActiveTab('EDYCJA')}
          className={`flex-1 text-center pb-3 cursor-pointer ${activeTab === 'EDYCJA' ? 'border-b-2 border-[#1a2b4c] text-[#1a2b4c]' : 'text-gray-500'}`}
        >
          EDYCJA
        </div>
      </div>
      {renderAssetHeader()}
      <SearchInput />
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 text-sm">
           <span className="text-gray-500">1 krok</span>
           <div className="flex items-center space-x-2">
              <span className="text-red-600 font-bold">Niezapisane zmiany</span>
              <ChevronRight size={16} className="text-[#1a2b4c]" />
           </div>
        </div>
      </div>
      <div className="p-4 bg-white shrink-0 border-t border-gray-100">
         <button className="w-full bg-[#2a3b6c] text-white py-3 rounded text-base font-bold tracking-wide flex justify-center items-center shadow-md">
            + DODAJ LISTĘ KONTROLNĄ
         </button>
      </div>
    </div>
  );

  // ─── Router ───────────────────────────────────────────────────────────────
  const renderCurrentView = () => {
    switch (currentView) {
      case 'Menu': return renderMenu();
      case 'Znajdź': return renderZnajdz();
      case 'Numery bieżące': return renderNumeryBiezace();
      case 'Numery kontenerów': return renderNumeryKontenerow();
      case 'Listy kontrolne': return renderListyKontrolne();
      case 'Serwis': return (
        <div className="flex flex-col h-full">
          {renderTopBar('Serwis', true)}
          {renderAssetHeader()}
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Brak danych serwisowych</div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Mobile Device Container */}
      <div className="relative bg-white w-full max-w-[400px] h-full max-h-[850px] rounded-3xl overflow-hidden shadow-2xl flex flex-col border-[8px] border-gray-900 shadow-black/50">
        
        {/* Mock Status Bar */}
        <div className="h-6 bg-[#1a2b4c] w-full flex items-center justify-between px-4 shrink-0 shadow-sm relative z-20">
          <div className="text-white text-[10px] font-medium leading-none">9:33</div>
          <div className="flex space-x-1 items-center">
             <div className="text-white text-[8px] border border-white/50 px-1 rounded-sm leading-none py-[1px]">31</div>
             <span className="text-white text-[10px] tracking-widest leading-none">...</span>
          </div>
          <div className="flex space-x-1.5 items-center opacity-90">
             <div className="flex items-end space-x-[1px] h-2.5">
               <div className="w-[1.5px] h-1 bg-white"></div>
               <div className="w-[1.5px] h-1.5 bg-white"></div>
               <div className="w-[1.5px] h-2 bg-white"></div>
               <div className="w-[1.5px] h-2.5 bg-white/40"></div>
             </div>
             <div className="relative">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
             </div>
             <div className="flex items-center border border-white/50 rounded-sm px-1 py-[1px]">
                <span className="text-white text-[8px] leading-none">96</span>
             </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden relative bg-gray-50">
           {renderCurrentView()}
        </div>

        {/* Bottom Navigation */}
        {renderBottomNav()}

        {/* Mock Android Navigation Bar */}
        <div className="h-8 bg-black w-full shrink-0 flex items-center justify-around opacity-80 z-20">
           <div className="w-3 h-3 border-2 border-white/50 rounded-sm opacity-80 cursor-pointer" onClick={() => {}} />
           <div className="w-3 h-3 border-2 border-white/50 rounded-full opacity-80 cursor-pointer" onClick={() => {}} />
           <div className="w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white/50 border-b-8 border-b-transparent opacity-80 cursor-pointer" onClick={onClose} />
        </div>

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute -right-12 -top-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur transition-all shadow-lg border border-white/20 z-50"
          title="Zamknij aplikację mobilną"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MobileApp;
