const fs = require('fs');
const  { parse } = require('csv-parse');

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const data = [];
    const columns = new Set();

    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (row) => {
        data.push(row);
        Object.keys(row).forEach(col => columns.add(col));
      })
      .on('end', () => {
        resolve({ columns: Array.from(columns), data });
      })
      .on('error', reject);
  });
};

module.exports = parseCSV;