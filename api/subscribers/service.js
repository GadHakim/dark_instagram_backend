const helper = require('../../app/helpers/helper');
const sql = require('./sql');

const subscribe = {
    post: async (connection, user, options) => {
        let profile = await sql.subscribe.post.findUserById(connection, options.subscriber_id);
        if (profile === null) {
            return helper.doom.error.userNotFound();
        }

        if (options.subscriber_id === user.id) {
            return helper.doom.error.cannotSubscribeToYourself();
        }

        let isSubscribe = await sql.subscribe.post.isSubscribe(connection, user.id, options);
        if (isSubscribe) {
            return helper.doom.error.youAlreadySubscribed();
        }

        await sql.subscribe.post.subscribe(connection, user.id, options);

        return {
            "success": true,
            "message": "The subscription is successful."
        }
    },
};

module.exports = {
    subscribe
};
