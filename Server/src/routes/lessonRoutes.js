const express = require('express');
const { getLessons, createLesson } = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getLessons)
    .post(protect, authorize('instructor', 'admin'), createLesson);

module.exports = router;
