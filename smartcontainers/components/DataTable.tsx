import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Plus, Box, ClipboardCheck, LayoutGrid, ChevronDown, Settings, CheckSquare, History, X, Save, Folder, Upload, Package, Layers } from 'lucide-react';
import { MOCK_CONTAINERS, MOCK_CURRENT_NUMBERS, MOCK_LOCATIONS, MOCK_SERVICES, MOCK_CHECKLISTS, MOCK_EVENTS } from '../constants';
import { ViewType, ContainerData, LocationData, EventData, CurrentNumberData, ServiceData, ChecklistData, AssetType, ZakladType } from '../types';

import FilterBar from './FilterBar';
import TableSidebar from './TableSidebar';
import CurrentNumberPreview from './CurrentNumberPreview';
import ChecklistEditor from './ChecklistEditor';

interface DataTableProps {
  view: ViewType;
  currentAsset: AssetType;
  currentZaklad: ZakladType;
}

const DataTable: React.FC<DataTableProps> = ({ view, currentAsset, currentZaklad }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [localContainers, setLocalContainers] = useState<ContainerData[]>(MOCK_CONTAINERS);
  const [localCurrentNumbers, setLocalCurrentNumbers] = useState<CurrentNumberData[]>(MOCK_CURRENT_NUMBERS);
  const [localLocations, setLocalLocations] = useState<LocationData[]>(MOCK_LOCATIONS);
  const [localEvents, setLocalEvents] = useState<EventData[]>(MOCK_EVENTS);
  const [localServices, setLocalServices] = useState<ServiceData[]>(MOCK_SERVICES);
  const [localChecklists, setLocalChecklists] = useState<ChecklistData[]>(MOCK_CHECKLISTS);
  const [selectedContainer, setSelectedContainer] = useState<ContainerData | null>(null);
  const [selectedCurrentNumber, setSelectedCurrentNumber] = useState<any | null>(null);

  const ASSET_TYPES_MAP: Record<AssetType, string[]> = {
    'Regały': ['Wspornikowy', 'Półkowy', 'Paletowy'],
    'Kontenery': ['Manualny', 'Automatyczny'],
    'HSW': ['Grawitacyjny', 'Kółkowy', 'Platformowy'],
    'Trolleye': ['Siatkowy', 'Platformowy', 'Skrzyniowy']
  };

  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isEditingChecklist, setIsEditingChecklist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false); // Do ogólnego użycia, np. Zdarzenia
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isAddingContainer, setIsAddingContainer] = useState(false);
  const [isEditingContainer, setIsEditingContainer] = useState<ContainerData | null>(null);
  const [isEditingCurrentNumber, setIsEditingCurrentNumber] = useState<CurrentNumberData | null>(null);
  const [newItemName, setNewItemName] = useState('');

  // Form states for new container
  const [newContainerData, setNewContainerData] = useState({
    number: '',
    name: '',
    orderNumber: '',
    project: '',
    verificationPeriod: '',
    type: ASSET_TYPES_MAP[currentAsset][0],
    emails: ''
  });
  const [numberError, setNumberError] = useState('');

  // Update default type when asset changes
  useEffect(() => {
    setNewContainerData(prev => ({ ...prev, type: ASSET_TYPES_MAP[currentAsset][0] }));
  }, [currentAsset]);

  // Reset states when view changes
  useEffect(() => {
    setIsAddingItem(false);
    setIsAddingContainer(false);
    setIsAddingLocation(false);
    setIsAddingEvent(false);
    setNewItemName('');
    setSelectedContainer(null);
    setSelectedCurrentNumber(null);
    setIsPreviewing(false);
    setIsEditingChecklist(false);
    setIsEditingContainer(null);
    setIsEditingCurrentNumber(null);
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
      if (!newContainerData.number.trim()) return;
      setNumberError('');
      
      const newContainer: ContainerData = {
        id: Math.random().toString(36).substr(2, 9),
        assetType: currentAsset,
        number: newContainerData.number,
        name: newContainerData.name,
        verificationPeriod: parseInt(newContainerData.verificationPeriod) || 0,
        project: newContainerData.project,
        type: newContainerData.type,
        orderNumber: newContainerData.orderNumber,
        prototypes: 0,
        currentNumbers: 0,
        total: 0,
        zaklad: currentZaklad
      };

      setLocalContainers(prev => [newContainer, ...prev]);

      const newCurrentNum: CurrentNumberData = {
        id: Math.random().toString(36).substr(2, 9),
        assetType: currentAsset,
        containerNumber: newContainerData.number,
        currentNumber: '001',
        containerName: newContainerData.name,
        status: 'W użyciu',
        type: newContainerData.type,
        version: '1.0',
        qrCode: `${newContainerData.number}_001`,
        nextVerification: '-',
        owner: 'Brak',
        producer: 'Brak',
        location: 'Brak',
        zaklad: currentZaklad
      };
      setLocalCurrentNumbers(prev => [newCurrentNum, ...prev]);

      setIsAddingContainer(false);
      setNewContainerData({
        number: '', name: '', orderNumber: '', project: '', verificationPeriod: '', type: ASSET_TYPES_MAP[currentAsset][0], emails: ''
      });
      setNumberError('');
    } else if (isAddingLocation) {
      if (!newItemName.trim()) return;
      
      const newLoc: LocationData = {
        id: Math.random().toString(36).substr(2, 9),
        assetType: currentAsset,
        name: newItemName,
        containerCount: 0,
        zaklad: currentZaklad
      };
      setLocalLocations(prev => [newLoc, ...prev]);
      setIsAddingLocation(false);
      setNewItemName('');
    } else if (isAddingEvent) {
       if (!newItemName.trim()) return;
       
       const newEv: EventData = {
         id: Math.random().toString(36).substr(2, 9),
         assetType: currentAsset,
         name: newItemName,
         zaklad: currentZaklad
       };
       setLocalEvents(prev => [newEv, ...prev]);
       setIsAddingEvent(false);
       setNewItemName('');
    } else if (isEditingContainer) {
      setLocalContainers(prev => prev.map(c => c.id === isEditingContainer.id ? isEditingContainer : c));
      setIsEditingContainer(null);
    } else if (isEditingCurrentNumber) {
      setLocalCurrentNumbers(prev => prev.map(c => c.id === isEditingCurrentNumber.id ? isEditingCurrentNumber : c));
      setIsEditingCurrentNumber(null);
    } else if (isAddingItem) {
      if (!newItemName.trim()) return;
      setIsAddingItem(false);
      setNewItemName('');
    }
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '') || searchTerm !== '';

  const getAssetGenitive = (asset: AssetType) => {
    switch(asset) {
      case 'Kontenery': return 'kontenera';
      case 'Trolleye': return 'trolleya';
      case 'Regały': return 'regału';
      case 'HSW': return 'HSW';
      default: return 'elementu';
    }
  };

  const assetContainers = useMemo(() => localContainers.filter(item => item.assetType === currentAsset && item.zaklad === currentZaklad), [currentAsset, currentZaklad, localContainers]);
  const assetCurrentNumbers = useMemo(() => localCurrentNumbers.filter(item => item.assetType === currentAsset && item.zaklad === currentZaklad), [currentAsset, currentZaklad, localCurrentNumbers]);
  const assetLocations = useMemo(() => localLocations.filter(item => item.assetType === currentAsset && item.zaklad === currentZaklad), [currentAsset, currentZaklad, localLocations]);
  const assetEvents = useMemo(() => localEvents.filter(item => item.assetType === currentAsset && item.zaklad === currentZaklad), [currentAsset, currentZaklad, localEvents]);
  const assetServices = useMemo(() => localServices.filter(item => item.assetType === currentAsset && item.zaklad === currentZaklad), [currentAsset, currentZaklad, localServices]);
  const assetChecklists = useMemo(() => localChecklists.filter(item => item.assetType === currentAsset && item.zaklad === currentZaklad), [currentAsset, currentZaklad, localChecklists]);

  const filteredContainers = useMemo(() => {
    return assetContainers.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.number.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm, assetContainers]);

  const filteredCurrentNumbers = useMemo(() => {
    return assetCurrentNumbers.filter(item => {
      const matchesSearch = item.containerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.currentNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesNumber = !filters['number'] || item.containerNumber === filters['number'];
      const matchesStatus = !filters['status'] || item.status === filters['status'];
      const matchesType = !filters['type'] || item.type === filters['type'];
      const matchesLocation = !filters['location'] || item.location === filters['location'];
      const matchesVerification = !filters['verification'] || item.nextVerification === filters['verification'];

      return matchesSearch && matchesNumber && matchesStatus && matchesType && matchesLocation && matchesVerification;
    });
  }, [searchTerm, filters, assetCurrentNumbers]);

  const renderHeader = () => {
    if (isAddingContainer || isAddingLocation || isAddingEvent || isEditingContainer || isEditingCurrentNumber) {
      const genitive = getAssetGenitive(currentAsset);
      
      let title = '';
      let Icon = Box;
      if (isAddingContainer) title = `Nowy numer ${genitive}`;
      else if (isAddingLocation) title = 'Nowa lokalizacja';
      else if (isAddingEvent) title = 'Nowe zdarzenie';
      else if (isEditingContainer) title = `Edytuj numer ${genitive}`;
      else if (isEditingCurrentNumber) { title = 'Edytuj numer bieżący'; Icon = LayoutGrid; }
      
      if (isAddingLocation) Icon = Folder;
      if (isAddingEvent) Icon = History;
      
      return (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 text-gray-800">
             <div className="p-2 bg-gray-100 rounded text-gray-500">
               <Icon size={20} strokeWidth={1.5} />
             </div>
             <h1 className="text-lg font-bold">{title}</h1>
          </div>
          <div className="flex items-center space-x-3">
             <button onClick={handleSave} className="flex items-center px-8 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all shadow-sm">ZAPISZ</button>
             <button onClick={() => { setIsAddingContainer(false); setIsAddingLocation(false); setIsAddingEvent(false); setIsAddingItem(false); setIsEditingContainer(null); setIsEditingCurrentNumber(null); }} className="flex items-center px-8 py-2 border border-[#007bff] text-[#007bff] rounded text-xs font-bold hover:bg-blue-50 transition-all shadow-sm">ANULUJ</button>
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
               <button onClick={() => setIsAddingContainer(true)} className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />NOWY NUMER {getAssetGenitive(currentAsset).toUpperCase()}</button>
            </div>
          );
        case 'Numery bieżące':
          return (
            <div className="flex items-center space-x-2">
               <button className={btnStyle}><Download size={14} className="mr-2" />KONTROLE - EKSPORT</button>
               <button className={btnStyle}><Download size={14} className="mr-2" />EKSPORTUJ DO CSV</button>
               {currentAsset === 'Regały' && (
                 <button onClick={() => setIsAddingContainer(true)} className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />NOWY NUMER REGAŁU</button>
               )}
               <button className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />WCZYTAJ NUMER BIEŻĄCY</button>
            </div>
          );
        case 'Checklisty':
          return (
            <div className="flex items-center space-x-2">
               <button className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />DODAJ KATALOG</button>
               <button className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />DODAJ LISTĘ KONTROLNĄ</button>
            </div>
          );
        case 'Lokalizacje':
          return (
            <div className="flex items-center space-x-2">
               <button className={btnStyle}><Download size={14} className="mr-2" />EKSPORTUJ DO CSV</button>
               <button onClick={() => setIsAddingLocation(true)} className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />NOWA LOKALIZACJA</button>
            </div>
          );
        case 'Zdarzenia':
          return (
            <div className="flex items-center space-x-2">
               <button onClick={() => setIsAddingEvent(true)} className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />NOWE ZDARZENIE</button>
            </div>
          );
        case 'Serwis':
          return (
            <div className="flex items-center space-x-2">
               <button className={btnStyle}><Download size={14} className="mr-2" />EKSPORTUJ DO XLSX</button>
               <button className={btnStyle}><Plus size={14} className="mr-2" strokeWidth={3} />WYGENERUJ ZLECENIE ZBIORCZE</button>
            </div>
          );
        // ... rest of cases for simplicity
        default: return null;
      }
    };

    const assetIconMap: Record<AssetType, React.ReactNode> = {
      'Kontenery': <Package size={24} strokeWidth={1.5} />,
      'Trolleye': <LayoutGrid size={24} strokeWidth={1.5} />,
      'Regały': <Layers size={24} strokeWidth={1.5} />,
      'HSW': <Box size={24} strokeWidth={1.5} />,
    };

    return (
      <div className="flex items-end justify-between mb-6">
        <div className="flex items-center space-x-4">
           <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#007bff] flex items-center justify-center">
             {assetIconMap[currentAsset] || <Package size={24} strokeWidth={1.5} />}
           </div>
           <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800 leading-tight mb-1">{currentZaklad} / {currentAsset}</h1>
              <span className="text-[13px] font-semibold text-gray-500">{view}</span>
           </div>
        </div>
        <div className="pb-1">
           {commonActions(view)}
        </div>
      </div>
    );
  };

  const renderTable = () => {
    switch (view) {
      case 'Dane podstawowe':
        const gen = getAssetGenitive(currentAsset);
        return (
          <table className="min-w-full text-[13px] text-gray-700">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Numer {gen}</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Nazwa {gen}</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">Okres weryfikacji</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Projekt</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Typ {gen}</th>
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
                  <td className="px-4 py-3 uppercase text-[11px] font-bold text-gray-500">{item.type}</td>
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
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Numer {getAssetGenitive(currentAsset)}</th>
                {currentAsset !== 'Regały' && <th className="px-4 py-3 text-left font-semibold text-gray-500">Numer bieżący</th>}
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Nazwa {getAssetGenitive(currentAsset)}</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Typ {getAssetGenitive(currentAsset)}</th>
                {currentAsset !== 'Regały' && <th className="px-4 py-3 text-left font-semibold text-gray-500">Wersja</th>}
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Kod QR</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Następna weryfikacja</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Właściciel</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Producent</th>
                {currentAsset !== 'Regały' && <th className="px-4 py-3 text-left font-semibold text-gray-500">Lokalizacja</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCurrentNumbers.map((item) => (
                <tr key={item.id} className={`hover:bg-blue-50/50 cursor-pointer ${selectedCurrentNumber?.id === item.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedCurrentNumber(item)}>
                  <td className="px-4 py-3 font-medium text-[#007bff]">{item.containerNumber}</td>
                  {currentAsset !== 'Regały' && <td className="px-4 py-3">{item.currentNumber}</td>}
                  <td className="px-4 py-3">{item.containerName}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${item.status === 'Warunkowo dopuszczony' ? 'text-orange-500' : 'text-green-600'}`}>{item.status}</span>
                  </td>
                  <td className="px-4 py-3">{item.type}</td>
                  {currentAsset !== 'Regały' && <td className="px-4 py-3">{item.version}</td>}
                  <td className="px-4 py-3 text-gray-400 font-mono text-[10px] uppercase">{item.qrCode}</td>
                  <td className="px-4 py-3">{item.nextVerification}</td>
                  <td className="px-4 py-3">{item.owner}</td>
                  <td className="px-4 py-3">{item.producer}</td>
                  {currentAsset !== 'Regały' && <td className="px-4 py-3">{item.location}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Checklisty':
        return (
          <table className="min-w-full text-[13px] text-gray-700">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <tr className="bg-white">
                <th className="px-4 py-3 text-left font-semibold text-gray-500 w-1/3">Nazwa</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Data utworzenia</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Data edycji</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Liczba kroków</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Wersja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="hover:bg-gray-50 cursor-pointer">
                <td className="px-4 py-3 flex items-center text-gray-400">
                  <span className="mr-2 rotate-90">↱</span>
                  Katalog nadrzędny (Główny)
                </td>
                <td className="px-4 py-3 text-gray-300">-</td>
                <td className="px-4 py-3 text-gray-300">-</td>
                <td className="px-4 py-3 text-gray-300">-</td>
                <td className="px-4 py-3 text-gray-300">-</td>
              </tr>
              {assetChecklists.map((item) => (
                <tr key={item.id} className={`hover:bg-blue-50/50 cursor-pointer ${selectedCurrentNumber?.id === item.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedCurrentNumber(item)}>
                  <td className="px-4 py-3 flex items-center">
                    <span className="mr-3 text-emerald-500">☑</span>
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{item.createdDate}</td>
                  <td className="px-4 py-3 text-gray-500">{item.editDate}</td>
                  <td className="px-4 py-3 text-gray-500">{item.stepCount}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-bold">{item.version}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
        case 'Lokalizacje':
        return (
          <table className="min-w-full text-[13px] text-gray-700">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-500 w-2/3">Lokalizacja</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Liczba kontenerów</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {assetLocations.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/50 cursor-pointer">
                  <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3">{item.containerCount}</td>
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
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Zdarzenie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {assetEvents.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/50 cursor-pointer">
                  <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Serwis':
        return (
          <table className="min-w-full text-[13px] text-gray-700 whitespace-nowrap">
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
              {assetServices.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/50 cursor-pointer">
                  <td className="px-4 py-3 text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-[#007bff]">{item.containerNumber}</td>
                  <td className="px-4 py-3">{item.currentNumber}</td>
                  <td className="px-4 py-3">{item.containerName}</td>
                  <td className="px-4 py-3"><span className={`font-semibold ${item.status === 'Uszkodzony' ? 'text-red-500' : 'text-green-600'}`}>{item.status}</span></td>
                  <td className="px-4 py-3">{item.ticketStatus}</td>
                  <td className="px-4 py-3 text-gray-500">{item.reportedDate}</td>
                  <td className="px-4 py-3">{item.reportedBy}</td>
                  <td className="px-4 py-3 text-gray-500">{item.executionDate}</td>
                  <td className="px-4 py-3">{item.owner}</td>
                  <td className="px-4 py-3">{item.executor}</td>
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
        <CurrentNumberPreview data={selectedCurrentNumber} onClose={() => setIsPreviewing(false)} currentAsset={currentAsset} />
      )}

      {isEditingChecklist && (
        <ChecklistEditor onClose={() => setIsEditingChecklist(false)} onSave={() => setIsEditingChecklist(false)} />
      )}

      <div className={`flex flex-col flex-1 p-4 md:p-6 space-y-4 overflow-hidden bg-white transition-all duration-300 ${(selectedContainer || selectedCurrentNumber) ? 'mr-72' : ''}`}>
        {renderHeader()}

        {!isAddingContainer && !isAddingLocation && !isAddingEvent && !isAddingItem && !isEditingContainer && !isEditingCurrentNumber && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <FilterBar 
                view={view} 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                onClearFilters={clearFilters} 
                hasActiveFilters={hasActiveFilters}
                mockData={{
                  containerNumbers: Array.from(new Set(assetContainers.map(a => a.number))),
                  statuses: Array.from(new Set(assetCurrentNumbers.map(a => a.status))),
                  locations: Array.from(new Set(assetCurrentNumbers.map(a => a.location))),
                  verifications: Array.from(new Set(assetCurrentNumbers.map(a => a.nextVerification))),
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
           <div className="flex-1 py-4 bg-white overflow-y-auto w-full">
             <div className="max-w-[1200px] w-full grid grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Numer {getAssetGenitive(currentAsset)}</label>
                     <input type="text" value={newContainerData.number} onChange={e => { setNewContainerData({...newContainerData, number: e.target.value}); setNumberError(''); }} className={`w-full px-3 py-2 border ${numberError ? 'border-red-500' : 'border-gray-200'} rounded text-sm focus:border-blue-500 focus:outline-none`} placeholder={`Numer ${getAssetGenitive(currentAsset)}`} />
                     {numberError && <p className="text-[10px] text-red-500 mt-1">{numberError}</p>}
                     {currentAsset === 'Regały' && !numberError && <p className="text-[10px] text-gray-400 mt-1">Format: R_Zakład1[_Zakład2...]_Hala_Numer (np. R_Z1_H44_1)</p>}
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Nazwa {getAssetGenitive(currentAsset)}</label>
                     <input type="text" value={newContainerData.name} onChange={e => setNewContainerData({...newContainerData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" placeholder={`Nazwa ${getAssetGenitive(currentAsset)}`} />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Numer zamówienia</label>
                     <input type="text" value={newContainerData.orderNumber} onChange={e => setNewContainerData({...newContainerData, orderNumber: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" placeholder="Numer zamówienia" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Projekt</label>
                     <input type="text" value={newContainerData.project} onChange={e => setNewContainerData({...newContainerData, project: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" placeholder="Projekt" />
                   </div>
                </div>
                <div className="space-y-6">
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Okres weryfikacji (dni)</label>
                     <input type="number" value={newContainerData.verificationPeriod} onChange={e => setNewContainerData({...newContainerData, verificationPeriod: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" placeholder="Okres weryfikacji (dni)" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Typ {getAssetGenitive(currentAsset)}</label>
                     <div className="relative">
                       <select value={newContainerData.type} onChange={e => setNewContainerData({...newContainerData, type: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none appearance-none">
                         {ASSET_TYPES_MAP[currentAsset].map(option => (
                           <option key={option} value={option}>{option}</option>
                         ))}
                       </select>
                       <ChevronDown size={14} className="absolute right-3 top-2.5 pointer-events-none text-gray-400" />
                     </div>
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Wysyłaj mail o zmianie statusu do wskazanych adresów</label>
                     <textarea value={newContainerData.emails} onChange={e => setNewContainerData({...newContainerData, emails: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" placeholder="Maile oddziel przecinkiem. Przykładowo: jacek@gmail.com, tomek@gmail.com"></textarea>
                   </div>
                </div>
             </div>
           </div>
        )}

        {isEditingContainer && (
           <div className="flex-1 py-4 bg-white overflow-y-auto w-full">
             <div className="max-w-[1200px] w-full grid grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Numer {getAssetGenitive(currentAsset)}</label>
                     <input type="text" value={isEditingContainer.number} onChange={e => setIsEditingContainer({...isEditingContainer, number: e.target.value})} className={`w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none`} />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Nazwa {getAssetGenitive(currentAsset)}</label>
                     <input type="text" value={isEditingContainer.name} onChange={e => setIsEditingContainer({...isEditingContainer, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Numer zamówienia</label>
                     <input type="text" value={isEditingContainer.orderNumber || ''} onChange={e => setIsEditingContainer({...isEditingContainer, orderNumber: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Projekt</label>
                     <input type="text" value={isEditingContainer.project || ''} onChange={e => setIsEditingContainer({...isEditingContainer, project: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                   </div>
                </div>
                <div className="space-y-6">
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Okres weryfikacji (dni)</label>
                     <input type="number" value={isEditingContainer.verificationPeriod} onChange={e => setIsEditingContainer({...isEditingContainer, verificationPeriod: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Typ {getAssetGenitive(currentAsset)}</label>
                     <div className="relative">
                       <select value={isEditingContainer.type} onChange={e => setIsEditingContainer({...isEditingContainer, type: e.target.value as any})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none appearance-none">
                         {ASSET_TYPES_MAP[currentAsset].map(option => (
                           <option key={option} value={option}>{option}</option>
                         ))}
                       </select>
                       <ChevronDown size={14} className="absolute right-3 top-2.5 pointer-events-none text-gray-400" />
                     </div>
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Wysyłaj mail o zmianie statusu do wskazanych adresów</label>
                     <textarea rows={3} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" placeholder="Maile oddziel przecinkiem. Przykładowo: jacek@gmail.com, tomek@gmail.com"></textarea>
                   </div>
                </div>
             </div>
           </div>
        )}

        {isEditingCurrentNumber && (
           <div className="flex-1 py-4 bg-white overflow-y-auto w-full">
             <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                   {currentAsset === 'Regały' ? (
                     <>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Numer {getAssetGenitive(currentAsset)}</label>
                         <input type="text" value={isEditingCurrentNumber.containerNumber} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, containerNumber: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Nazwa {getAssetGenitive(currentAsset)}</label>
                         <input type="text" value={isEditingCurrentNumber.containerName} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, containerName: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                     </>
                   ) : (
                     <>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Numer bieżący</label>
                         <input type="text" value={isEditingCurrentNumber.currentNumber} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, currentNumber: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Wersja</label>
                         <input type="text" value={isEditingCurrentNumber.version || ''} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, version: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                     </>
                   )}

                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Właściciel</label>
                     <input type="text" value={isEditingCurrentNumber.owner || ''} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, owner: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                     <div className="relative">
                       <select value={isEditingCurrentNumber.status} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, status: e.target.value})} className={`w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none appearance-none font-semibold ${isEditingCurrentNumber.status === 'W użyciu' ? 'text-green-600' : 'text-orange-500'}`}>
                         <option value="Warunkowo dopuszczony">Warunkowo dopuszczony</option>
                         <option value="W użyciu">W użyciu</option>
                         <option value="Zablokowany">Zablokowany</option>
                         <option value="W naprawie">W naprawie</option>
                         <option value="Nowy">Nowy</option>
                       </select>
                       <ChevronDown size={14} className="absolute right-3 top-2.5 pointer-events-none text-gray-400" />
                     </div>
                   </div>
                   
                   {currentAsset !== 'Regały' && (
                     <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Kod QR</label>
                       <div className="flex items-center space-x-4">
                         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${isEditingCurrentNumber.qrCode}`} alt="QR Code" className="w-12 h-12" />
                         <span className="font-mono text-sm text-gray-600 uppercase bg-gray-50 px-2 py-1 rounded border border-gray-100">{isEditingCurrentNumber.qrCode}</span>
                       </div>
                     </div>
                   )}
                </div>
                <div className="space-y-6">
                   {currentAsset === 'Regały' ? (
                     <>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Typ {getAssetGenitive(currentAsset)}</label>
                         <div className="relative">
                           <select value={isEditingCurrentNumber.type} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, type: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none appearance-none">
                             {ASSET_TYPES_MAP[currentAsset].map(option => (
                               <option key={option} value={option}>{option}</option>
                             ))}
                           </select>
                           <ChevronDown size={14} className="absolute right-3 top-2.5 pointer-events-none text-gray-400" />
                         </div>
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Producent</label>
                         <input type="text" value={isEditingCurrentNumber.producer || ''} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, producer: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Następna weryfikacja</label>
                         <input type="text" value={isEditingCurrentNumber.nextVerification || '-'} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, nextVerification: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Data produkcji</label>
                         <input type="text" value={isEditingCurrentNumber.productionDate || '22.05.2021'} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, productionDate: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Okres weryfikacji (dni)</label>
                         <input type="number" defaultValue={180} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Wysyłaj mail o zmianie statusu do wskazanych adresów</label>
                         <textarea rows={3} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" placeholder="Maile oddziel przecinkiem. Przykładowo: jacek@gmail.com, tomek@gmail.com"></textarea>
                       </div>
                     </>
                   ) : (
                     <>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Lokalizacja</label>
                         <div className="relative">
                           <select value={isEditingCurrentNumber.location} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, location: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none appearance-none">
                             <option value="Clavey">Clavey</option>
                             <option value="Brak">Brak</option>
                             <option value="Magazyn główny">Magazyn główny</option>
                           </select>
                           <ChevronDown size={14} className="absolute right-3 top-2.5 pointer-events-none text-gray-400" />
                         </div>
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Producent</label>
                         <input type="text" value={isEditingCurrentNumber.producer || ''} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, producer: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Data produkcji</label>
                         <input type="text" value={isEditingCurrentNumber.productionDate || '22.05.2021'} onChange={e => setIsEditingCurrentNumber({...isEditingCurrentNumber, productionDate: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" />
                       </div>
                     </>
                   )}

                   {currentAsset === 'Regały' && (
                     <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Kod QR</label>
                       <div className="flex items-center space-x-4">
                         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${isEditingCurrentNumber.qrCode}`} alt="QR Code" className="w-12 h-12" />
                         <span className="font-mono text-sm text-gray-600 uppercase bg-gray-50 px-2 py-1 rounded border border-gray-100">{isEditingCurrentNumber.qrCode}</span>
                       </div>
                     </div>
                   )}
                </div>
             </div>
           </div>
        )}

        {(isAddingLocation || isAddingEvent) && (
           <div className="flex-1 py-4 bg-white overflow-y-auto w-full">
             <div className="max-w-[600px] w-full space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isAddingLocation ? 'Nazwa lokalizacji' : 'Nazwa zdarzenia'}
                  </label>
                  <input 
                    type="text" 
                    value={newItemName} 
                    onChange={e => setNewItemName(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:outline-none" 
                    placeholder={isAddingLocation ? 'Podaj nazwę lokalizacji' : 'Podaj nazwę zdarzenia'} 
                    autoFocus 
                  />
                </div>
             </div>
           </div>
        )}
      </div>

      <TableSidebar 
        view={view}
        selectedContainer={selectedContainer}
        selectedCurrentNumber={selectedCurrentNumber}
        onCloseContainer={() => setSelectedContainer(null)}
        onCloseCurrentNumber={() => setSelectedCurrentNumber(null)}
        onPreviewCurrentNumber={() => {
          if (view === 'Checklisty') {
            setIsEditingChecklist(true);
          } else {
            setIsPreviewing(true);
          }
        }}
        onEditContainer={() => {
          setIsEditingContainer(selectedContainer);
        }}
        onEditCurrentNumber={() => {
          setIsEditingCurrentNumber(selectedCurrentNumber);
        }}
        onOpenModal={() => setIsModalOpen(true)}
      />
    </div>
  );
};

export default DataTable;