const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {

    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        
        let courseQuery = Course.find({});

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {deletedCount, courses: mutipleMongooseToObject(courses)})
            })
            .catch(next);

            // 2 cái Promise này đã dc gộp lại cái Promise.all
        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {courses: mutipleMongooseToObject(courses)}))
        //     .catch(next);        
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        
        let courseQuery = Course.findDeleted({});

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }
        courseQuery
            .then(courses => res.render('me/trash-courses', {courses: mutipleMongooseToObject(courses)}))
            .catch(next);
    }

}

module.exports = new MeController;