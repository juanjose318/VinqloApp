var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var Community = require('../../models/community');
var Category = require('../../models/category');
var User = require('../../models/user');
var auth = require('../auth');

router.param('slug', (req, res, next, slug) => {
    Community.findOne({slug: slug}, (err, community) => {
        if(!err && community !==null){
            req.community = community;
            return next();
        }else {
            next(new httpResponse.BadRequestResponse('Community not found!'));
        }
    })
})
router.get('/:slug', auth.isToken, auth.isUser, async (req, res, next) => {
    req.community.members = await User.find({communities: req.community._id} ).select("firstName lastName email image");
    next(new httpResponse.OkResponse(req.community.toJSONFor(req.user)));
})

router.post('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    if(req.user.communities.indexOf(req.community._id) !== -1){
        next(new httpResponse.BadRequestResponse('You are already a member of this community!'));
        return;
    }
    req.user.communities.push(req.community._id);
    req.community.membersCount++;
    req.user.save((err, user) => {
        req.community.save((err, community) => {
            next(new httpResponse.OkResponse('Community Joined Successfully'));
        });
    });
})

router.post('/leave/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    console.log(req.community);
    if(req.user._id.toString() === req.community.by._id.toString()){
        next(new httpResponse.BadRequestResponse('You can not leave this community as you are creator of this community'));
        return;
    }
    if(req.user.communities.indexOf(req.community._id) === -1){
        next(new httpResponse.BadRequestResponse('You are not a part of this community!'));
        return;
    }
    req.user.communities.pull(req.community._id);
    req.community.membersCount--;
    req.user.save((err, user) => {
        req.community.save((err, community) => {
            next(new httpResponse.OkResponse('Community Left Successfully'));
        });
    });
})

router.post('/', auth.isToken, auth.isUser, 
body('name').not().isEmpty(),
body('category').not().isEmpty()
,(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }
   
    let community = new Community();
    community.name = req.body.name;
    community.by = req.user;
    community.campus = req.user.campus;
    community.degree = req.user.degree;

    Category.findOne({slug: req.body.category}, (err, category) => {

        if(!err && category !== null){
            community.category = category._id;
            req.user.communities.push(community._id);
            req.user.save((err, user) => {
                community.save((err, savedCommunity) => {
                    req.user.communities.push(savedCommunity._id);
                    req.user.save((err, user) => {
                        console.log(err);
                        next(new httpResponse.OkResponse(savedCommunity.toJSON()));
                    })
                });
            });
        }
        else{
            next(new httpResponse.BadRequestResponse('Category not found!'));
        }
    });
})

router.put('/:slug', auth.isToken, auth.isUser, 
body('name').isLength({min: 4})
, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    req.community.name = req.body.name;
    req.community.save();
    next(new httpResponse.OkResponse(req.community));
})

router.delete('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    if(req.user._id.toString() === req.community.by._id.toString()){
        Community.deleteOne({slug: req.params.slug}, (err) => {
            if(!err)
                next(new httpResponse.OkResponse('Community deleted Successfully'));
        });
    }
    else{
        next(new httpResponse.UnauthorizedResponse('You cant delete this community'));
    }
})


router.get('/get/all', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    let query = {}

    if(typeof req.query.status !== 'undefined' && req.query.status !== null){
        query.status = req.query.status;
    }

    Community.paginate(query, options, (err, communities) => {
        if(!err && communities !== null){
            communities.docs = communities.docs.map(community => community.toJSONFor(req.user));
            next(new httpResponse.OkResponse(communities));
        }
        else{
            next(new httpResponse.UnauthorizedResponse(err));
        }
    });
})

router.get('/get/followed', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Community.paginate({_id: { $in: req.user.communities }, status: 1, by: { $ne: req.user._id }}, options, async (err, communities) => {
        if(!err && communities !== null){

            for(var i=0; i<communities.docs.length; i++){
                communities.docs[i].members = await User.find({communities: communities.docs[i]._id} ).select("firstName lastName email image");
            }

            communities.docs = communities.docs.map(community => community.toJSONFor(req.user));
            next(new httpResponse.OkResponse(communities));
        }
        else{
            next(new httpResponse.UnauthorizedResponse(err));
        }
    });
})
router.get('/get/followed-created', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        pagination: false
    };

    Community.paginate(
        { $or:[
             {_id: { $in: req.user.communities }},
             {by: req.user._id, status: 1}
            ]}, options, async (err, communities) => {
        if(!err && communities !== null){

            for(var i=0; i<communities.docs.length; i++){
                communities.docs[i].members = await User.find({communities: communities.docs[i]._id} ).select("firstName lastName email image");
            }

            communities.docs = communities.docs.map(community => community.toJSONFor(req.user));
            next(new httpResponse.OkResponse(communities));
        }
        else{
            next(new httpResponse.UnauthorizedResponse(err));
        }
    });
})

router.get('/get/my', auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    Community.paginate({by: req.user._id, status: 1}, options, async (err, communities) => {
        if(!err && communities !== null){

            for(var i=0; i<communities.docs.length; i++){
                communities.docs[i].members = await User.find({communities: communities.docs[i]._id} ).select("firstName lastName email image");
            }

            communities.docs = communities.docs.map(community => community.toJSONFor(req.user));
            next(new httpResponse.OkResponse(communities));
        }
        else{
            next(new httpResponse.UnauthorizedResponse(err));
        }
    });
})

router.get('/get/academics', auth.isToken, auth.isUser, async (req, res, next) => {
    var query = {};
    query.campus = req.user.campus;
    query.degree = req.user.degree;
    query.status = 1;

    if(typeof req.query.category !== 'undefined' && req.query.category !== null){
        const category = await Category.findOne({slug: req.query.category});
        query.category = category._id;
    }

    if(typeof req.query.name !== 'undefined' && req.query.name !== null){
        query.name = new RegExp(req.query.name, 'i');
    }

    var options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        sort: {time: -1}
    };

    if(typeof req.query.type !== 'undefined' && +req.query.type === 1){
        options.sort = {membersCount: -1};
    }

    Community.paginate(query, options, async (err, communities) => {
        if(!err && communities.length !== 0){
            for(var i=0; i<communities.docs.length; i++){
                communities.docs[i].members = await User.find({communities: communities.docs[i]._id} ).select("firstName lastName email image");
            }
            communities.docs = communities.docs.map(community => community.toJSONFor(req.user));
            next(new httpResponse.OkResponse(communities));
        }
        else{
            next(new httpResponse.BadRequestResponse('No Community found'));
        }
    });
});

module.exports = router;

