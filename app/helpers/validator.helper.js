const Joi = require('@hapi/joi');
const doom = require('./doom.helper');
const general = require('./general.helper');

const main = (schema) => {
    return (req, res, next) => {
        let files = req.files || {};
        let data = general.assign(files, req.query, req.body);

        const {value, error} = Joi.validate(data, schema);
        if (error) {
            return doom.error.validation(res, error);
        }

        req.options = value;
        next();
    };
};

module.exports = {
    main
};
