const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');

// @desc    Get progress for a course
// @route   GET /api/v1/courses/:courseId/progress
// @access  Private
exports.getProgress = async (req, res, next) => {
    try {
        let progress = await Progress.findOne({
            user: req.user.id,
            course: req.params.courseId
        });

        if (!progress) {
            // Create initial progress record if it doesn't exist
            progress = await Progress.create({
                user: req.user.id,
                course: req.params.courseId,
                completedLessons: []
            });
        }

        res.status(200).json({
            success: true,
            data: progress
        });
    } catch (err) {
        console.error('Get Progress Error:', err);
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Mark lesson as completed
// @route   POST /api/v1/courses/:courseId/lessons/:lessonId/complete
// @access  Private
exports.updateProgress = async (req, res, next) => {
    try {
        const { courseId, lessonId } = req.params;

        console.log(`Updating progress for User: ${req.user.id}, Course: ${courseId}, Lesson: ${lessonId}`);

        let progress = await Progress.findOne({
            user: req.user.id,
            course: courseId
        });

        if (!progress) {
            progress = new Progress({
                user: req.user.id,
                course: courseId,
                completedLessons: []
            });
        }

        // Add lesson to completed if not already there
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
        }

        progress.lastLesson = lessonId;
        progress.updatedAt = Date.now();

        await progress.save();

        res.status(200).json({
            success: true,
            data: progress
        });
    } catch (err) {
        console.error('Update Progress Error:', err);
        res.status(400).json({ success: false, message: err.message });
    }
};
