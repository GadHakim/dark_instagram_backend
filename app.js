const helper = require('./app/helpers/helper');
const router = require('./app/middlewares/router-handler');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const morgan = require('morgan');
const morganConfig = helper.config.morgan;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morganBody = require('morgan-body');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(helper.header);
app.use(fileUpload({}));

morgan.format(morganConfig.name, morganConfig.format);
app.use(morgan(morganConfig.name));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (morganConfig.morganBody) {
    morganBody(app);
}


app.use(helper.middlewares.cors);

router.userAPI(app);

app.use(helper.middlewares.notFound);
app.use(helper.middlewares.error);

module.exports = app;
