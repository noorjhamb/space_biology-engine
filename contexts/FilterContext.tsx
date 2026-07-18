import React, { createContext, useState, ReactNode } from 'react';

interface FilterState {
  species: string;
  exposure: string;
  organSystem: string;
}

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  selectedStudies: string[];
  setSelectedStudies: React.Dispatch<React.SetStateAction<string[]>>;
}

const defaultState: FilterContextType = {
  filters: {
    species: '',
    exposure: '',
    organSystem: '',
  },
  setFilters: () => {},
  selectedStudies: [],
  setSelectedStudies: () => {},
};

export const FilterContext = createContext<FilterContextType>(defaultState);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(defaultState.filters);
  const [selectedStudies, setSelectedStudies] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ filters, setFilters, selectedStudies, setSelectedStudies }}>
      {children}
    </FilterContext.Provider>
  );
};