var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyparser = require("body-parser");
var cookieParser = require('cookie-parser');
const session = require("express-session");
const {v4:uuidv4} = require("uuid"); 
const nocache = require("nocache");
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended:true}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:uuidv4(), 
  resave:false,
  saveUninitialized:true
}))

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);

// app.use(nocache());

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/images',express.static(path.join(__dirname,'public/images')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
