var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator');
var httpResponse = require('express-http-response');
var Campus = require('../../models/campus');
var User = require('../../models/user');
var auth = require('../auth');

router.param('slug', (req, res, next, slug) => {
    Campus.findOne({slug: slug}, (err, campus) => {
        if(!err && campus !==null){
            req.campus = campus;
            User.countDocuments({campus: campus._id}, (err, count) => {
                req.campus.userCount = count;
            });
            return next();
        }
        return next(new httpResponse.BadRequestResponse('Campus not found!'));
    });
});

router.get('/:slug', auth.isToken, auth.isUser, (req, res, next) => {

    next(new httpResponse.OkResponse({campus: req.campus}));
});

router.post('/', auth.isToken, auth.isUser, auth.isAdmin, 

body('name').not().isEmpty(),

(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    let campus = new Campus();
    campus.name = req.body.name;

    campus.save((err, campus) => {
        if(err){
            next(new httpResponse.BadRequestResponse(err));
            return;
        }
        next(new httpResponse.OkResponse({campus: campus}));
    });

});

router.put('/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    if(typeof req.body.name !== 'undefined' && req.body.name !== null){
        req.campus.name = req.body.name;
    }

    req.campus.save();

    next(new httpResponse.OkResponse({campus: req.campus}));
});

router.delete('/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    Campus.deleteOne({slug: req.params.slug}, (err) => {
        if(!err){
            next(new httpResponse.OkResponse('Campus Deleted!'));
        }
    });
});

router.get('/get/all', auth.isToken, auth.isUser, async(req, res, next) =>{
    var campuses = await Campus.find({});

    for(var i=0; i<campuses.length; i++){
        // campuses[i].members = await User.find({campus:campuses[i]._id}).select("firstName lastName email image");
        // console.log(campuses[i]._id);
        for(var j=0; j<campuses[i].degrees.length; j++){
            campuses[i].degrees[j].members = await User.find({degree:campuses[i].degrees[j]._id}).select("firstName lastName email image");
        }
    }


    next(new httpResponse.OkResponse({campuses:campuses}));
});

module.exports = router;