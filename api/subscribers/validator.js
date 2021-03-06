const Joi = require('@hapi/joi');

const schemas = {
    router: {
        subscribe: {
            post: Joi.object().keys({
                subscriber_id: Joi.number().required(),
            }).required()
        },

        unsubscribe: {
            post: Joi.object().keys({
                subscriber_id: Joi.number().required(),
            }).required()
        }
    }
};

module.exports = {
    schemas
};
