const registration = {
    post: (options) => {
        return {
            access_token: options.access_token,
            refresh_token: options.refresh_token,
            user_language: options.user_language
        }
    }
};

const login = {
    post: (options) => {
        return {
            access_token: options.access_token,
            refresh_token: options.refresh_token,
            user_language: options.user_language
        }
    }
};

module.exports = {
    registration,
    login
};
