const helper = require('../../app/helpers/helper');
const service = require('./service');

const chatAll = {
    get: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.chatAll.get(connection, req.user, req.options);
        });
    }
};

module.exports = {
    chatAll
};
