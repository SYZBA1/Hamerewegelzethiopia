const express = require('express');
const { 
    getAssignments, 
    createAssignment, 
    getSubmissions,
    gradeSubmission
} = require('../controllers/assignmentController');

const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('instructor', 'admin'), createAssignment);

router.get('/course/:courseId', getAssignments);

router.get('/:id/submissions', protect, authorize('instructor', 'admin'), getSubmissions);

router.put('/submissions/:id/grade', protect, authorize('instructor', 'admin'), gradeSubmission);

module.exports = router;
