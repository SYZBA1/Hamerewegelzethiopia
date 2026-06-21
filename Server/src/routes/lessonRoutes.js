const express = require('express');
const { getLessons, createLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getLessons)
    .post(protect, authorize('instructor', 'admin'), createLesson);

router
    .route('/:id')
    .put(protect, authorize('instructor', 'admin'), updateLesson)
    .delete(protect, authorize('instructor', 'admin'), deleteLesson);

module.exports = router;
