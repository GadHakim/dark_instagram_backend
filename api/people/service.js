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

const subscribers = {
    get: async (connection, user, options) => {
        let subscribers = await sql.subscribers.get.findSubscribers(connection, user.id, options);
        let people = [];
        for (let i = 0; i < subscribers.length; i++) {
            let subscriber = subscribers[i];
            let user = await sql.subscribers.get.findUserById(connection, subscriber.subscriber_id);
            people.push(user);
        }
        let result = convertor.subscribers.get(people);

        return {
            "success": true,
            "result": result
        }
    },
};

module.exports = {
    people,
    subscribers
};
