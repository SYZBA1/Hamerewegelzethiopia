const express = require('express');
const { getCourses, getCourse, createCourse } = require('../controllers/courseController');

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
    .get(getCourse);

module.exports = router;
