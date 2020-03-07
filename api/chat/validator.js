const Joi = require('@hapi/joi');

const schemas = {
    router: {
        chatAll: {
            get: Joi.object().keys({
                limit: Joi.number().positive().required(),
            }).required()
        }
    }
};

module.exports = {
    schemas
};
