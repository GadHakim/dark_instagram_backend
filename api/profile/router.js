const helper = require('../../app/helpers/helper');
const validator = helper.validator;
const {schemas} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get('/',
    asyncHandler(helper.middlewares.authUser),
    asyncHandler(controller.profile.get)
);

router.put('/',
    asyncHandler(helper.middlewares.authUser),
    validator.main(schemas.router.profile.put),
    asyncHandler(controller.profile.put)
);

module.exports = router;
