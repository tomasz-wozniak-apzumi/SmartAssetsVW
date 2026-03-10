import React, { useState } from 'react';
import { X, Save, FileUp, ChevronDown } from 'lucide-react';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (doc: { name: string; type: string }) => void;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-800">Dodaj dokument</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* File Input Mockup */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Plik</label>
            <div className="flex items-center space-x-0 border-2 border-dashed border-gray-200 rounded p-1">
              <div className="flex-1 px-3 py-2 text-gray-400 text-sm">
                Brak pliku
              </div>
              <button className="flex items-center px-4 py-2 bg-[#007bff] text-white rounded text-xs font-bold hover:bg-blue-600 transition-all">
                <FileUp size={16} className="mr-2" />
                WYBIERZ PLIK
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Nazwa</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nazwa"
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Typ dokumentu</label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer text-gray-600"
              >
                <option value="">Typ dokumentu</option>
                <option value="CHECKLIST">Checklista</option>
                <option value="PHOTO">Zdjęcie</option>
                <option value="TECHNICAL">Dokumentacja techniczna</option>
                <option value="OTHER">Inny</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="flex items-center px-10 py-2.5 border border-[#007bff] text-[#007bff] rounded text-sm font-bold hover:bg-blue-50 transition-all uppercase tracking-tight"
          >
            <X size={20} className="mr-2" />
            ANULUJ
          </button>
          <button
            onClick={() => onSave({ name, type })}
            className="flex items-center px-10 py-2.5 bg-[#007bff] text-white rounded text-sm font-bold hover:bg-blue-600 transition-all shadow-md uppercase tracking-tight"
          >
            <Save size={20} className="mr-2" />
            ZAPISZ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentModal;
