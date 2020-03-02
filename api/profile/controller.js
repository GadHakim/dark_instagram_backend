const helper = require('../../app/helpers/helper');
const service = require('./service');

const profile = {
    get: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.profile.get(connection, req.user, req.options);
        });
    },

    put: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.profile.put(connection, req.user, req.options);
        });
    }
};

module.exports = {
    profile
};
