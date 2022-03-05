const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {

    //[GET] /Site
    index(req, res, next) {
        // Course.find({}, function (err, courses) {
        //     if(!err) {
        //         res.json(courses);
        //     } else {
        //         res.status(400).json({ err: 'ERROR!' });
        //     }            
        //   });
        // res.render('home');
        Course.find({})
            .then(courses => {                
                res.render('home', { courses: mutipleMongooseToObject(courses) });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
        
    }

}

module.exports = new SiteController;