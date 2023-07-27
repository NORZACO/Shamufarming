require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const flash = require('express-flash');
const bodyParser = require("body-parser");
const passport = require('passport');

const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// authentic router
const authRouter = require('./routes/auths')
// proile router
const proileRouter = require('./routes/profile')


const app = express();

const db = require('./models');



// db.sequelize.sync({ force: true }).then(() => {
//   //logo
//   console.log(`
//   ------------------------------------------------------------------
//   |     ALL DATABASE TABLES HAVE BEEN SUCCESSFULLY SYNCRONISE       |
//   ------------------------------------------------------------------
//   `)
// })

db.sequelize.sync({ force: false }).then(() => {
}).then(() => {
  // logo
  console.log(`
  ------------------------------------------------------------------
  |     ALL DATABASE TABLES HAVE BEEN SUCCESSFULLY SYNCRONISE       |
  ------------------------------------------------------------------
  `)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// bootstrap  <script src="bootstrap/js/bootstrap.bundle.min.js"></script> || bootstrap@4.0.0/dist/js/
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// // jquery <script src="jquery/jquery.min.js"></script>
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
// // typed <script src="typed/typed.min.js"></script>
app.use('/typed', express.static(path.join(__dirname, 'node_modules/typed.js/lib')));

// bootstrap icon <link href="bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
app.use('/bootstrap-icons', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')));

// node_modules/@popperjs/core/dist/umd/enums.min.js
app.use('/popperjs', express.static(path.join(__dirname, 'node_moduless/@popperjs/core/dist/umd')))

// npm i font-awesome
app.use('/font-awesome', express.static(path.join(__dirname, 'node_modules/font-awesome')))
// npm i @fortawesome/fontawesome-free
// app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')))
app.use(passport.initialize());
// app.use(passport.session());


// Configure session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  // store: new FileStore(
  //     {
  //         path: path.join(__dirname, '/tmp/sessions'),
  //         encrypt: true
  //     }
  // ),
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());




app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', authRouter);
app.use('/', proileRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;