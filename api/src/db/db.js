const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/mern-template';

mongoose.connect(dbURL, {useFindAndModify: false, useNewUrlParser: true});