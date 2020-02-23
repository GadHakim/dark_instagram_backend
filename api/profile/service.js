const helper = require('../../app/helpers/helper');
const convertor = require('./convertor');
const sql = require('./sql');
const bcrypt = require('bcryptjs');

const profile = {
    get: async (connection, user) => {
        let profile = await sql.profile.put.findUserById(connection, user.id);
        let result = convertor.profile.get(profile);

        return {
            "success": true,
            "result": result
        }
    },

    put: async (connection, user, options) => {
        let profile = await sql.profile.put.findUserById(connection, user.id);

        if (options.email) {
            if (options.email === profile.user_email) {
                return helper.doom.error.emailNotBeSame();
            }

            let email = await sql.profile.put.findEmail(connection, options.email);
            if (email !== null) {
                return helper.doom.error.emailAlreadyRegistered();
            }
        }

        if (options.old_password && options.new_password) {
            if (options.old_password === options.new_password) {
                return helper.doom.error.passwordNotBeSame();
            }

            let oldPasswordIsIncorrect = !bcrypt.compareSync(options.old_password, profile.password);
            if (oldPasswordIsIncorrect) {
                return helper.doom.error.oldPasswordIsIncorrect();
            }

            options.new_password = bcrypt.hashSync(options.new_password, 10);
        }

        if (options.avatar_image) {
            options.avatar_image_path = helper.aws.getRandomNameFile(options.avatar_image.name);
            await helper.aws.addImage(options.avatar_image, options.avatar_image_path);
        }

        await sql.profile.put.updateUser(connection, user.id, options);

        return {
            "success": true,
            "message": "Profile updated successfully."
        }
    }
};

module.exports = {
    profile
};
