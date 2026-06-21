const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, getMyStudents, getMyInstructors } = require('../controllers/userController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/my-students', authorize('instructor', 'admin'), getMyStudents);
router.get('/my-instructors', authorize('student', 'admin'), getMyInstructors);

router.route('/')
    .get(authorize('admin'), getUsers)
    .post(authorize('admin'), createUser);

router.route('/:id')
    .put(authorize('admin'), updateUser)
    .delete(authorize('admin'), deleteUser);

module.exports = router;
