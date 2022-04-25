const express = require('express');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const favicon = require('serve-favicon');
const passport = require('passport');

const { getPageNotFound } = require('./controllers/home.controller');

// Initializations
const app =  express();
const server = http.createServer(app);
require('./lib/passport');

// Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
    secret: 'nodesession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

// Global variable
app.use(async (req, res, next) => {
    app.locals.user = req.user;
    require('./lib/globalVariable')(req, next);
});

// Routes
app.use(require('./routes/index.routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Route notFound
app.use(getPageNotFound);

// Starting server
server.listen(app.get('port'), async function() {
    console.log("Server runing");
    console.log("listening on *:" + app.get('port'));
});