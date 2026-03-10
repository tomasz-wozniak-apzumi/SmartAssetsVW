import React, { useState } from 'react';
import { Plus, GripVertical, FileUp, BookOpen, Trash2 } from 'lucide-react';

interface ChecklistEditorProps {
  onClose: () => void;
  onSave: () => void;
}

const ChecklistEditor: React.FC<ChecklistEditorProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('test');
  const [description, setDescription] = useState('');
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: 'Krok 1', desc: 'asdasd' },
    { id: 2, title: 'Krok 2', desc: 'Krok pierwszy - sprawdzenie regału' }
  ];

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white z-10 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded border border-gray-100 shadow-sm">
             <span className="text-gray-400">☑</span>
             <h1 className="text-sm font-bold text-gray-800">Edycja listy kontrolnej</h1>
             <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-bold">v1 - WERSJA ROBOCZA</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onSave}
            className="flex items-center px-6 py-2 bg-[#007bff] text-white rounded text-xs font-bold hover:bg-blue-600 transition-all shadow-sm"
          >
            ZAPISZ
          </button>
          <button 
            onClick={onClose}
            className="flex items-center px-6 py-2 border border-[#007bff] text-[#007bff] rounded text-xs font-bold hover:bg-blue-50 transition-all shadow-sm"
          >
            ANULUJ
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6 bg-[#f8f9fa]">
        
        {/* Left Column: Dane Podstawowe */}
        <div className="w-1/3 flex flex-col space-y-4">
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2">DANE PODSTAWOWE</h2>
            
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700">Nazwa</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700">Opis</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Opis"
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700">Ścieżka</label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all">
                  <option>Listy kontrolne / Adamowe / Hubert</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <span className="text-xs">▼</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Kroki */}
        <div className="w-1/4 flex flex-col space-y-4">
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex-1 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-4">
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">KROKI</h2>
              <button className="flex items-center px-3 py-1 bg-[#007bff] text-white rounded-[4px] text-[10px] font-bold hover:bg-blue-600 transition-all">
                <Plus size={14} className="mr-1" strokeWidth={3} /> DODAJ KROK
              </button>
            </div>

            <div className="space-y-2">
              {steps.map(step => (
                <div 
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-start p-3 rounded border cursor-pointer transition-all ${
                    activeStep === step.id 
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm relative overflow-hidden' 
                    : 'border-gray-100 hover:border-blue-200'
                  }`}
                >
                  {activeStep === step.id && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-blue-500 rotate-45" />
                  )}
                  <div className="flex flex-col items-center mr-3 pt-1">
                    <GripVertical size={14} className="text-gray-300 cursor-grab" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-700 uppercase">{step.title}</p>
                    <p className="text-[11px] text-gray-800 font-medium truncate">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Szczegóły Kroku */}
        <div className="flex-1 flex flex-col space-y-4">
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex-1 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-6">
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">SZCZEGÓŁY KROKU</h2>
              <button className="text-[10px] font-bold text-red-500 hover:text-red-600">USUŃ KROK</button>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">Nazwa</label>
                <input
                  type="text"
                  placeholder="Krok pierwszy - sprawdzenie regału"
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">Opis</label>
                <textarea
                  rows={4}
                  placeholder="Sprawdzenie wytrzymałości regału"
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                   <label className="block text-xs font-bold text-gray-700">Multimedia (1)</label>
                   <div className="flex space-x-2">
                     <button className="flex items-center px-4 py-1.5 bg-[#007bff] text-white rounded text-[10px] font-bold hover:bg-blue-600">
                        <FileUp size={14} className="mr-2" /> WYBIERZ PLIK
                     </button>
                     <button className="flex items-center px-4 py-1.5 border border-[#007bff] text-[#007bff] rounded text-[10px] font-bold hover:bg-blue-50">
                        <BookOpen size={14} className="mr-2" /> BAZA WIEDZY
                     </button>
                   </div>
                </div>
                
                <div className="border border-gray-100 rounded p-4 relative inline-block group">
                   <img src="https://picsum.photos/seed/shelf/100/100" className="w-16 h-16 rounded border border-gray-100" alt="Step preview" />
                   <button className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100">
                     <Trash2 size={12} fill="currentColor" fillOpacity={0.1} />
                   </button>
                </div>
                
                <div className="flex items-center py-2 text-gray-300">
                    <div className="w-1 h-1 bg-gray-200 rounded-full" />
                    <div className="flex-1 h-px bg-gray-100 mx-2" />
                    <div className="w-1 h-1 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistEditor;
