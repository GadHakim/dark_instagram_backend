const helper = require('../../app/helpers/helper');

const chatAll = {
    get: {
        findChats: async (connection, userId) => {
            const sql = await connection.query(`
                SELECT user_id,
                       subscriber_id,
                       chat_id,
                       chat_uuid
                FROM main.user_chats
                WHERE user_id = $1
            `, [userId]);

            return helper.pg.resultOrEmptyArray(sql);
        },

        findUserById: async (connection, userId) => {
            const sql = await connection.query(`
                SELECT account_id,
                       email,
                       first_name,
                       last_name,
                       avatar_image_path
                FROM main.accounts
                WHERE account_id = $1
            `, [userId]);

            return helper.pg.firstResultOrNull(sql);
        }
    }
};

module.exports = {
    chatAll
};
