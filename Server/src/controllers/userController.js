const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.role) {
            query.role = req.query.role;
        }

        const users = await User.find(query);
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Create new user
// @route   POST /api/v1/users
// @access  Public
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get students enrolled in instructor's courses
// @route   GET /api/v1/users/my-students
// @access  Private/Instructor
exports.getMyStudents = async (req, res, next) => {
    try {
        const Course = mongoose.model('Course');
        const courses = await Course.find({ instructor: req.user.id });
        
        // Extract all unique enrolled student IDs
        const studentIds = new Set();
        courses.forEach(course => {
            course.enrolledStudents?.forEach(id => {
                studentIds.add(id.toString());
            });
        });

        const students = await User.find({ _id: { $in: Array.from(studentIds) } })
            .select('-password');

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get instructors of courses the student is enrolled in
// @route   GET /api/v1/users/my-instructors
// @access  Private/Student
exports.getMyInstructors = async (req, res, next) => {
    try {
        const Course = mongoose.model('Course');
        // Find courses where student is enrolled
        const courses = await Course.find({ enrolledStudents: req.user.id })
            .populate('instructor', 'username email profileImage department program');
        
        // Extract unique instructors
        const instructorsMap = new Map();
        courses.forEach(course => {
            if (course.instructor) {
                const instructor = course.instructor;
                instructorsMap.set(instructor._id.toString(), instructor);
            }
        });

        const instructors = Array.from(instructorsMap.values());

        res.status(200).json({
            success: true,
            count: instructors.length,
            data: instructors
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
