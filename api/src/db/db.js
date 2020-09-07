const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;  

const dbURL = 'mongodb://localhost:27017/mern-template';

mongoose.connect(dbURL, {
    useFindAndModify: false, 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
    });
