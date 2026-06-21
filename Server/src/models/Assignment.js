const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add an assignment title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    dueDate: {
        type: Date,
        required: [true, 'Please add a due date'],
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true,
    },
    instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    attachments: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
