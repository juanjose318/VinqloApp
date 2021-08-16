let router = require('express').Router();


router.use('/values', require('./values'));
router.use('/users', require('./users'));
router.use('/communities', require('./communities'));
router.use('/posts', require('./posts'));
router.use('/campuses', require('./campuses'));
router.use('/degrees', require('./degrees'));
router.use('/comments', require('./comments'));
router.use('/reports', require('./reports'));
router.use('/common', require('./common'));
router.use('/profile', require('./profile'));
router.use('/search', require('./search'));
router.use('/upload', require('./upload'));
router.use('/notifications', require('./notifications'));

module.exports = router;