const express = require('express');
const { uploadBookFiles, uploadFile } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book', protect, authorize('admin'), uploadBookFiles);
router.post('/', protect, authorize('instructor', 'admin'), uploadFile);

module.exports = router;
