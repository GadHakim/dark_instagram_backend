const auth = require('../../api/auth/router');

module.exports = {
    userAPI: (app) => {
        app.use('/auth', auth);
    },
};
