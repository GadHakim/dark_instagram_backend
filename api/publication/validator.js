const Joi = require('@hapi/joi');
const check = require('check-types');

const schemas = {
    router: {
        publication: {
            get: Joi.object().keys({
                publication_id: Joi.number().required(),
            }).required(),

            post: Joi.object().keys({
                comment: Joi.string().required(),
                content: Joi.any().required(),
            }).required()
        }
    }
};

const validator = {
    publication: {
        post: {
            convertDataToArray(req, res, next) {
                if (check.object(req.options.content)) {
                    req.options.content = [req.options.content];
                }

                next();
            }
        }
    }
};

module.exports = {
    schemas,
    validator
};
