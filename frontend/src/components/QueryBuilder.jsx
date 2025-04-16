import React, { useState } from 'react';
import styles from '../styles/QueryBuilder.module.css';
import { useDataContext } from '../context/DataContext';

function QueryBuilder({ columns, onApply }) {

    const {
        filters, setFilters,
      } = useDataContext();

  const handleChange = (index, key, value) => {
    const updated = [...filters];
    updated[index][key] = value;
    setFilters(updated);
  };

  const addFilter = () => {
    setFilters([...filters, { column: '', operator: '=', value: '' }]);
  };

  const handleDelete = (index) => {
    const updated = [...filters];
    updated.splice(index, 1);
    setFilters(updated);
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    const reset = [{ column: '', operator: '=', value: '' }];
    setFilters(reset);
    onApply([]); // Clear all filters and show original data
  };

  return (
    <div className={styles.builder}>
      <h4>Build Your Query</h4>
      {filters.map((filter, index) => (
        <div key={index} className={styles.filterRow}>
          <select
            value={filter.column}
            onChange={(e) => handleChange(index, 'column', e.target.value)}
          >
            <option value="">Select Column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>

          <select
            value={filter.operator}
            onChange={(e) => handleChange(index, 'operator', e.target.value)}
          >
            <option value="=">=</option>
            <option value=">">{'>'}</option>
            <option value="<">{'<'}</option>
            <option value="!=">!=</option>
            <option value="contains">contains</option>
          </select>

          <input
            type="text"
            placeholder="Value"
            value={filter.value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
          />

          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(index)}
          >
            ❌
          </button>
        </div>
      ))}

      <button onClick={addFilter} className={styles.addButton}>➕ Add Filter</button>
      <button onClick={handleApply} className={styles.applyButton}>🔍 Apply</button>
      <button onClick={handleReset} className={styles.resetButton}>🔄 Reset</button>
    </div>
  );
}

export default QueryBuilder;
