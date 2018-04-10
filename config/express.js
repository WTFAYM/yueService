let express = require('express');
let load = require('express-load');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let morgan = require('morgan');
let session = require('express-session');
let beanRegistry = require('../utils/beanRegistry');
let setting = require('./setting');
let exceptionResolver = require('../middlewares/ExceptionResolver');
let LoginChecker = require('../app/middlewares/LoginChecker');

module.exports = function () {

    let app = express();

    //Set port to env.Port or default to 8080
    app.set('port', process.env.PORT || setting.port);

    //set view engine
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //middleware for security
    app.use(helmet());


    // setup the logger
    app.use(morgan("short"));

    // to support JSON-encoded bodies
    app.use(bodyParser.json());

    // to support URL-encoded bodies
    app.use(bodyParser.urlencoded({extended: true}));

    // to support cookie
    app.use(cookieParser());

    // to support session
    app.use(session({
        secret: 'harris',
        name: 'session_id',
        resave: true,
        saveUninitialized: false,
        cookie: {maxAge: setting.sessionTimeout},
        store: new session.MemoryStore({checkPeriod: setting.sessionTimeout}),
    }));

    //Use the public folder for static files
    app.use(express.static('./public'));

    app.use(LoginChecker);

    // discover and register dao
    beanRegistry('app/daos', 'daos');

    // discover and register service
    beanRegistry('app/services', 'services');

    //configure mvc
    load('controllers', {cwd: 'app'})
        .then('routes')
        .into(app);

    // process async exception
    app.use(exceptionResolver());

    return app;
};
