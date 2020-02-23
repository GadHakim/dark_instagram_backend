const helper = require('../../app/helpers/helper');
const service = require('./service');

const subscribers = {
    post: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.subscribers.post(connection, req.user, req.options);
        });
    }
};

module.exports = {
    subscribers
};
