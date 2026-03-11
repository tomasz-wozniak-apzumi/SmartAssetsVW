import React from 'react';
import { X, Eye, List, FilePlus, Edit2, Trash2 } from 'lucide-react';
import { ViewType, ContainerData } from '../types';

interface TableSidebarProps {
  view: ViewType;
  selectedContainer: ContainerData | null;
  selectedCurrentNumber: any | null;
  onCloseContainer: () => void;
  onCloseCurrentNumber: () => void;
  onPreviewCurrentNumber: () => void;
  onEditContainer?: () => void;
  onEditCurrentNumber?: () => void;
  onOpenModal: () => void;
}

const TableSidebar: React.FC<TableSidebarProps> = ({ 
  view, 
  selectedContainer, 
  selectedCurrentNumber, 
  onCloseContainer, 
  onCloseCurrentNumber,
  onPreviewCurrentNumber,
  onEditContainer,
  onEditCurrentNumber,
  onOpenModal
}) => {
  
  // Sidebar for Current Numbers
  if (selectedCurrentNumber && view === 'Numery bieżące') {
    return (
      <div className="w-72 border-l border-gray-200 bg-[#f8f9fa] flex flex-col fixed right-0 top-0 bottom-0 z-20 shadow-xl transition-all">
        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <h2 className="font-bold text-gray-800">Szczegóły</h2>
          <button onClick={onCloseCurrentNumber} className="text-gray-400 hover:text-gray-600 transition-colors">
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
              { label: 'Status', value: selectedCurrentNumber.status, color: 'text-green-600' },
              { label: 'Typ kontenera', value: selectedCurrentNumber.type }
            ].map((item, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-2">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
                <p className={`text-sm font-medium ${item.color || 'text-gray-700'}`}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 mt-auto pb-4">
            <button 
              onClick={onPreviewCurrentNumber}
              className="w-full flex items-center justify-start px-4 py-2.5 bg-[#007bff] text-white rounded text-[11px] font-bold shadow-sm hover:bg-blue-600 transition-colors uppercase tracking-tight"
            >
              <Eye size={16} className="mr-3" />
              Podgląd
            </button>
            <div className="flex space-x-2">
              <button onClick={onEditCurrentNumber} className="flex-1 flex items-center justify-center px-4 py-2.5 bg-[#007bff] text-white rounded text-[11px] font-bold shadow-sm hover:bg-blue-600 transition-colors">
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
    );
  }

  // Sidebar for Basic Data
  if (selectedContainer && view === 'Dane podstawowe') {
    return (
      <div className="w-72 border-l border-gray-200 bg-[#f8f9fa] flex flex-col fixed right-0 top-0 bottom-0 z-20 shadow-xl transition-all">
        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <h2 className="font-bold text-gray-800">Szczegóły</h2>
          <button onClick={onCloseContainer} className="text-gray-400 hover:text-gray-600 transition-colors">
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
              onClick={onOpenModal}
              className="w-full flex items-center justify-start px-4 py-2.5 bg-[#004a99] text-white rounded text-[11px] font-bold shadow-sm hover:bg-[#003d80] transition-colors"
            >
              <FilePlus size={16} className="mr-3" />
              UTWÓRZ NUMERY BIEŻĄCE
            </button>
            <div className="flex space-x-2 pt-2">
              <button onClick={onEditContainer} className="flex-1 flex items-center justify-center px-4 py-2.5 bg-[#004a99] text-white rounded text-[11px] font-bold shadow-sm hover:bg-[#003d80] transition-colors">
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
    );
  }

  // Sidebar for Checklisty
  if (selectedCurrentNumber && view === 'Checklisty') {
    return (
      <div className="w-72 border-l border-gray-200 bg-[#f8f9fa] flex flex-col fixed right-0 top-0 bottom-0 z-20 shadow-xl transition-all">
        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <h2 className="font-bold text-gray-800">Szczegóły</h2>
          <button onClick={onCloseCurrentNumber} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-4">
            <div className="text-center bg-white p-6 rounded border border-gray-100 shadow-sm flex flex-col items-center">
               <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-4xl">☑</span>
               </div>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{selectedCurrentNumber.name}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              {[
                { label: 'Nazwa', value: selectedCurrentNumber.name },
                { label: 'Data utworzenia', value: selectedCurrentNumber.createdAt },
                { label: 'Ostatnia edycja', value: selectedCurrentNumber.updatedAt || selectedCurrentNumber.createdAt },
                { label: 'Liczba kroków', value: selectedCurrentNumber.stepsCount },
                { label: 'Wersja', value: selectedCurrentNumber.version, status: true },
                { label: 'Opis', value: '-' }
              ].map((item, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-2">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
                  <p className={`text-sm font-medium ${item.status ? 'text-orange-500' : 'text-gray-700'}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 mt-auto pb-4 pt-10">
            <button 
              onClick={onPreviewCurrentNumber} // using this as 'onEdit' trigger for Checklisty
              className="w-full flex items-center justify-center px-4 py-2.5 bg-[#007bff] text-white rounded text-[11px] font-bold shadow-sm hover:bg-blue-600 transition-colors uppercase tracking-tight"
            >
              <Edit2 size={16} className="mr-3" />
              EDYTUJ
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2.5 bg-red-600 text-white rounded text-[11px] font-bold shadow-sm hover:bg-red-700 transition-colors uppercase tracking-tight">
              <Trash2 size={16} className="mr-3" />
              USUŃ
            </button>
            
            <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase mt-12 py-4 border-t border-gray-100">
               <span>Piotr Nowak</span>
               <span className="text-[#007bff] underline">Rola Admina</span>
            </div>
             <div className="flex items-center space-x-2 text-[10px] text-gray-400">
               <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  PN
               </span>
               <div className="flex flex-col">
                  <span>02.11.2023, 11:23</span>
                  <span className="text-[#007bff] underline">Logi serwera</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TableSidebar;
