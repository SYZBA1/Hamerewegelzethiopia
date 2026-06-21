const express = require('express');
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse, enrollCourse } = require('../controllers/courseController');
const { getProgress, updateProgress } = require('../controllers/progressController');

// Include other resource routers
const lessonRouter = require('./lessonRoutes');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

// Re-route into other resource routers
router.use('/:courseId/lessons', lessonRouter);

router
    .route('/')
    .get(getCourses)
    .post(protect, authorize('instructor', 'admin'), createCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(protect, authorize('instructor', 'admin'), updateCourse)
    .delete(protect, authorize('instructor', 'admin'), deleteCourse);

router.post('/:id/enroll', protect, enrollCourse);

router.get('/:courseId/progress', protect, getProgress);
router.post('/:courseId/lessons/:lessonId/complete', protect, updateProgress);

module.exports = router;
