const helper = require('../../app/helpers/helper');
const service = require('./service');

const publication = {
    post: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.publication.post(connection, req.user, req.options);
        });
    }
};

module.exports = {
    publication
};
