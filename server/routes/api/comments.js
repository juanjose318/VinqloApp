var express = require('express');
var router = express.Router();
var httpResponse = require('express-http-response');
var { body, validationResult } = require('express-validator');
var Comment = require('../../models/comment');
var Post = require('../../models/post');
var User = require('../../models/user');
var Notification = require('../../models/notification');
var auth = require('../auth');
var { sendNotification } = require('../../utilities/notification');

router.param('slug', (req, res, next, slug) => {
    Comment.findOne({slug: slug}, (err, comment) => {
        console.log(err);
        if(!err && comment !==null){
            req.comment = comment;
            return next();
        }
        else next(new httpResponse.BadRequestResponse('Comment not found!'));
    });
});

router.get('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    next(new httpResponse.OkResponse(req.comment));
});

router.post('/', auth.isToken, auth.isUser, 

body('body').not().isEmpty(),
body('post').not().isEmpty(),
async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new httpResponse.BadRequestResponse(JSON.stringify(errors.array())));
        return
    }

    let comment = new Comment();
    comment.body = req.body.body;
    comment.by = req.user._id;

    Post.findOne({slug: req.body.post}, (err, post) => {
        if(!err && post !== null){
            post.comments.push(comment);
            post.save((err, post) => {
                comment.save(async (err, comment) => {
                    
                    var rawData = req.body.body.split("[[");
                    console.log(req.body.body)
                    
                    if(rawData.length > 1){
                        
                        for(var i=1; i<rawData.length; i++) {
                           
                            var tag = JSON.parse(rawData[i].split("]]")[0]);
                            const user = await User.findOne({email: tag.user.email});
                           
                            if(user){                                
                                sendNotification({
                                    title : `${req.user.firstName} ${req.user.lastName} tagged you in a post`,
                                    type : 2,
                                    user : req.user,
                                    sentTo : user,
                                    data : {slug: post.slug},
                                });
                            }
                        }
                    }
console.log('post.by', post.by._id)
                    sendNotification({
                        title : `${req.user.firstName} ${req.user.lastName} commented on your post`,
                        type : 2,
                        user : req.user._id,
                        sentTo : post.by,
                        data : {slug: post.slug}
                    });

                    next(new httpResponse.OkResponse(comment));
                });
            });
        }
        else{
            next(new httpResponse.BadRequestResponse('Post not found!'));
            next();
        }
    });

});

router.delete('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    if(req.comment.by._id.toString() === req.user._id.toString()){
        Post.findOne({comments: req.comment._id}, (err, post) => {
            if(!err && post !== null){
                post.comments.pull(req.comment._id);
                post.save((err, post) => {
                    req.comment.remove((err, comment) => {
                        next(new httpResponse.OkResponse('Comment Deleted'));
                    });
                });
            }
            else{
                next(new httpResponse.BadRequestResponse('Post not found!'));
                next();
            }
        });
    }
    else{
        next(new httpResponse.UnauthorizedResponse('You are not authorized to delete this comment'));
    }
});

router.put('/:slug', auth.isToken, auth.isUser, (req, res, next) => {
    if(req.comment.by._id.toString() === req.user._id.toString()){
        if(typeof req.body.body !== 'undefined' && req.body.body !== null){
            req.comment.body = req.body.body;
        };

        req.comment.save((err, comment) => {
            next(new httpResponse.OkResponse({updatedComment: comment}));
        });
    }
    else{
        next(new httpResponse.UnauthorizedResponse('You are not authorized to delete this comment'));
    }
});


router.get('/post/:postSlug', auth.isToken, auth.isUser, (req, res, next) => {
    Post.findOne({slug: req.params.postSlug}, (err, post) => {
        if(!err && post !== null){
            next(new httpResponse.OkResponse({comments: post.comments}));
        }
        else{
            next(new httpResponse.BadRequestResponse('Post not found!'));
        }
    });
});

module.exports = router;