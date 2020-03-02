const helper = require('../../app/helpers/helper');

const people = {
    get: (people) => {
        let result = [];

        people.forEach(value => {
            result.push({
                "account_id": value.account_id,
                "user_email": value.email,
                "first_name": value.first_name,
                "last_name": value.last_name,
                "avatar_image_path": value.avatar_image_path ? helper.aws.getImagePath(value.avatar_image_path) : null,
                "follower": value.follower,
            });
        });

        return result;
    }
};

const subscribers = {
    get: (people) => {
        let result = [];

        people.forEach(value => {
            result.push({
                "account_id": value.account_id,
                "user_email": value.email,
                "first_name": value.first_name,
                "last_name": value.last_name,
                "avatar_image_path": value.avatar_image_path ? helper.aws.getImagePath(value.avatar_image_path) : null,
            });
        });

        return result;
    }
};

module.exports = {
    people,
    subscribers
};
