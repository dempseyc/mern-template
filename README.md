cd into /api and `npm install`
cd into /cra-client and `npm install`

`touch/api/.env`

```
TOKEN_KEY="<your secret>"
DB_URL="mongodb://localhost:27017/<your db name>"
```

`touch /cra-client/.env`

since we used create-react-app, env variables should start with 'REACT_APP_'
example external resource feature uses themoviedb.org

```
REACT_APP_API_URL="<where api lives in production>"
REACT_APP_DEV_API_URL="http://localhost:3002/"
REACT_APP_CABLE_URL="<where cable lives in production>"
REACT_APP_DEV_CABLE_URL="http://localhost:8000"
REACT_APP_API2_URL="https://api.themoviedb.org/3/"
REACT_APP_DEV_API2_URL="https://api.themoviedb.org/3/"
REACT_APP_API2_KEY="<key you got from themoviedb.org>"
REACT_APP_API2_TOKEN="<token you got from themoviedb.org>"
```


also may want to create seed_db.js like:

```
require('dotenv').config();
const db = require('mongoose');

const dbURL = process.env.DB_URL;

db.connect(dbURL, {});

const async = require('async')

const bcrypt = require('bcrypt')
const saltRounds = 10

const User = require('../models/User')

db.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

let userInstances = []

function log(error, results) {
    if (error) {
        console.log('ERROR:', error)
    }
    else {
        console.log('results:', JSON.stringify(results)) 
    }
}

function userCreate(userDetails, logger) {
    bcrypt.hash(userDetails.pw_hash, saltRounds, function(err, hash) {
        let details = {...userDetails, pw_hash: hash }
        let user = new User(details)   
        user.save(function (error) {
            if (error) {
                logger(error, null)
                return
            }
            userInstances.push(user._id)
            logger(null,'New User: ' + JSON.stringify(user,null,4))
        })
    })
}

const create1User = (callback) => {
    userCreate({
        created_on: new Date(),
        username: 'u2',
        email: 'u2@u.com',
        pw_hash: '2u',
    }, log)
    callback(null, 'SUCCESS - created user');
}

const dropDB = function(callback) {    
    db.connection.dropDatabase(function(err, result) {
        if (err) {
            console.log(err)
            return
        }
        console.log("dropped DB")
        callback(null, 'SUCCESS - dropped database');
    });
}

async.series([ dropDB, create1User ],
function(error, results) {
    if (error) {
        console.log('FINAL ERR:', error)
    }
    else {
        console.log('userInstances:', JSON.stringify(userInstances))
    }
    mongoose.connection.close()
})
```

and

`node src/db/seed_db.js`

