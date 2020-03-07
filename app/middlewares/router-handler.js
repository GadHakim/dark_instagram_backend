const auth = require('../../api/auth/router');
const chat = require('../../api/chat/router');
const profile = require('../../api/profile/router');
const publication = require('../../api/publication/router');
const people = require('../../api/people/router');
const subscribers = require('../../api/subscribers/router');

module.exports = {
    userAPI: (app) => {
        app.use('/auth', auth);
        app.use('/chat', chat);
        app.use('/profile', profile);
        app.use('/publication', publication);
        app.use('/people', people);
        app.use('/subscribers', subscribers);
    },
};
