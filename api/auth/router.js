const helper = require('../../app/helpers/helper');
const validator = helper.validator;
const {schemas} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post('/registration',
    validator.main(schemas.router.registration.post),
    asyncHandler(controller.registration.post)
);

router.post('/login',
    validator.main(schemas.router.login.post),
    asyncHandler(controller.login.post)
);

router.post('/logout',
    asyncHandler(helper.middlewares.authUser),
    asyncHandler(controller.logout.post)
);

module.exports = router;
