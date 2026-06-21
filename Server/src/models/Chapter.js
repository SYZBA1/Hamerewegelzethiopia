const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a chapter title'],
        trim: true,
    },
    description: {
        type: String,
    },
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

module.exports = mongoose.model('Chapter', chapterSchema);
