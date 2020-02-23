const helper = require('../../app/helpers/helper');
const validator = helper.validator;
const {schemas} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post('/subscribe',
    asyncHandler(helper.middlewares.authUser),
    validator.main(schemas.router.subscribers.post),
    asyncHandler(controller.subscribers.post)
);

module.exports = router;
