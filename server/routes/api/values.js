let router = require('express').Router();
let httpResponse = require('express-http-response');
 
let OkResponse = httpResponse.OkResponse;

router.get('/', function(req, res, next){
    next(new OkResponse({message: `Api's are working`}));
});


module.exports = router;