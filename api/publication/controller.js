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

const allPublication = {
    get: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.allPublication.get(connection, req.user, req.options);
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

const comment = {
    post: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.comment.post(connection, req.user, req.options);
        });
    },

    put: async (req, res) => {
        await helper.controller.sendJson(res, async (connection) => {
            return await service.comment.put(connection, req.user, req.options);
        });
    }
};

module.exports = {
    publication,
    allPublication,
    subscribers,
    comment
};
