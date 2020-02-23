const Joi = require('@hapi/joi');

const schemas = {
    router: {
        people: {
            get: Joi.object().keys({
                limit: Joi.number().required(),
            }).required(),
        }
    }
};

module.exports = {
    schemas
};
