const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number, },
        name: { type: String, },
        description: { type: String, maxlength: 600 },
        image: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        videoID: { type: String },
        level: { type: String },
        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
        // = timestamps = true
    }, 
    {
        //false để mongoose k can thiệp cái trường _id nữa
        _id: false,
        timestamps: true
    }
);

//Add plugins
Course.plugin(AutoIncrement);
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt: true 
});

module.exports = mongoose.model('Course', Course);