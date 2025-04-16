import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function DashboardPage() {
  const { filteredData, columns } = useContext(DataContext);

  if (!filteredData || filteredData.length === 0) {
    return <p style={{ padding: '2rem' }}>No data to display. Please upload and filter data first.</p>;
  }

  const numericColumns = columns.filter(col =>
    !isNaN(filteredData[0][col]) && filteredData.every(row => !isNaN(row[col]))
  );

  const chartData = filteredData.slice(0, 10); // Limit to 10 rows for clarity

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      {numericColumns.map((col) => (
        <div key={col} style={{ marginBottom: '2rem' }}>
          <h4>{col}</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey={columns[0]} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={col} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;
