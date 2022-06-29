var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require("cors");


var indexRouter = require('./routes/index.js');
var izdelkiRouter = require('./routes/izdelki.js');
var uporabnikiRouter = require('./routes/uporabniki.js');
var nakupiRouter = require('./routes/nakup.js');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("json spaces", 2);
app.use(cors());

app.use('/', indexRouter);
app.use('/izdelki', izdelkiRouter);
app.use('/uporabniki', uporabnikiRouter);
app.use('/nakupi', nakupiRouter);



module.exports = app;

