const helper = require('../../app/helpers/helper');
const sql = require('./sql');

const subscribe = {
    post: async (connection, user, options) => {
        let profile = await sql.common.findUserById(connection, options.subscriber_id);
        if (profile === null) {
            return helper.doom.error.userNotFound();
        }

        if (options.subscriber_id === user.id) {
            return helper.doom.error.cannotSubscribeToYourself();
        }

        let isSubscribe = await sql.common.isSubscribe(connection, user.id, options);
        if (isSubscribe) {
            return helper.doom.error.youAlreadySubscribed();
        }

        await sql.subscribe.post.subscribe(connection, user.id, options);

        return {
            "success": true,
            "message": "The subscribe is successful."
        }
    },
};

const unsubscribe = {
    post: async (connection, user, options) => {
        let profile = await sql.common.findUserById(connection, options.subscriber_id);
        if (profile === null) {
            return helper.doom.error.userNotFound();
        }

        if (options.subscriber_id === user.id) {
            return helper.doom.error.cannotUnsubscribeToYourself();
        }

        let isSubscribe = await sql.common.isSubscribe(connection, user.id, options);
        if (isSubscribe === null) {
            return helper.doom.error.youNotSubscribedYet();
        }

        await sql.unsubscribe.post.unsubscribe(connection, user.id, options);

        return {
            "success": true,
            "message": "The unsubscribe is successful."
        }
    },
};

module.exports = {
    subscribe,
    unsubscribe
};
