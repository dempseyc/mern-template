const mongoose = require('mongoose');

// const dbURL = 'mongodb://localhost:27017/cdb0';

mongoose.connect(dbURL, {useFindAndModify: false, useNewUrlParser: true});