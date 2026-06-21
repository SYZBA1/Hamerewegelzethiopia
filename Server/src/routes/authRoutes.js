const express = require('express');
const {
    register,
    login,
    logout,
    getMe,
    updateDetails,
    getAdminStats,
    getInstructorStats,
    inviteTeacher,
} = require('../controllers/authController');

const router = express.Router();

const { 
    protect,
    authorize
} = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.get('/admin/stats', protect, authorize('admin'), getAdminStats);
router.get('/instructor/stats', protect, authorize('instructor'), getInstructorStats);
router.post('/admin/invite-teacher', protect, authorize('admin'), inviteTeacher);

module.exports = router;
