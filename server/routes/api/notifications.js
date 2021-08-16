var express = require('express');
var router = express.Router();
var httpResponse = require('express-http-response');
var Notification = require('../../models/notification');
var auth = require('../auth');

router.param('slug', (req, res, next, slug) => {
    Notification.findOne({slug: slug}, (err, notification) => {
        if(!err && notification !==null){
            req.notification = notification;
            return next();
        }else {
            next(new httpResponse.BadRequestResponse('Notification not found!'));
        }
    });
})

router.get('/get/all' , auth.isToken, auth.isUser, (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        useCustomCountFn: function () {
            return Notification.count({sentTo: req.user._id,isRead: false});
          },
          sort: { time: -1 },
    };

    Notification.paginate({ sentTo: req.user._id}, options, (err, notifications) => {
        if(!err && notifications !== null){
            next(new httpResponse.OkResponse({notifications: notifications}));
        }
        else {
            next(new httpResponse.BadRequestResponse('No notification'));
        }
    });
});


router.get('/mark-all',auth.isToken, auth.isUser, function(req, res, next){
    Notification.updateMany({sentTo: req.user._id, isRead: false}, { $set: { isRead: true } }, function (err, result) {
            if (err) { next(new httpResponse.BadRequestResponse("Server Error")) }
            next(new OkResponse());
        });
  });
  
  router.get('/mark-as-read/:slug', auth.isToken, auth.isUser, function(req, res, next){
    req.notification.isRead = true;
    req.notification.save(function (err, result) {

            if (err) { next(new BadRequestResponse("Server Error")) }
            next(new httpResponse.OkResponse());
    });
  });



module.exports = router;





