const helper = require('../../app/helpers/helper');

const profile = {
    get: (profile) => {
        return {
            user_email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            full_name: profile.first_name + " " + profile.last_name,
            avatar_image_path: profile.avatar_image_path ? helper.aws.getImagePath(profile.avatar_image_path) : null,
        }
    }
};

module.exports = {
    profile
};
