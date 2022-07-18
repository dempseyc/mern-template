const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;  

const dbURL = process.env.DB_URL;

mongoose.connect(dbURL, {
    // useFindAndModify: false, 
    // useNewUrlParser: true, 
    // useUnifiedTopology: true,
    // useCreateIndex: true
    });
