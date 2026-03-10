import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DataTable from './components/DataTable';
import BottomNav from './components/BottomNav';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('Dane podstawowe');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 flex flex-col min-w-0">
        <DataTable 
          view={currentView} 
        />
        <BottomNav currentView={currentView} />
      </main>
    </div>
  );
};

export default App;