const {Pool} = require('pg');
const config = require('../helpers/config.helper');

const pool = new Pool({
    user: config.database.user,
    host: config.database.host,
    database: config.database.database,
    password: config.database.password,
    port: config.database.port
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    transaction: async (action) => {
        const connection = await pool.connect();
        try {
            await connection.query('BEGIN');
            await action(connection);
            await connection.query('COMMIT');
        } catch (e) {
            await connection.query('ROLLBACK');
            throw e;
        } finally {
            connection.release();
        }
    }
};
