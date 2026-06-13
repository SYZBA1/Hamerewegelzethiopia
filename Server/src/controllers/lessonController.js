const Lesson = require('../models/Lesson');

// @desc    Get all lessons for a course
// @route   GET /api/v1/courses/:courseId/lessons
// @access  Public
exports.getLessons = async (req, res, next) => {
    try {
        const lessons = await Lesson.find({ course: req.params.courseId }).sort('order');
        res.status(200).json({ success: true, count: lessons.length, data: lessons });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Create new lesson
// @route   POST /api/v1/courses/:courseId/lessons
// @access  Private (Instructor/Admin)
exports.createLesson = async (req, res, next) => {
    try {
        req.body.course = req.params.courseId;
        const lesson = await Lesson.create(req.body);
        res.status(201).json({ success: true, data: lesson });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
