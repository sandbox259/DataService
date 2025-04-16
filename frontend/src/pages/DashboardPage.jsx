import React, { useContext, useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';
import styles from '../styles/DashboardPage.module.css';
import { DataContext } from '../context/DataContext';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a9a9a9', '#8dd1e1'];

function DashboardPage() {
  const { filteredData } = useContext(DataContext);
  const [xAxisKey, setXAxisKey] = useState('');
  const [yAxisKey, setYAxisKey] = useState('');
  const [chartType, setChartType] = useState('Bar');
  const chartRef = useRef();

  useEffect(() => {
    if (filteredData.length > 0) {
      const keys = Object.keys(filteredData[0]);
      setXAxisKey(keys[0]);
      setYAxisKey(keys.find(k => k !== keys[0]));
    }
  }, [filteredData]);

  const renderChart = () => {
    if (!xAxisKey || !yAxisKey) return null;

    const commonProps = {
      width: '100%',
      height: 400,
    };

    switch (chartType) {
      case 'Bar':
        return (
          <ResponsiveContainer {...commonProps}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yAxisKey} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'Line':
        return (
          <ResponsiveContainer {...commonProps}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yAxisKey} stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'Pie':
        return (
          <ResponsiveContainer {...commonProps}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={filteredData}
                dataKey={yAxisKey}
                nameKey={xAxisKey}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const handleDownload = async () => {
    const chartNode = chartRef.current;
    if (!chartNode) return;

    const canvas = await html2canvas(chartNode);
    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = image;
    link.download = `chart-${chartType.toLowerCase()}.png`;
    link.click();
  };

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className={styles.container}>
        <h2>Dashboard</h2>
        <p>No data available for visualization. Please upload a file and apply queries first.</p>
      </div>
    );
  }

  const columnOptions = Object.keys(filteredData[0]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Data Visualization Dashboard</h2>

      <div className={styles.controls}>
        <label>
          X-Axis:
          <select value={xAxisKey} onChange={(e) => setXAxisKey(e.target.value)}>
            {columnOptions.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </label>

        <label>
          Y-Axis:
          <select value={yAxisKey} onChange={(e) => setYAxisKey(e.target.value)}>
            {columnOptions.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </label>

        <label>
          Chart Type:
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="Bar">Bar</option>
            <option value="Line">Line</option>
            <option value="Pie">Pie</option>
          </select>
        </label>
      </div>

      <div ref={chartRef} className={styles.chartArea}>
        {renderChart()}
      </div>

      <button onClick={handleDownload} className={styles.downloadButton}>
        Save Chart as Image
      </button>
    </div>
  );
}

export default DashboardPage;
