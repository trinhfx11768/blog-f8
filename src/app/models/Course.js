const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, },
    description: { type: String, maxlength: 600 },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    videoID: { type: String },
    level: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);