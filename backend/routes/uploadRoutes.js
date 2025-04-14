const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// backend/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { handleUpload } = require('../controllers/uploadController');

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

router.post('/upload', upload.single('file'), handleUpload);

module.exports = router;