import React, { useState } from 'react';
import { ClipboardCheck, Edit2, Trash2, Eye, Upload, Download, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import AddDocumentModal from './AddDocumentModal';

import { AssetType } from '../types';

interface CurrentNumberPreviewProps {
  data: any;
  onClose: () => void;
  currentAsset?: AssetType;
}

const CurrentNumberPreview: React.FC<CurrentNumberPreviewProps> = ({ data, onClose, currentAsset }) => {
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-y-auto">
      <AddDocumentModal 
        isOpen={isAddDocOpen} 
        onClose={() => setIsAddDocOpen(false)} 
        onSave={(doc) => {
          console.log('Saved document:', doc);
          setIsAddDocOpen(false);
        }}
      />
      
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
            onClick={onClose}
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
              <p className="text-sm font-medium">{data.containerNumber}</p>
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-semibold mb-1">Nazwa kontenera</label>
              <p className="text-sm font-medium">{data.containerName}</p>
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-semibold mb-1">Okres weryfikacji</label>
              <p className="text-sm font-medium">180 dni</p>
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-semibold mb-1">Typ kontenera</label>
              <p className="text-sm font-medium">{data.type}</p>
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
              {currentAsset !== 'Regały' && (
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1">Numer bieżący</label>
                  <p className="text-sm font-medium">{data.currentNumber}</p>
                </div>
              )}
              {currentAsset !== 'Regały' && (
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1">Lokalizacja</label>
                  <p className="text-sm font-medium">{data.location}</p>
                </div>
              )}
              <div>
                <label className="block text-[10px] text-gray-400 font-semibold mb-1">Właściciel</label>
                <p className="text-sm font-medium">{data.owner}</p>
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 font-semibold mb-1">Producent</label>
                <p className="text-sm font-medium">{data.producer}</p>
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 font-semibold mb-1">Status</label>
                <span className="text-green-600 text-sm font-bold">{data.status}</span>
              </div>
              {currentAsset !== 'Regały' && (
                <div>
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1">Wersja</label>
                  <p className="text-sm font-medium">{data.version}</p>
                </div>
              )}
              <div>
                <label className="block text-[10px] text-gray-400 font-semibold mb-1">Data produkcji</label>
                <p className="text-sm font-medium">-</p>
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 font-semibold mb-1">Następna weryfikacja</label>
                <p className="text-sm font-medium">{data.nextVerification}</p>
              </div>
            </div>
            <div className="w-48 text-center shrink-0">
              <label className="block text-[10px] text-gray-400 font-semibold mb-2 uppercase">KOD QR</label>
              <div className="bg-white p-2 border border-gray-100 rounded-lg inline-block shadow-sm">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=514488_38" alt="QR Code" className="w-24 h-24" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">{data.qrCode}</p>
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
            <button 
              onClick={() => setIsAddDocOpen(true)}
              className="flex items-center px-4 py-1.5 bg-[#007bff] text-white rounded text-[10px] font-bold hover:bg-blue-600 transition-all"
            >
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

        <hr className="border-gray-100" />

        {/* History Section */}
        <section className="pb-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">HISTORIA</h2>
          <div className="border border-gray-100 rounded">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-[#f8f9fa] border-b border-gray-100">
                <tr>
                  <th className="px-4 py-2 font-semibold text-gray-500">Autor</th>
                  <th className="px-4 py-2 font-semibold text-gray-500">Rodzaj</th>
                  <th className="px-4 py-2 font-semibold text-gray-500">Opis</th>
                  <th className="px-4 py-2 font-semibold text-gray-500">Data dodania</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { autor: 'Jan Kowalski', rodzaj: 'Zmiana statusu', opis: 'W użyciu → Zablokowany', data: '29.03.2023, 10:23' },
                  { autor: 'Michał Malinowski', rodzaj: 'Zmiana statusu', opis: 'Nowy → W użyciu', data: '29.03.2023, 10:15' },
                  { autor: 'Piotr Nowak', rodzaj: 'Zmiana kodu QR', opis: '514488_1292 → 514489_109266', data: '02.06.2022, 14:04' },
                  { autor: 'Adam Adamski', rodzaj: 'Zmiana statusu', opis: 'W użyciu → Nowy', data: '29.03.2021, 11:13' },
                  { autor: 'Krzysztof Woźniak', rodzaj: 'Lista kontrolna wykonana', opis: 'Tak', data: '29.03.2021, 11:12' }
                ].map((entry, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-medium">{entry.autor}</td>
                    <td className="px-4 py-3 text-gray-600">{entry.rodzaj}</td>
                    <td className="px-4 py-3 text-gray-600">{entry.opis}</td>
                    <td className="px-4 py-3 text-gray-500">{entry.data}</td>
                    <td className="px-4 py-3 text-right">
                      <Eye size={16} className="text-[#007bff] cursor-pointer inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2">
            <span>Pokazywane 1 do 5 z 7 elementów (2 strony).</span>
            <div className="flex items-center bg-[#f0f2f5] rounded overflow-hidden">
                <button className="p-1 px-2 hover:bg-gray-200 text-gray-400"><ChevronsLeft size={12} /></button>
                <button className="p-1 px-2 hover:bg-gray-200 text-gray-400"><ChevronLeft size={12} /></button>
                <button className="px-3 py-1 bg-white text-[#007bff] font-bold border-x border-gray-100">1</button>
                <button className="p-1 px-2 hover:bg-gray-200 text-gray-400"><ChevronRight size={12} /></button>
                <button className="p-1 px-2 hover:bg-gray-200 text-gray-400"><ChevronsRight size={12} /></button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CurrentNumberPreview;
