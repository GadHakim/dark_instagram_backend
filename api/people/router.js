const helper = require('../../app/helpers/helper');
const {schemas} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get('/',
    asyncHandler(helper.middlewares.authUser),
    helper.validator.main(schemas.router.people.get),
    asyncHandler(controller.people.get)
);

router.get('/subscribers',
    asyncHandler(helper.middlewares.authUser),
    helper.validator.main(schemas.router.subscribers.get),
    asyncHandler(controller.subscribers.get)
);

module.exports = router;
