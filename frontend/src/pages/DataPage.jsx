import React, { useState } from 'react';
import styles from '../styles/DataPage.module.css';
import { uploadFile } from '../services/uploadService';
import QueryBuilder from '../components/QueryBuilder';
import DataTable from '../components/DataTable';
import { useDataContext } from '../context/DataContext';

function DataPage() {
  /*const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [queryUIVisible, setQueryUIVisible] = useState(false); */

  const {
    file, setFile,
    columns, setColumns,
    data, setData, 
    filteredData, setFilteredData,
    queryUIVisible, setQueryUIVisible
  } = useDataContext();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const response = await uploadFile(file);
      console.log('File uploaded successfully', response);
      setColumns(response.columns);
      setData(response.data);
      setFilteredData(response.data);
      setQueryUIVisible(true);
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  const applyFilters = (filters) => {
    let filtered = [...data];
    filters.forEach(({ column, operator, value }) => {
      if (!column) return;
      filtered = filtered.filter((row) => {
        const cell = row[column]?.toString().toLowerCase();
        const comp = value.toLowerCase();
        switch (operator) {
          case '=':
            return cell === comp;
          case '!=':
            return cell !== comp;
          case '>':
            return parseFloat(cell) > parseFloat(comp);
          case '<':
            return parseFloat(cell) < parseFloat(comp);
          case 'contains':
            return cell.includes(comp);
          default:
            return true;
        }
      });
    });
    setFilteredData(filtered);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload and Query Sales Data</h2>

      <div className={styles.section}>
        <h3>Step 1: Upload Your File</h3>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className={styles.fileInput} />
        <button onClick={handleUpload} className={styles.button}>Upload</button>
      </div>

      {queryUIVisible && (
        <div className={styles.section}>
          <h3>Step 2: Query the Data</h3>
          <QueryBuilder columns={columns} onApply={applyFilters} />
          <DataTable data={filteredData} />
        </div>
      )}
    </div>
  );
}

export default DataPage;