const helper = require('../../app/helpers/helper');
const {userStatus} = helper.config;

const common = {
    findUser: async (connection, email) => {
        const sql = await connection.query(`
            SELECT account_id,
                   first_name,
                   last_name,
                   email,
                   password
            FROM main.accounts
            WHERE email = $1
        `, [email]);

        return helper.pg.firstResultOrNull(sql);
    }
};

const registration = {
    post: {
        addUser: async (connection, options) => {
            await connection.query(`
                        INSERT
                        INTO main.accounts
                        (email,
                         password,
                         first_name,
                         last_name)
                        VALUES ($1, $2, $3, $4);
                `, [options.email,
                    options.password,
                    options.first_name,
                    options.last_name]
            );
        },

        updateUser: async (connection, userId, options) => {
            await connection.query(`
                UPDATE main.accounts
                SET refresh_token = $2
                WHERE account_id = $1
            `, [userId, options.refresh_token]);
        }
    }
};

const login = {
    post: {
        updateUser: async (connection, userId, options) => {
            await connection.query(`
                UPDATE main.accounts
                SET user_status   = $2,
                    refresh_token = $3
                WHERE account_id = $1
            `, [userId,
                userStatus.login,
                options.refresh_token]);
        }
    }
};

const logout = {
    post: {
        updateUser: async (connection, userEmail) => {
            await connection.query(`
                UPDATE main.accounts
                SET refresh_token    = NULL,
                    user_status      = $2
                WHERE email = $1
            `, [userEmail, userStatus.logout]);
        }
    }
};

module.exports = {
    common,
    registration,
    login,
    logout
};
