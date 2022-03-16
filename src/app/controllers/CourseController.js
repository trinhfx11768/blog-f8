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
        req.body.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
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
        //delete là soft-delete plugin
        Course.delete({_id: req.params._id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /courses/:_id/force
    destroy(req, res, next) {
        Course.deleteOne({_id: req.params._id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /courses/:_id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params._id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[POST] /courses/handle-action-forms
    handleActionForms(req, res, next) {
        switch (req.body.action) { 
            case 'delete': 
                Course.delete({_id: { $in: req.body.courseIds }})
                    .then(() => res.redirect('back'))
                    .catch(next);            
            break;

            case 'restore':
                Course.restore({_id: { $in: req.body.courseIds }})
                    .then(() => res.redirect('back'))
                    .catch(next);
            break;

            default: 
                res.json({ Error: 'Invalid action' });
            
        }        
    }
    
}

module.exports = new CourseController;