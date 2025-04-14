const fs = require('fs');
const path = require('path');
const parseExcel = require('../utils/excelParser');
const parseCSV = require('../utils/csvParser');

exports.handleUpload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const ext = path.extname(file.originalname);
    let result = {};

    if (ext === '.csv') {
      result = await parseCSV(file.path);
    } else if (['.xlsx', '.xls'].includes(ext)) {
      result = await parseExcel(file.path);
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    fs.unlinkSync(file.path); // remove temp file
    res.json(result);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};