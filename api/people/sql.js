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

module.exports = {
    people
};
