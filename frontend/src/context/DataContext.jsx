import React, { createContext, useState, useContext} from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([{ column: '', operator: '=', value: '' }]);
  const [filteredData, setFilteredData] = useState([]);
  const [queryUIVisible, setQueryUIVisible] = useState(false);
  return (
    <DataContext.Provider value={{file, setFile, columns, setColumns, data, setData, filters, setFilters, filteredData, setFilteredData, queryUIVisible, setQueryUIVisible }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
