const mongoose = require('mongoose');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { 
            username, email, password,
            phone, gender, dateOfBirth, country, city, address,
            program, department, batch, enrollmentDate, currentSemester,
            profileImage, studentId
        } = req.body;

        // Create user with forced 'student' role
        const user = await User.create({
            username,
            email,
            password,
            role: 'student', // Force student role
            phone,
            gender,
            dateOfBirth,
            country,
            city,
            address,
            program,
            department,
            batch,
            enrollmentDate,
            currentSemester,
            profileImage,
            studentId
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        data: {},
    });
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            country: req.body.country,
            city: req.body.city,
            address: req.body.address,
            profileImage: req.body.profileImage
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            data: {
                _id: user._id,
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
};
// @desc    Get admin statistics
// @route   GET /api/v1/auth/admin/stats
// @access  Private/Admin
exports.getAdminStats = async (req, res, next) => {
    try {
        const studentCount = await User.countDocuments({ role: 'student' });
        const teacherCount = await User.countDocuments({ role: 'instructor' });
        const courseCount = await mongoose.model('Course').countDocuments();

        res.status(200).json({
            success: true,
            data: {
                studentCount,
                teacherCount,
                courseCount,
                pendingAdmissions: 0 // Placeholder for now
            }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get instructor statistics
// @route   GET /api/v1/auth/instructor/stats
// @access  Private/Instructor
exports.getInstructorStats = async (req, res, next) => {
    try {
        const Course = mongoose.model('Course');
        const courses = await Course.find({ instructor: req.user.id });
        const courseIds = courses.map(c => c._id);

        const courseCount = courses.length;
        
        // Sum enrolled students across all courses (unique students)
        const uniqueStudents = new Set();
        courses.forEach(course => {
            course.enrolledStudents?.forEach(studentId => uniqueStudents.add(studentId.toString()));
        });
        const studentCount = uniqueStudents.size;

        // Count lessons across all instructor's courses
        const lessonCount = await mongoose.model('Lesson').countDocuments({ course: { $in: courseIds } });

        res.status(200).json({
            success: true,
            data: {
                courseCount,
                studentCount,
                lessonCount,
                curriculumProgress: 65 // Placeholder
            }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Invite (create) a teacher account
// @route   POST /api/v1/auth/admin/invite-teacher
// @access  Private/Admin
exports.inviteTeacher = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username, email and password'
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const teacher = await User.create({
            username,
            email,
            password,
            role: 'instructor'
        });

        res.status(201).json({
            success: true,
            data: {
                _id: teacher._id,
                id: teacher._id,
                username: teacher.username,
                email: teacher.email,
                role: teacher.role
            }
        });
    } catch (err) {
        next(err);
    }
};
