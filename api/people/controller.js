const helper = require('../../app/helpers/helper');
const service = require('./service');

const people = {
    get: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.people.get(connection, req.user, req.options);
        });
    }
};

const subscribers = {
    get: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.subscribers.get(connection, req.user, req.options);
        });
    }
};

module.exports = {
    people,
    subscribers
};
