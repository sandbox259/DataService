import React, { useState } from 'react';
import styles from '../styles/DataPage.module.css';
import { uploadFile } from '../services/uploadService';

function DataPage() {
  const [file, setFile] = useState(null);
  const [queryUIVisible, setQueryUIVisible] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const response = await uploadFile(file);
      console.log('File uploaded successfully', response);
      setQueryUIVisible(true);
    } catch (error) {
      console.error('Upload failed', error);
    }
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
          <p>(Coming next: filter builder, preview table)</p>
        </div>
      )}
    </div>
  );
}

export default DataPage;