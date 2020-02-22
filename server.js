const {config} = require('./app/helpers/helper');
const http = require('http');
const app = require('./app');
const port = config.general.port;
const server = http.createServer(app);

server.listen(port, function () {
    console.log(`---- Server running on port [${port}] && Environment [${process.env.NODE_ENV}] ----`);
});
