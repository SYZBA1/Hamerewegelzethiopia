const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

// @desc    Get all assignments for a course
// @route   GET /api/v1/assignments/course/:courseId
// @access  Public
exports.getAssignments = async (req, res, next) => {
    try {
        const assignments = await Assignment.find({ course: req.params.courseId });
        res.status(200).json({ success: true, count: assignments.length, data: assignments });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Create new assignment
// @route   POST /api/v1/assignments
// @access  Private/Instructor
exports.createAssignment = async (req, res, next) => {
    try {
        req.body.instructor = req.user.id;
        const assignment = await Assignment.create(req.body);
        res.status(201).json({ success: true, data: assignment });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get submissions for an assignment
// @route   GET /api/v1/assignments/:id/submissions
// @access  Private/Instructor
exports.getSubmissions = async (req, res, next) => {
    try {
        const submissions = await Submission.find({ assignment: req.params.id }).populate('student', 'username email');
        res.status(200).json({ success: true, count: submissions.length, data: submissions });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Grade a submission
// @route   PUT /api/v1/assignments/submissions/:id/grade
// @access  Private/Instructor
exports.gradeSubmission = async (req, res, next) => {
    try {
        const submission = await Submission.findByIdAndUpdate(req.params.id, {
            grade: req.body.grade,
            feedback: req.body.feedback,
            status: 'reviewed'
        }, { new: true });

        res.status(200).json({ success: true, data: submission });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
