const helper = require('../../app/helpers/helper');
const service = require('./service');

const publication = {
    get: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.publication.get(connection, req.user, req.options);
        });
    },

    post: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.publication.post(connection, req.user, req.options);
        });
    }
};

module.exports = {
    publication
};
