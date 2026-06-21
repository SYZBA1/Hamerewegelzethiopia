const Lesson = require('../models/Lesson');

// Helper to extract YouTube Video ID
const extractYoutubeId = (url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
};

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

        // Extract YouTube ID if URL provided
        if (req.body.videoUrl) {
            const videoId = extractYoutubeId(req.body.videoUrl);
            if (!videoId && req.body.type === 'video') {
                return res.status(400).json({ success: false, message: 'Please enter a valid YouTube video URL.' });
            }
            req.body.videoId = videoId;
        }

        const lesson = await Lesson.create(req.body);
        res.status(201).json({ success: true, data: lesson });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update lesson
// @route   PUT /api/v1/lessons/:id
// @access  Private (Instructor/Admin)
exports.updateLesson = async (req, res, next) => {
    try {
        let lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ success: false, message: 'Lesson not found' });
        }

        // Extract YouTube ID if URL updated
        if (req.body.videoUrl) {
            const videoId = extractYoutubeId(req.body.videoUrl);
            if (!videoId && (req.body.type === 'video' || lesson.type === 'video')) {
                return res.status(400).json({ success: false, message: 'Please enter a valid YouTube video URL.' });
            }
            req.body.videoId = videoId;
        }

        lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: lesson });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete lesson
// @route   DELETE /api/v1/lessons/:id
// @access  Private (Instructor/Admin)
exports.deleteLesson = async (req, res, next) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ success: false, message: 'Lesson not found' });
        }
        await lesson.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
