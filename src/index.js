const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


const path = require('path');

const app = express();


// mongodb
mongoose.connect('mongodb://localhost/tv2-db')
    .then(db => console.log('connect ok'));

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/materials', require('./routes/material'));

// static
app.use(express.static(path.join(__dirname, 'public')));

// listenning on port
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });