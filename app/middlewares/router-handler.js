const auth = require('../../api/auth/router');
const profile = require('../../api/profile/router');

module.exports = {
    userAPI: (app) => {
        app.use('/auth', auth);
        app.use('/profile', profile);
    },
};
