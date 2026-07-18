import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import SemanticSearch from './components/SemanticSearch';
import Reporting from './components/Reporting';
import { FilterProvider } from './contexts/FilterContext';

const SavedItemsPlaceholder: React.FC = () => (
    <div className="text-center p-10 bg-nasa-dark-soft rounded-lg border border-nasa-border">
        <h1 className="text-2xl font-bold">Saved Items</h1>
        <p className="text-nasa-medium-gray mt-2">No saved items yet. Comparisons and other items you save will appear here.</p>
    </div>
);

const App: React.FC = () => {
  return (
    <FilterProvider>
      <HashRouter>
        <div className="flex h-screen bg-nasa-dark text-nasa-light-gray">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-nasa-dark p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/saved-items" element={<SavedItemsPlaceholder />} />
                <Route path="/semantic-search" element={<SemanticSearch />} />
                <Route path="/reporting" element={<Reporting />} />
              </Routes>
            </main>
          </div>
        </div>
      </HashRouter>
    </FilterProvider>
  );
};

export default App;