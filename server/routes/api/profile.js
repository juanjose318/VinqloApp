var express = require('express');
var router = express.Router();
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var User = require('../../models/user');
var Post = require('../../models/post');
var Community = require('../../models/community');
var auth = require('../auth');

router.param('email', (req, res, next, email) => {
    User.findOne({ email: email }, (err, user) => {
        console.log(err);
        if (!err && user !== null) {
            req.User = user;
            return next();
        }
        return next( httpResponse.BadRequestResponse('User not exist'));
    });
});

router.get('/:email', auth.isToken, auth.isUser, (req, res, next) => {
    next(new httpResponse.OkResponse({user: req.User}));
});

router.get('/community/:email', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Community.paginate({_id: { $in: req.User.communities }}, options, (err, communities) => {
        if(!err){
            next(new httpResponse.OkResponse({communities: communities}));
        }
    });
});

router.get('/post/:email', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Post.paginate({by: req.User._id}, options, (err, posts) => {
        if(!err){
            next(new httpResponse.OkResponse({posts: posts}));
        }
    });
});


module.exports = router;