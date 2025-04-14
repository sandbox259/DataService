// --- src/components/DataTable.jsx ---
import React from 'react';
import styles from '../styles/DataTable.module.css';

function DataTable({ data }) {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  const columns = Object.keys(data[0]);
  const previewRows = data.slice(0, 15); // Show top 15 rows

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {previewRows.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
