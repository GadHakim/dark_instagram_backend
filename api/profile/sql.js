const helper = require('../../app/helpers/helper');

const profile = {
    get: {
        findUserById: async (connection, userId) => {
            const sql = await connection.query(`
                SELECT account_id,
                       email,
                       password
                FROM main.accounts
                WHERE account_id = $1
            `, [userId]);

            return helper.pg.firstResultOrNull(sql);
        }
    },

    put: {
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

        findEmail: async (connection, email) => {
            const sql = await connection.query(`
                SELECT account_id
                FROM main.accounts
                WHERE email = $1
                LIMIT 1
            `, [email]);

            return helper.pg.firstResultOrNull(sql);
        },

        updateUser: async (connection, userId, options) => {
            let sql = [];

            sql.push('UPDATE main.accounts SET');
            if (options.first_name) sql.push(`first_name = '${options.first_name}',`);
            if (options.last_name) sql.push(`last_name = '${options.last_name}',`);
            if (options.email) sql.push(`email = '${options.email}',`);
            if (options.new_password) sql.push(`password = '${options.new_password}',`);
            if (options.avatar_image_path) sql.push(`avatar_image_path = '${options.avatar_image_path}',`);
            helper.general.deleteLastCharacterOfLastElementInArray(sql);
            sql.push(`WHERE account_id = ${userId}`);

            await connection.query(sql.join(' '));
        }
    }
};

module.exports = {
    profile
};
