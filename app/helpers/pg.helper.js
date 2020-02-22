let config = require('./config.helper');

module.exports = {
    firstResultOrNull: (sql) => {
        const {rows} = sql;

        if (rows.length !== 0) {
            return rows[0];
        } else {
            return null;
        }
    },

    firstResultOrEmptyObject: (sql) => {
        const {rows} = sql;

        if (rows.length !== 0) {
            return rows[0];
        } else {
            return {};
        }
    },

    resultOrEmptyArray: (sql) => {
        const {rows} = sql;

        if (rows.length === 0) {
            return [];
        } else {
            return rows;
        }
    }
};
