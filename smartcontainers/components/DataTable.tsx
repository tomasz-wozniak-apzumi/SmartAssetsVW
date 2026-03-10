import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Plus, Box, ClipboardCheck, LayoutGrid, ChevronDown, Settings, CheckSquare, History, X, Save, Folder, Upload } from 'lucide-react';
import { MOCK_CONTAINERS, MOCK_CURRENT_NUMBERS, MOCK_LOCATIONS, MOCK_SERVICES, MOCK_CHECKLISTS, MOCK_EVENTS } from '../constants';
import { ViewType, ContainerData } from '../types';

// New Components
import FilterBar from './FilterBar';
import TableSidebar from './TableSidebar';
import CurrentNumberPreview from './CurrentNumberPreview';

interface DataTableProps {
  view: ViewType;
}

const DataTable: React.FC<DataTableProps> = ({ view }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedContainer, setSelectedContainer] = useState<ContainerData | null>(null);
  const [selectedCurrentNumber, setSelectedCurrentNumber] = useState<any | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingContainer, setIsAddingContainer] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  // Form states for new container
  const [newContainerData, setNewContainerData] = useState({
    number: '',
    name: '',
    orderNumber: '',
    project: '',
    verificationPeriod: '',
    type: 'MANUAL',
    emails: ''
  });

  // Reset states when view changes
  useEffect(() => {
    setIsAddingItem(false);
    setIsAddingContainer(false);
    setNewItemName('');
    setSelectedContainer(null);
    setSelectedCurrentNumber(null);
    setIsPreviewing(false);
  }, [view]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? '' : value
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const handleSave = () => {
    if (isAddingContainer) {
      console.log('Saving container:', newContainerData);
      setIsAddingContainer(false);
    } else if (isAddingItem) {
      if (!newItemName.trim()) return;
      setIsAddingItem(false);
      setNewItemName('');
    }
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '') || searchTerm !== '';

  const filteredContainers = useMemo(() => {
    return MOCK_CONTAINERS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.number.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm]);

  const filteredCurrentNumbers = useMemo(() => {
    return MOCK_CURRENT_NUMBERS.filter(item => {
      const matchesSearch = item.containerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.currentNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesNumber = !filters['number'] || item.containerNumber === filters['number'];
      const matchesStatus = !filters['status'] || item.status === filters['status'];
      const matchesType = !filters['type'] || (item.type === 'Manualny' ? 'MANUAL' : 'AUTOMATIC') === filters['type'];
      const matchesLocation = !filters['location'] || item.location === filters['location'];
      const matchesVerification = !filters['verification'] || item.nextVerification === filters['verification'];

      return matchesSearch && matchesNumber && matchesStatus && matchesType && matchesLocation && matchesVerification;
    });
  }, [searchTerm, filters]);

  const renderHeader = () => {
    if (isAddingContainer || (isAddingItem && view === 'Zdarzenia')) {
      const title = isAddingContainer ? 'Nowy numer kontenera' : 'Dodawanie zdarzenia';
      const Icon = isAddingContainer ? Box : History;
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-800">
             <Icon size={24} strokeWidth={1.5} />
             <h1 className="text-lg font-bold">{title}</h1>
          </div>
          <div className="flex items-center space-x-3">
             <button onClick={handleSave} className="flex items-center px-8 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">ZAPISZ</button>
             <button onClick={() => { setIsAddingContainer(false); setIsAddingItem(false); }} className="flex items-center px-8 py-2 border border-[#007bff] text-[#007bff] rounded text-xs font-bold hover:bg-blue-50 transition-all shadow-sm">ANULUJ</button>
          </div>
        </div>
      );
    }

    const commonActions = (view: ViewType) => {
      const btnStyle = "flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm";
      switch (view) {
        case 'Dane podstawowe':
          return (
            <div className="flex items-center space-x-2">
               <button className={btnStyle}><Download size={14} className="mr-2" />EKSPORTUJ DO CSV</button>
               <button onClick={() => setIsAddingContainer(true)} className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />NOWY NUMER KONTENERA</button>
            </div>
          );
        case 'Numery bieżące':
          return (
            <div className="flex items-center space-x-2">
               <button className={btnStyle}><Download size={14} className="mr-2" />KONTROLE - EKSPORT</button>
               <button className={btnStyle}><Download size={14} className="mr-2" />EKSPORTUJ DO CSV</button>
               <button className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />WCZYTAJ NUMER BIEŻĄCY</button>
            </div>
          );
        // ... rest of cases for simplicity
        default: return null;
      }
    };

    const iconMap: Record<string, React.ReactNode> = {
      'Dane podstawowe': <Box size={24} strokeWidth={1.5} />,
      'Numery bieżące': <ClipboardCheck size={24} strokeWidth={1.5} />,
      'Lokalizacje': <LayoutGrid size={24} strokeWidth={1.5} />,
      'Serwis': <Settings size={24} strokeWidth={1.5} />,
      'Checklisty': <CheckSquare size={24} strokeWidth={1.5} />,
      'Zdarzenia': <History size={24} strokeWidth={1.5} />
    };

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-800">
           {iconMap[view]}
           <h1 className="text-lg font-bold">{view}</h1>
        </div>
        {commonActions(view)}
      </div>
    );
  };

  const renderTable = () => {
    switch (view) {
      case 'Dane podstawowe':
        return (
          <table className="min-w-full text-[13px] text-gray-700">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Numer kontenera</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Nazwa kontenera</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">Okres weryfikacji</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Projekt</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Typ kontenera</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Numer zamówienia</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">Prototypy</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">Numery bieżące</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">Razem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredContainers.map((item) => (
                <tr key={item.id} className={`hover:bg-blue-50/50 cursor-pointer ${selectedContainer?.id === item.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedContainer(item)}>
                  <td className="px-4 py-3 font-medium text-[#007bff]">{item.number}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-center">{item.verificationPeriod} dni</td>
                  <td className="px-4 py-3">{item.project}</td>
                  <td className="px-4 py-3 uppercase text-[11px] font-bold text-gray-500">{item.type === 'MANUAL' ? 'Manualny' : 'Automatyczny'}</td>
                  <td className="px-4 py-3">{item.orderNumber}</td>
                  <td className="px-4 py-3 text-center">{item.prototypes}</td>
                  <td className="px-4 py-3 text-center">{item.currentNumbers}</td>
                  <td className="px-4 py-3 text-center font-semibold">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Numery bieżące':
        return (
          <table className="min-w-full text-[13px] text-gray-700">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Numer kontenera</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Numer bieżący</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Nazwa kontenera</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Typ kontenera</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Wersja</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Kod QR</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Następna weryfikacja</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Właściciel</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Producent</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Lokalizacja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCurrentNumbers.map((item) => (
                <tr key={item.id} className={`hover:bg-blue-50/50 cursor-pointer ${selectedCurrentNumber?.id === item.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedCurrentNumber(item)}>
                  <td className="px-4 py-3 font-medium text-[#007bff]">{item.containerNumber}</td>
                   <td className="px-4 py-3">{item.currentNumber}</td>
                   <td className="px-4 py-3">{item.containerName}</td>
                   <td className="px-4 py-3">
                     <span className={`font-semibold ${item.status === 'Warunkowo dopuszczony' ? 'text-orange-500' : 'text-green-600'}`}>{item.status}</span>
                   </td>
                   <td className="px-4 py-3">{item.type}</td>
                   <td className="px-4 py-3">{item.version}</td>
                   <td className="px-4 py-3 text-gray-400 font-mono text-[10px] uppercase">{item.qrCode}</td>
                   <td className="px-4 py-3">{item.nextVerification}</td>
                   <td className="px-4 py-3">{item.owner}</td>
                   <td className="px-4 py-3">{item.producer}</td>
                   <td className="px-4 py-3">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default: return null;
    }
  };

  const getCountText = () => {
    const len = view === 'Dane podstawowe' ? filteredContainers.length : filteredCurrentNumbers.length;
    return `${len} elementów (${Math.ceil(len/10)} stron)`;
  };

  return (
    <div className="flex flex-1 overflow-hidden relative bg-white">
      {isPreviewing && selectedCurrentNumber && (
        <CurrentNumberPreview data={selectedCurrentNumber} onClose={() => setIsPreviewing(false)} />
      )}

      <div className={`flex flex-col flex-1 p-4 md:p-6 space-y-4 overflow-hidden bg-white transition-all duration-300 ${(selectedContainer || selectedCurrentNumber) ? 'mr-72' : ''}`}>
        {renderHeader()}

        {!isAddingContainer && !isAddingItem && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <FilterBar 
                view={view} 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                onClearFilters={clearFilters} 
                hasActiveFilters={hasActiveFilters}
                mockData={{
                  containerNumbers: Array.from(new Set(MOCK_CONTAINERS.map(a => a.number))),
                  statuses: Array.from(new Set(MOCK_CURRENT_NUMBERS.map(a => a.status))),
                  locations: Array.from(new Set(MOCK_CURRENT_NUMBERS.map(a => a.location))),
                  verifications: Array.from(new Set(MOCK_CURRENT_NUMBERS.map(a => a.nextVerification))),
                }}
              />
              <div className="relative w-64 group ml-4 shrink-0 self-start">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-1.5 border border-gray-200 rounded-md text-xs placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Szukaj..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
            </div>

            <div className="flex-1 overflow-auto border border-gray-100 rounded">
              {renderTable()}
            </div>

            {/* Pagination Mock */}
            <div className="flex items-center justify-between text-xs text-gray-500 py-2 shrink-0">
              <span>Pokazywane 1 do 10 z {getCountText()}.</span>
              <div className="flex items-center bg-[#f0f2f5] rounded overflow-hidden">
                <button className="p-2 hover:bg-gray-200 text-gray-400"><ChevronsLeft size={14} /></button>
                <button className="p-2 hover:bg-gray-200 text-gray-400"><ChevronLeft size={14} /></button>
                <button className="px-4 py-2 bg-white text-[#007bff] font-bold border-x border-gray-200">1</button>
                <button className="p-2 hover:bg-gray-200 text-gray-400"><ChevronRight size={14} /></button>
                <button className="p-2 hover:bg-gray-200 text-gray-400"><ChevronsRight size={14} /></button>
              </div>
            </div>
          </div>
        )}

        {isAddingContainer && (
           <div className="flex-1 py-4">
             <h2 className="text-sm font-bold mb-4">Formularz dodawania (uproszczony w tym widoku)</h2>
             <button onClick={() => setIsAddingContainer(false)} className="px-4 py-2 border border-gray-300 rounded">Powrót</button>
           </div>
        )}
      </div>

      <TableSidebar 
        view={view}
        selectedContainer={selectedContainer}
        selectedCurrentNumber={selectedCurrentNumber}
        onCloseContainer={() => setSelectedContainer(null)}
        onCloseCurrentNumber={() => setSelectedCurrentNumber(null)}
        onPreviewCurrentNumber={() => setIsPreviewing(true)}
        onOpenModal={() => setIsModalOpen(true)}
      />
    </div>
  );
};

export default DataTable;