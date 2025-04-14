import React, { useState } from 'react';
import styles from '../styles/QueryBuilder.module.css';

function QueryBuilder({ columns, onApply }) {
  const [filters, setFilters] = useState([{ column: '', operator: '=', value: '' }]);

  const handleChange = (index, key, value) => {
    const updated = [...filters];
    updated[index][key] = value;
    setFilters(updated);
  };

  const addFilter = () => {
    setFilters([...filters, { column: '', operator: '=', value: '' }]);
  };

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className={styles.builder}>
      <h4>Build Your Query</h4>
      {filters.map((filter, index) => (
        <div key={index} className={styles.filterRow}>
          <select value={filter.column} onChange={(e) => handleChange(index, 'column', e.target.value)}>
            <option value="">Select Column</option>
            {columns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>

          <select value={filter.operator} onChange={(e) => handleChange(index, 'operator', e.target.value)}>
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
        </div>
      ))}
      <button onClick={addFilter} className={styles.addButton}>+ Add Filter</button>
      <button onClick={handleApply} className={styles.applyButton}>Apply Query</button>
    </div>
  );
}

export default QueryBuilder;
