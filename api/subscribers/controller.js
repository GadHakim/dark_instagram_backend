const helper = require('../../app/helpers/helper');
const service = require('./service');

const subscribe = {
    post: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.subscribe.post(connection, req.user, req.options);
        });
    }
};

const unsubscribe = {
    post: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.unsubscribe.post(connection, req.user, req.options);
        });
    }
};

module.exports = {
    subscribe,
    unsubscribe
};
