var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator');
var httpResponse = require('express-http-response');
var Campus = require('../../models/campus');
var Degree = require('../../models/degree');
var auth = require('../auth');

router.param('slug', (req, res, next, slug) => {
    Degree.findOne({slug: slug}, (err, degree) => {
        if(!err && degree !==null){
            req.degree = degree;
            return next();
        }
        next(new httpResponse.BadRequestResponse('Degree not found!'));
        next();
    });
});

router.get('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    next(new httpResponse.OkResponse(req.degree));
});

router.post('/', auth.isToken, auth.isUser, auth.isAdmin, 

body('name').not().isEmpty(),
body('campus').not().isEmpty(),
(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    let degree = new Degree();
    degree.name = req.body.name;

    Campus.findOne({slug: req.body.campus}, (err, campus) => {
        if(!err && campus !== null){
            campus.degrees.push(degree._id);
            campus.save((err, data) => {
                degree.save((err, degree) => {
                    if(err){
                        next(new httpResponse.BadRequestResponse(err));
                        return;
                    }
                    next(new httpResponse.OkResponse(degree));
                });
            });
        }
        else{
            next(new httpResponse.BadRequestResponse('Campus not exist'));
        }
    });

});

router.put('/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    if(typeof req.body.name !== 'undefined' && req.body.name !== null){
        req.degree.name = req.body.name;
    }

    req.degree.save();

    next(new httpResponse.OkResponse(req.degree));
});

router.delete('/:slug', auth.isToken, auth.isUser, auth.isAdmin, (req, res, next) => {
    Campus.findOne({degrees: req.degree._id}, (err, campus) => {
        if(!err && campus !== null){
            campus.degrees.pull(req.degree._id);
            campus.save((err, data) => {
                req.degree.remove();
                next(new httpResponse.OkResponse('Degree Deleted'));
            });
        }
        else{
            next(new httpResponse.BadRequestResponse('Campus not exist'));
        }
    });
});


module.exports = router;