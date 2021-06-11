require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const celebritiesRouter = require ('./routes/celebrities-routes');
const moviesRouter = require ('./routes/movies-routes');


mongoose.connect('mongodb://localhost/backend-movies', {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
   })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*
* Import routes
*/
const indexRouter = require('./routes/index');

app.use('/api', indexRouter);
app.use('/api/celebrities', celebritiesRouter);
app.use('/api/movies', moviesRouter);

module.exports = app;