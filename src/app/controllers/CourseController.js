const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {

    //[GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {course: mongooseToObject(course)});
            })
            .catch(next);      
    }

    //[GET] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /course/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`;
        const course = new Course(formData);
        course.save();
        res.send('SAVE');
    }

    //[GET] /course/:_id/edit
    edit(req, res, next) {
        Course.findById(req.params._id)
            .then(course => res.render('courses/edit', {course: mongooseToObject(course)}))
            .catch(next);
    }

    //[PUT] /courses/:_id
    update(req, res, next) {
        Course.updateOne({_id: req.params._id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /courses/:_id
    delete(req, res, next) {
        Course.deleteOne({_id: req.params._id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController;