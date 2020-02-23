const helper = require('../../app/helpers/helper');
const {schemas, validator} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get('/',
    asyncHandler(helper.middlewares.authUser),
    helper.validator.main(schemas.router.publication.get),
    asyncHandler(controller.publication.get)
);

router.post('/',
    asyncHandler(helper.middlewares.authUser),
    helper.validator.main(schemas.router.publication.post),
    validator.publication.post.convertDataToArray,
    asyncHandler(controller.publication.post)
);

router.post('/comment',
    asyncHandler(helper.middlewares.authUser),
    helper.validator.main(schemas.router.comment.post),
    asyncHandler(controller.comment.post)
);

module.exports = router;
