const Joi = require('@hapi/joi');

const schemas = {
    router: {
        subscribers: {
            post: Joi.object().keys({
                subscriber_id: Joi.number().required(),
            }).required()
        }
    }
};

module.exports = {
    schemas
};
