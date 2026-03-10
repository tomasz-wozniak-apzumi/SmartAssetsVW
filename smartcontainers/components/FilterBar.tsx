import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { ViewType } from '../types';

interface FilterBarProps {
  view: ViewType;
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  mockData: {
    containerNumbers: string[];
    statuses: string[];
    locations: string[];
    verifications: string[];
  };
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  view, 
  filters, 
  onFilterChange, 
  onClearFilters, 
  hasActiveFilters,
  mockData
}) => {
  if (view !== 'Dane podstawowe' && view !== 'Numery bieżące' && view !== 'Serwis') return null;

  if (view === 'Dane podstawowe') {
    return null; // No filters for basic data as requested
  }

  const renderDropdown = (label: string, key: string, options: string[]) => (
    <div className="relative inline-block text-left">
      <select
        value={filters[key] || 'all'}
        onChange={(e) => onFilterChange(key, e.target.value)}
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

  if (view === 'Serwis') {
    return (
      <div className="flex flex-wrap items-center gap-2 mb-4 px-2">
        {renderDropdown('Status zgłoszenia', 'ticketStatus', ['Otwarty', 'Zamknięty'])}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 px-2">
      {renderDropdown('Numer kontenera', 'number', mockData.containerNumbers)}
      {renderDropdown('Status', 'status', mockData.statuses)}
      {renderDropdown('Lokalizacja', 'location', mockData.locations)}
      {renderDropdown('Weryfikacja', 'verification', mockData.verifications)}
      {renderDropdown('Typ kontenera', 'type', ['MANUAL', 'AUTOMATIC'])}

      {hasActiveFilters && (
        <button 
          onClick={onClearFilters}
          className="flex items-center px-2 py-1.5 text-xs text-red-500 hover:bg-red-50 rounded transition-colors"
        >
          <X size={14} className="mr-1" />
          Wyczyść filtry
        </button>
      )}
    </div>
  );
};

export default FilterBar;
