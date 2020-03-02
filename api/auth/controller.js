const helper = require('../../app/helpers/helper');
const service = require('./service');

const registration = {
    post: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.registration.post(connection, req.options);
        }, 201);
    }
};

const login = {
    post: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.login.post(connection, req.options);
        });
    }
};

const logout = {
    post: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.logout.post(connection, req.user);
        });
    }
};

module.exports = {
    registration,
    login,
    logout
};
