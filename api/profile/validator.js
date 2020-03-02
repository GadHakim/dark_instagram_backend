const Joi = require('@hapi/joi');

const schemas = {
    router: {
        profile: {
            put: Joi.object().keys({
                first_name: Joi.string(),
                last_name: Joi.string(),
                email: Joi.string().email(),
                old_password: Joi.string(),
                new_password: Joi.string(),
                avatar_image: Joi.any(),
                avatar_image_name: Joi.string(),
            }).min(1)
                .with('old_password', 'new_password')
                .with('new_password', 'old_password')
                .required()
        }
    }
};

module.exports = {
    schemas
};
