const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a lesson title'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Please add content'],
    },
    type: {
        type: String,
        enum: ['video', 'document', 'reading'],
        default: 'video',
    },
    duration: String,
    resources: [String],
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Lesson', lessonSchema);
