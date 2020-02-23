const convertor = require('./convertor');
const sql = require('./sql');

const people = {
    get: async (connection, user, options) => {
        let people = await sql.people.get.findPeople(connection, options);
        let result = convertor.people.get(people);

        return {
            "success": true,
            "result": result
        }
    },
};

module.exports = {
    people,
};
