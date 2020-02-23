const auth = require('../../api/auth/router');
const profile = require('../../api/profile/router');
const publication = require('../../api/publication/router');

module.exports = {
    userAPI: (app) => {
        app.use('/auth', auth);
        app.use('/profile', profile);
        app.use('/publication', publication);
    },
};
