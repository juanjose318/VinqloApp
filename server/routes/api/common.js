var express = require('express');
var router = express.Router();
var httpResponse = require('express-http-response');
var Campus = require('../../models/campus');
var Category = require('../../models/category');

router.get('/' , async (req, res, next) => {
    var campuses = await Campus.find();
    const categories = await Category.find();
    next(new httpResponse.OkResponse({campuses: campuses, categories: categories}));
});

module.exports = router;