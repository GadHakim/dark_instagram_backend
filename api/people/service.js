const convertor = require('./convertor');
const sql = require('./sql');

const people = {
    get: async (connection, user, options) => {
        let subscribers = await sql.common.findSubscribers(connection, user.id, options);
        let subscriberMap = new Map();
        subscribers.forEach(subscriber => {
            subscriberMap.set(subscriber.subscriber_id, subscriber);
        });

        let myIndexForDeleting = null;
        let people = await sql.people.get.findPeople(connection, options);
        people.forEach((person, index) => {
            if (person.account_id === user.id) {
                myIndexForDeleting = index;
            }

            let subscriber = subscriberMap.get(person.account_id);
            person.follower = subscriber != null;
        });

        if (myIndexForDeleting != null) {
            people.splice(myIndexForDeleting, 1);
        }

        let result = convertor.people.get(people);

        return {
            "success": true,
            "result": result
        }
    },
};

const subscribers = {
    get: async (connection, user, options) => {
        let subscribers = await sql.common.findSubscribers(connection, user.id, options);
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
