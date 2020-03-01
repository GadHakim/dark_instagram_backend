const helper = require('../../app/helpers/helper');

const people = {
    get: {
        findPeople: async (connection, options) => {
            const sql = await connection.query(`
                SELECT account_id,
                       email,
                       first_name,
                       last_name,
                       avatar_image_path
                FROM main.accounts
                ORDER BY RANDOM()
                LIMIT $1;
            `, [options.limit]);

            return helper.pg.resultOrEmptyArray(sql);
        }
    },
};

const subscribers = {
    get: {
        findSubscribers: async (connection, userId, options) => {
            const sql = await connection.query(`
                SELECT account_id,
                       subscriber_id
                FROM main.subscriptions
                WHERE account_id = $1
                LIMIT $2
            `, [userId,
                options.limit
            ]);

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
                LIMIT 1
            `, [userId]);

            return helper.pg.firstResultOrNull(sql);
        }
    },
};

module.exports = {
    people,
    subscribers
};
