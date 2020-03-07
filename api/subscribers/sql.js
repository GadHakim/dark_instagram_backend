const helper = require('../../app/helpers/helper');
const uuidv4 = require('uuid/v4');

const common = {
    findUserById: async (connection, userId) => {
        const sql = await connection.query(`
            SELECT account_id,
                   password,
                   email,
                   first_name,
                   last_name,
                   avatar_image_path
            FROM main.accounts
            WHERE account_id = $1
            LIMIT 1
        `, [userId]);

        return helper.pg.firstResultOrNull(sql);
    },

    isSubscribe: async (connection, userId, options) => {
        const sql = await connection.query(`
            SELECT account_id
            FROM main.subscriptions
            WHERE subscriber_id = $2
              AND account_id = $1
            LIMIT 1
        `, [userId,
            options.subscriber_id
        ]);

        return helper.pg.firstResultOrNull(sql);
    },
};

const subscribe = {
    post: {
        subscribe: async (connection, userId, options) => {
            await connection.query(`
                        INSERT
                        INTO main.subscriptions
                        (account_id,
                         subscriber_id)
                        VALUES ($1, $2);
                `, [userId,
                    options.subscriber_id
                ]
            );
        },

        findChat: async (connection, userId, options) => {
            const sql = await connection.query(`
                SELECT chat_id
                FROM main.user_chats
                WHERE user_id = $1
                  AND subscriber_id = $2
                LIMIT 1
            `, [userId,
                options.subscriber_id
            ]);

            return helper.pg.firstResultOrNull(sql);
        },

        createChat: async (connection, userId, options) => {
            await connection.query(`
                        INSERT
                        INTO main.user_chats
                        (user_id,
                         subscriber_id,
                         chat_uuid)
                        VALUES ($1, $2, $3);
                `, [userId,
                    options.subscriber_id,
                    uuidv4()
                ]
            );
        },
    }
};

const unsubscribe = {
    post: {
        unsubscribe: async (connection, userId, options) => {
            await connection.query(`
                        DELETE
                        FROM main.subscriptions
                        WHERE account_id = $1
                          AND subscriber_id = $2
                `, [userId,
                    options.subscriber_id
                ]
            );
        },
    }
};

module.exports = {
    common,
    subscribe,
    unsubscribe
};
