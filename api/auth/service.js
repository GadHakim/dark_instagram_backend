const helper = require('../../app/helpers/helper');
const convertor = require('./convertor');
const sql = require('./sql');
const bcrypt = require('bcryptjs');

const registration = {
    post: async (connection, options) => {
        let user = await sql.common.findUser(connection, options.email);
        if (user) {
            return helper.doom.error.emailAlreadyRegistered();
        }

        if (!helper.config.regex.password.test(options.password)) {
            return helper.doom.error.passwordNotValid();
        }

        options.password = bcrypt.hashSync(options.password, 10);
        await sql.registration.post.addUser(connection, options);
        user = await sql.common.findUser(connection, options.email);

        options.access_token = helper.token.user.accessToken(user.user_id, options.email);
        options.refresh_token = helper.token.user.refreshToken(user.user_id);

        await sql.registration.post.updateUser(connection, user.user_id, options);
        let result = convertor.registration.post(options);

        return {
            "success": true,
            "result": result
        }
    }
};

const login = {
    post: async (connection, options) => {
        let user = await sql.common.findUser(connection, options.email);
        if (user === null) {
            return helper.doom.error.emailNotFound(options.email);
        }

        let incorrectPassword = !bcrypt.compareSync(options.password, user.password);
        if (incorrectPassword) {
            return helper.doom.error.passwordNotValid();
        }

        options.access_token = helper.token.user.accessToken(user.user_id, options.email);
        options.refresh_token = helper.token.user.refreshToken(user.user_id);

        await sql.login.post.updateUser(connection, user.user_id, options);
        let result = convertor.login.post(options);

        return {
            "success": true,
            "result": result
        }
    }
};

const logout = {
    post: async (connection, user) => {
        await sql.logout.post.updateUser(connection, user.email);

        return {
            "success": true,
            "message": "Logout successful."
        }
    }
};

module.exports = {
    registration,
    login,
    logout
};
