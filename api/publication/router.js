const helper = require('../../app/helpers/helper');
const {schemas, validator} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post('/',
    asyncHandler(helper.middlewares.authUser),
    helper.validator.main(schemas.router.publication.post),
    validator.publication.post.convertDataToArray,
    asyncHandler(controller.publication.post)
);

module.exports = router;
