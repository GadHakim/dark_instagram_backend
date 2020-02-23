const helper = require('../../app/helpers/helper');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get('/',
    asyncHandler(helper.middlewares.authUser),
    helper.validator.main(schemas.router.people.get),
    asyncHandler(controller.people.get)
);

module.exports = router;
