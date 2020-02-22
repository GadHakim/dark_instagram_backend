const config = require('config');

config.regex = {
    password: new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&^;:'/-]{5,128}$")
};

module.exports = config;
