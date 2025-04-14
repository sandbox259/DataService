const xlsx = require('xlsx');

const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  return { columns, data };
};

module.exports = parseExcel;