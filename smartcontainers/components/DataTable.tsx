import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Plus, Box, ClipboardCheck, LayoutGrid, ChevronDown, Settings, CheckSquare, History, X, Eye, List, FilePlus, Edit2, Trash2, Upload, FileDown, Folder, Tag, Factory } from 'lucide-react';
import { MOCK_CONTAINERS, MOCK_CURRENT_NUMBERS, MOCK_LOCATIONS, MOCK_SERVICES, MOCK_CHECKLISTS, MOCK_EVENTS } from '../constants';
import { ViewType, ContainerData } from '../types';

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

  const renderFilterDropdown = (label: string, key: string, options: string[]) => (
    <div className="relative inline-block text-left">
      <select
        value={filters[key] || 'all'}
        onChange={(e) => handleFilterChange(key, e.target.value)}
        className="appearance-none block w-full pl-3 pr-8 py-1.5 border border-gray-200 rounded text-xs text-gray-600 bg-white hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-all min-w-[140px]"
      >
        <option value="all">{label}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <ChevronDown size={12} />
      </div>
    </div>
  );

  const renderFilterBar = () => {
    if (view !== 'Dane podstawowe' && view !== 'Numery bieżące' && view !== 'Serwis') return null;

    if (view === 'Dane podstawowe') {
      return null; // No filters for basic data as requested
    }

    if (view === 'Serwis') {
      return (
        <div className="flex flex-wrap items-center gap-2 mb-4 px-2">
          {renderFilterDropdown('Status zgłoszenia', 'ticketStatus', ['Otwarty', 'Zamknięty'])}
        </div>
      );
    }

    const containerNumbers = Array.from(new Set(MOCK_CONTAINERS.map(a => a.number)));
    const statuses = Array.from(new Set(MOCK_CURRENT_NUMBERS.map(a => a.status)));
    const locations = Array.from(new Set(MOCK_CURRENT_NUMBERS.map(a => a.location)));
    const verifications = Array.from(new Set(MOCK_CURRENT_NUMBERS.map(a => a.nextVerification)));

    return (
      <div className="flex flex-wrap items-center gap-2 mb-4 px-2">
        {renderFilterDropdown('Numer kontenera', 'number', containerNumbers)}
        {renderFilterDropdown('Status', 'status', statuses)}
        {renderFilterDropdown('Lokalizacja', 'location', locations)}
        {renderFilterDropdown('Weryfikacja', 'verification', verifications)}
        {renderFilterDropdown('Typ kontenera', 'type', ['MANUAL', 'AUTOMATIC'])}

        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="flex items-center px-2 py-1.5 text-xs text-red-500 hover:bg-red-50 rounded transition-colors"
          >
            <X size={14} className="mr-1" />
            Wyczyść filtry
          </button>
        )}
      </div>
    );
  };

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
             <button 
               onClick={handleSave}
               className="flex items-center px-8 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm"
             >
               ZAPISZ
             </button>
             <button 
               onClick={() => {
                 setIsAddingContainer(false);
                 setIsAddingItem(false);
               }}
               className="flex items-center px-8 py-2 border border-[#007bff] text-[#007bff] rounded text-xs font-bold hover:bg-blue-50 transition-all shadow-sm"
             >
               ANULUJ
             </button>
          </div>
        </div>
      );
    }

    const commonActions = (view: ViewType) => {
      switch (view) {
        case 'Dane podstawowe':
          return (
            <div className="flex items-center space-x-2">
               <button className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">
                 <Download size={14} className="mr-2" />
                 EKSPORTUJ DO CSV
               </button>
               <button 
                 onClick={() => setIsAddingContainer(true)}
                 className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm"
               >
                 <Plus size={14} className="mr-2" strokeWidth={3} />
                 NOWY NUMER KONTENERA
               </button>
            </div>
          );
        case 'Numery bieżące':
          return (
            <div className="flex items-center space-x-2">
               <button className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">
                 <Download size={14} className="mr-2" />
                 KONTROLE - EKSPORT
               </button>
               <button className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">
                 <Download size={14} className="mr-2" />
                 EKSPORTUJ DO CSV
               </button>
               <button className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">
                 <Plus size={14} className="mr-2" strokeWidth={3} />
                 WCZYTAJ NUMER BIEŻĄCY
               </button>
            </div>
          );
        case 'Lokalizacje':
          return (
            <div className="flex items-center space-x-2">
               <button className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">
                 <Download size={14} className="mr-2" />
                 EKSPORTUJ DO CSV
               </button>
               <button className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">
                 <Plus size={14} className="mr-2" strokeWidth={3} />
                 NOWA LOKALIZACJA
               </button>
            </div>
          );
        case 'Serwis':
          return (
            <div className="flex items-center space-x-2">
               <button className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">
                 <Download size={14} className="mr-2" />
                 EKSPORTUJ DO XLSX
               </button>
               <button className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">
                 <Plus size={14} className="mr-2" strokeWidth={3} />
                 WYGENERUJ ZLECENIE ZBIORCZE
               </button>
            </div>
          );
        case 'Checklisty':
          return (
            <div className="flex items-center space-x-2">
               <button className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">
                 <Plus size={14} className="mr-2" strokeWidth={3} />
                 DODAJ KATALOG
               </button>
            </div>
          );
        case 'Zdarzenia':
          return (
            <div className="flex items-center space-x-2">
               <button 
                 onClick={() => setIsAddingItem(true)}
                 className="flex items-center px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm"
               >
                 <Plus size={14} className="mr-2" strokeWidth={3} />
                 DODAJ ZDARZENIE
               </button>
            </div>
          );
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

    const titleMap: Record<string, string> = {
      'Dane podstawowe': 'Dane podstawowe',
      'Numery bieżące': 'Numery bieżące',
      'Lokalizacje': 'Lokalizacje',
      'Serwis': 'Serwis',
      'Checklisty': 'Listy kontrolne',
      'Zdarzenia': 'Zdarzenia'
    };

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-800">
           {iconMap[view]}
           <h1 className="text-lg font-bold">{titleMap[view]}</h1>
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
              {filteredContainers.length > 0 ? filteredContainers.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${selectedContainer?.id === item.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedContainer(item)}
                >
                  <td className="px-4 py-3 font-medium text-[#007bff]">{item.number}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-center">{item.verificationPeriod} dni</td>
                  <td className="px-4 py-3">{item.project}</td>
                  <td className="px-4 py-3 text-[11px] font-bold text-gray-500 tracking-tighter uppercase">
                    {item.type === 'MANUAL' ? 'Manualny' : 'Automatyczny'}
                  </td>
                  <td className="px-4 py-3">{item.orderNumber}</td>
                  <td className="px-4 py-3 text-center">{item.prototypes}</td>
                  <td className="px-4 py-3 text-center">{item.currentNumbers}</td>
                  <td className="px-4 py-3 text-center font-semibold">{item.total}</td>
                </tr>
              )) : (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-gray-400">Brak wyników</td></tr>
              )}
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
              {filteredCurrentNumbers.length > 0 ? filteredCurrentNumbers.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${selectedCurrentNumber?.id === item.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedCurrentNumber(item)}
                >
                  <td className="px-4 py-3 font-medium text-[#007bff]">{item.containerNumber}</td>
                  <td className="px-4 py-3">{item.currentNumber}</td>
                  <td className="px-4 py-3">{item.containerName}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${
                      item.status === 'Warunkowo dopuszczony' ? 'text-orange-500' :
                      item.status === 'Prototyp' ? 'text-orange-600' :
                      item.status === 'Zablokowany' ? 'text-red-500' :
                      'text-green-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.version}</td>
                  <td className="px-4 py-3">{item.qrCode}</td>
                  <td className="px-4 py-3">{item.nextVerification}</td>
                  <td className="px-4 py-3">{item.owner}</td>
                  <td className="px-4 py-3">{item.producer}</td>
                  <td className="px-4 py-3">{item.location}</td>
                </tr>
              )) : (
                <tr><td colSpan={11} className="px-4 py-10 text-center text-gray-400">Brak wyników</td></tr>
              )}
            </tbody>
          </table>
        );
      case 'Lokalizacje':
        return (
          <table className="min-w-full text-[13px] text-gray-700">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-500 w-3/4">Lokalizacja</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-500 w-1/4">Liczba kontenerów</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_LOCATIONS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-right">{item.containerCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Serwis':
        return (
          <table className="min-w-full text-[13px] text-gray-700">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Numer kontenera</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Numer bieżący</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Nazwa kontenera</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status zgłoszenia</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Data zgłoszenia</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Osoba zgłaszająca</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Data wykonania</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Właściciel</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Osoba wykonująca</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Lokalizacja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_SERVICES.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.containerNumber}</td>
                  <td className="px-4 py-3">{item.currentNumber}</td>
                  <td className="px-4 py-3">{item.containerName}</td>
                  <td className="px-4 py-3">
                    <span className="text-green-600 font-semibold">{item.status}</span>
                  </td>
                  <td className="px-4 py-3">{item.ticketStatus}</td>
                  <td className="px-4 py-3">{item.reportedDate}</td>
                  <td className="px-4 py-3">{item.reportedBy}</td>
                  <td className="px-4 py-3">{item.executionDate}</td>
                  <td className="px-4 py-3">{item.owner}</td>
                  <td className="px-4 py-3">{item.executor}</td>
                  <td className="px-4 py-3">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Checklisty':
        return (
          <table className="min-w-full text-[13px] text-gray-700">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Nazwa</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Data utworzenia</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Data edycji</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">Liczba kroków</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Wersja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_CHECKLISTS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 group">
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <Folder size={18} className="text-[#007bff]" fill="#007bff" fillOpacity={0.1} />
                    <span className="font-medium text-gray-700 group-hover:text-[#007bff] cursor-pointer transition-colors">{item.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{item.createdDate}</td>
                  <td className="px-4 py-3 text-gray-500">{item.editDate}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{item.stepCount}</td>
                  <td className="px-4 py-3 text-gray-500">{item.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Zdarzenia':
        return (
          <table className="min-w-full text-[13px] text-gray-700">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Nazwa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_EVENTS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-gray-700">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  const getCountText = () => {
    switch (view) {
      case 'Dane podstawowe': return `${filteredContainers.length} elementów (${Math.ceil(filteredContainers.length/10)} stron)`;
      case 'Numery bieżące': return `${filteredCurrentNumbers.length} elementów (${Math.ceil(filteredCurrentNumbers.length/10)} stron)`;
      case 'Lokalizacje': return `${MOCK_LOCATIONS.length} elementów (5 stron)`;
      case 'Serwis': return `${MOCK_SERVICES.length} elementów (29 stron)`;
      case 'Checklisty': return `${MOCK_CHECKLISTS.length} elementów (1 strona)`;
      case 'Zdarzenia': return `${MOCK_EVENTS.length} elementów (1 strona)`;
      default: return '0 elementów';
    }
  };

  const currentDataLength = view === 'Dane podstawowe' ? filteredContainers.length : 
                            view === 'Numery bieżące' ? filteredCurrentNumbers.length :
                            view === 'Lokalizacje' ? MOCK_LOCATIONS.length :
                            view === 'Serwis' ? MOCK_SERVICES.length :
                            view === 'Checklisty' ? MOCK_CHECKLISTS.length :
                            MOCK_EVENTS.length;

  return (
    <div className="flex flex-1 overflow-hidden relative bg-white">
      {isPreviewing && selectedCurrentNumber ? (
        /* Full Preview View */
        <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="flex items-center space-x-2">
              <ClipboardCheck size={20} className="text-gray-600" />
              <h1 className="text-lg font-bold text-gray-800">Podgląd numerów bieżących</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-4 py-2 border border-[#007bff] text-[#007bff] rounded text-xs font-bold hover:bg-blue-50 transition-all">
                <Edit2 size={14} className="mr-2" /> EDYTUJ
              </button>
              <button className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded text-xs font-bold hover:bg-red-50 transition-all">
                <Trash2 size={14} className="mr-2" /> USUŃ
              </button>
              <button 
                onClick={() => setIsPreviewing(false)}
                className="flex items-center px-4 py-2 bg-[#007bff] text-white rounded text-xs font-bold hover:bg-blue-600 transition-all"
              >
                ZAMKNIJ PODGLĄD
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Container Information */}
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">DANE NUMERU KONTENERA</h2>
              <div className="grid grid-cols-5 gap-8">
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1">Numer kontenera</label>
                  <p className="text-sm font-medium">{selectedCurrentNumber.containerNumber}</p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1">Nazwa kontenera</label>
                  <p className="text-sm font-medium">{selectedCurrentNumber.containerName}</p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1">Okres weryfikacji</label>
                  <p className="text-sm font-medium">180 dni</p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1">Typ kontenera</label>
                  <p className="text-sm font-medium">{selectedCurrentNumber.type}</p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1">Opis</label>
                  <p className="text-sm font-medium">-</p>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Basic Data Information */}
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">DANE PODSTAWOWE</h2>
              <div className="flex gap-12">
                <div className="grid grid-cols-4 gap-x-12 gap-y-6 flex-1">
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold mb-1">Numer bieżący</label>
                    <p className="text-sm font-medium">{selectedCurrentNumber.currentNumber}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold mb-1">Lokalizacja</label>
                    <p className="text-sm font-medium">{selectedCurrentNumber.location}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold mb-1">Właściciel</label>
                    <p className="text-sm font-medium">{selectedCurrentNumber.owner}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold mb-1">Producent</label>
                    <p className="text-sm font-medium">{selectedCurrentNumber.producer}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold mb-1">Status</label>
                    <span className="text-green-600 text-sm font-bold">{selectedCurrentNumber.status}</span>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold mb-1">Wersja</label>
                    <p className="text-sm font-medium">{selectedCurrentNumber.version}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold mb-1">Data produkcji</label>
                    <p className="text-sm font-medium">-</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-semibold mb-1">Następna weryfikacja</label>
                    <p className="text-sm font-medium">{selectedCurrentNumber.nextVerification}</p>
                  </div>
                </div>
                <div className="w-48 text-center shrink-0">
                  <label className="block text-[10px] text-gray-400 font-semibold mb-2 uppercase">KOD QR</label>
                  <div className="bg-white p-2 border border-gray-100 rounded-lg inline-block shadow-sm">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=514488_38" alt="QR Code" className="w-24 h-24" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 font-mono">{selectedCurrentNumber.qrCode}</p>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Checklist Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">LISTA KONTROLNA</h2>
                <span className="text-xs text-red-500 font-medium">✕ Kontrola nie przeprowadzona</span>
              </div>
              <div className="border border-gray-100 rounded">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#f8f9fa] border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-2 font-semibold text-gray-500">Data wyk.</th>
                      <th className="px-4 py-2 font-semibold text-gray-500 underline decoration-gray-300">Nazwa</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1,2,3,4,5,6].map(i => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-600">07.11.2022, 0...</td>
                        <td className="px-4 py-3 font-medium text-gray-800 underline decoration-blue-200">Checklista Wielobranżowa</td>
                        <td className="px-4 py-3 text-right">
                          <Eye size={16} className="text-[#007bff] cursor-pointer inline" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Service Section */}
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">SERWIS</h2>
              <div className="border border-gray-100 rounded">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#f8f9fa] border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-2 font-semibold text-gray-500 underline decoration-gray-300">Data zgłoszenia</th>
                      <th className="px-4 py-2 font-semibold text-gray-500">Osoba zgłaszająca</th>
                      <th className="px-4 py-2 font-semibold text-gray-500">Opis</th>
                      <th className="px-4 py-2 font-semibold text-gray-500">Data wykonania</th>
                      <th className="px-4 py-2 font-semibold text-gray-500">Osoba wykonująca</th>
                      <th className="px-4 py-2 font-semibold text-gray-500">Status zgłoszenia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-400 italic">Brak danych</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Documents Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">DOKUMENTY</h2>
                <button className="flex items-center px-4 py-1.5 bg-[#007bff] text-white rounded text-[10px] font-bold hover:bg-blue-600 transition-all">
                  <Upload size={12} className="mr-2" /> DODAJ DOKUMENT
                </button>
              </div>
              <div className="border border-gray-100 rounded">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-[#f8f9fa] border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-2 font-semibold text-gray-500 ml-10">Nazwa dokumentu</th>
                      <th className="px-4 py-2 font-semibold text-gray-500">Typ dokumentu</th>
                      <th className="px-4 py-2 font-semibold text-gray-500">Dodano przez</th>
                      <th className="px-4 py-2 font-semibold text-gray-500">Data dodania</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { name: 'ci_360064916121000813479090181547544.jpg', type: 'OTHER', by: 'Apzumi Spatial Tes...', date: '14.01.2021, 1...' },
                      { name: 'ci_36006388775624726204423383161474.jpg', type: 'OTHER', by: 'Apzumi Spatial Tes...', date: '14.01.2021, 1...' }
                    ].map((doc, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 flex items-center space-x-3 max-w-xs">
                          <img src={`https://picsum.photos/seed/${idx}/40/40`} className="w-8 h-8 rounded border border-gray-200 shrink-0" alt="" />
                          <span className="truncate text-[#007bff] cursor-pointer hover:underline">{doc.name}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{doc.type}</td>
                        <td className="px-4 py-3 text-gray-500">{doc.by}</td>
                        <td className="px-4 py-3 text-gray-500">{doc.date}</td>
                        <td className="px-4 py-3 text-right space-x-3">
                          <Eye size={14} className="text-[#007bff] cursor-pointer inline" />
                          <Download size={14} className="text-[#007bff] cursor-pointer inline" />
                          <Trash2 size={14} className="text-red-500 cursor-pointer inline" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      ) : null}

      <div className={`flex flex-col flex-1 p-4 md:p-6 space-y-4 overflow-hidden bg-white transition-all duration-300 ${(selectedContainer || selectedCurrentNumber) ? 'mr-72' : ''}`}>
        {renderHeader()}

        {isAddingContainer ? (
          /* "New Container Number" Form View */
          <div className="flex-1 overflow-y-auto py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-7xl">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Numer kontenera</label>
                  <input
                    type="text"
                    value={newContainerData.number}
                    onChange={(e) => setNewContainerData({...newContainerData, number: e.target.value})}
                    placeholder="Numer kontenera"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Nazwa kontenera</label>
                  <input
                    type="text"
                    value={newContainerData.name}
                    onChange={(e) => setNewContainerData({...newContainerData, name: e.target.value})}
                    placeholder="Nazwa kontenera"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Numer zamówienia</label>
                  <input
                    type="text"
                    value={newContainerData.orderNumber}
                    onChange={(e) => setNewContainerData({...newContainerData, orderNumber: e.target.value})}
                    placeholder="Numer zamówienia"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Projekt</label>
                  <textarea
                    rows={3}
                    value={newContainerData.project}
                    onChange={(e) => setNewContainerData({...newContainerData, project: e.target.value})}
                    placeholder="Projekt"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Okres weryfikacji (dni)</label>
                  <input
                    type="text"
                    value={newContainerData.verificationPeriod}
                    onChange={(e) => setNewContainerData({...newContainerData, verificationPeriod: e.target.value})}
                    placeholder="Okres weryfikacji (dni)"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Typ kontenera</label>
                  <div className="relative">
                    <select
                      value={newContainerData.type}
                      onChange={(e) => setNewContainerData({...newContainerData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-700 bg-gray-50 appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                    >
                      <option value="MANUAL">Manualny</option>
                      <option value="AUTOMATIC">Automatyczny</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Wysyłaj mail o zmianie statusu do wskazanych adresów</label>
                  <textarea
                    rows={4}
                    value={newContainerData.emails}
                    onChange={(e) => setNewContainerData({...newContainerData, emails: e.target.value})}
                    placeholder="Maile oddziel przecinkiem. Przykładowo: jacek@gmail.com, tomek@gmail.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : isAddingItem ? (
          /* "Add Item" Form View for Events */
          <div className="flex-1 py-4 space-y-4 max-w-2xl">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700">Nazwa</label>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Nazwa"
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        ) : (
          /* Table View */
          <>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {renderFilterBar()}
                </div>
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
            </div>

            <div className="flex-1 overflow-auto border border-gray-100 rounded">
              {renderTable()}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 py-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span>Pokaż</span>
                <select className="border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-700 outline-none">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span className="opacity-70">elementów. Pokazywane 1 do {Math.min(currentDataLength, 10)} z {getCountText()}.</span>
              </div>
              <div className="flex items-center bg-[#f0f2f5] rounded overflow-hidden">
                <button className="p-2 hover:bg-gray-200 text-gray-400"><ChevronsLeft size={14} /></button>
                <button className="p-2 hover:bg-gray-200 text-gray-400"><ChevronLeft size={14} /></button>
                <button className="px-4 py-2 bg-white text-[#007bff] font-bold border-x border-gray-200">1</button>
                <button className="p-2 hover:bg-gray-200 text-gray-400"><ChevronRight size={14} /></button>
                <button className="p-2 hover:bg-gray-200 text-gray-400"><ChevronsRight size={14} /></button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sidebar Details for Current Numbers */}
      {selectedCurrentNumber && view === 'Numery bieżące' && !isPreviewing && (
        <div className="w-72 border-l border-gray-200 bg-[#f8f9fa] flex flex-col fixed right-0 top-0 bottom-0 z-20 shadow-xl transition-all">
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <h2 className="font-bold text-gray-800">Szczegóły</h2>
            <button onClick={() => setSelectedCurrentNumber(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-4">
              {[
                { label: 'Numer kontenera', value: selectedCurrentNumber.containerNumber },
                { label: 'Nazwa kontenera', value: selectedCurrentNumber.containerName },
                { label: 'Numer bieżący', value: selectedCurrentNumber.currentNumber },
                { label: 'Kod QR', value: selectedCurrentNumber.qrCode }
              ].map((item, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-2">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-gray-700 font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="text-center bg-white p-4 rounded border border-gray-100 shadow-sm">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=514488_38" alt="QR Code" className="w-32 h-32 mx-auto" />
                <p className="text-[10px] text-gray-400 mt-2 font-mono uppercase">{selectedCurrentNumber.qrCode}</p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Lokalizacja', value: selectedCurrentNumber.location },
                { label: 'Właściciel', value: selectedCurrentNumber.owner },
                { label: 'Producent', value: selectedCurrentNumber.producer || '-' },
                { label: 'Wersja', value: selectedCurrentNumber.version },
                { label: 'Następna weryfikacja', value: selectedCurrentNumber.nextVerification },
                { label: 'Data produkcji', value: '-' },
                { label: 'Status', value: selectedCurrentNumber.status, color: true },
                { label: 'Typ kontenera', value: selectedCurrentNumber.type }
              ].map((item, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-2">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
                  <p className={`text-sm font-medium ${item.color ? 'text-green-600' : 'text-gray-700'}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-auto pb-4">
              <button 
                onClick={() => setIsPreviewing(true)}
                className="w-full flex items-center justify-start px-4 py-2.5 bg-[#007bff] text-white rounded text-[11px] font-bold shadow-sm hover:bg-blue-600 transition-colors uppercase tracking-tight"
              >
                <Eye size={16} className="mr-3" />
                Podgląd
              </button>
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-4 py-2.5 bg-[#007bff] text-white rounded text-[11px] font-bold shadow-sm hover:bg-blue-600 transition-colors">
                  <Edit2 size={16} className="mr-2" />
                  EDYTUJ
                </button>
                <button className="flex-1 flex items-center justify-center px-4 py-2.5 bg-red-600 text-white rounded text-[11px] font-bold shadow-sm hover:bg-red-700 transition-colors">
                  <Trash2 size={16} className="mr-2" />
                  USUŃ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Details for Containers (Dane podstawowe) */}
      {selectedContainer && view === 'Dane podstawowe' && !isAddingItem && !isAddingContainer && (
        <div className="w-72 border-l border-gray-200 bg-[#f8f9fa] flex flex-col fixed right-0 top-0 bottom-0 z-20 shadow-xl transition-all">
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <h2 className="font-bold text-gray-800">Szczegóły</h2>
            <button onClick={() => setSelectedContainer(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-4">
              {[
                { label: 'Numer kontenera', value: selectedContainer.number },
                { label: 'Nazwa kontenera', value: selectedContainer.name },
                { label: 'Okres weryfikacji', value: `${selectedContainer.verificationPeriod} dni` },
                { label: 'Typ kontenera', value: selectedContainer.type === 'MANUAL' ? 'Manualny' : 'Automatyczny' },
                { label: 'Producenci', value: '-' },
                { label: 'Numer zamówienia', value: selectedContainer.orderNumber },
                { label: 'Projekt', value: selectedContainer.project }
              ].map((item, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-2">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-gray-700 font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-auto pb-4">
              <button className="w-full flex items-center justify-start px-4 py-2.5 bg-[#004a99] text-white rounded text-[11px] font-bold shadow-sm hover:bg-[#003d80] transition-colors">
                <Eye size={16} className="mr-3" />
                PODGLĄD
              </button>
              <button className="w-full flex items-center justify-start px-4 py-2.5 bg-[#004a99] text-white rounded text-[11px] font-bold shadow-sm hover:bg-[#003d80] transition-colors">
                <List size={16} className="mr-3" />
                POKAŻ NUMERY BIEŻĄCE
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-start px-4 py-2.5 bg-[#004a99] text-white rounded text-[11px] font-bold shadow-sm hover:bg-[#003d80] transition-colors"
              >
                <FilePlus size={16} className="mr-3" />
                UTWÓRZ NUMERY BIEŻĄCE
              </button>
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 flex items-center justify-center px-4 py-2.5 bg-[#004a99] text-white rounded text-[11px] font-bold shadow-sm hover:bg-[#003d80] transition-colors">
                  <Edit2 size={16} className="mr-2" />
                  EDYTUJ
                </button>
                <button className="flex-1 flex items-center justify-center px-4 py-2.5 bg-[#991b1b] text-white rounded text-[11px] font-bold shadow-sm hover:bg-[#7f1d1d] transition-colors">
                  <Trash2 size={16} className="mr-2" />
                  USUŃ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;