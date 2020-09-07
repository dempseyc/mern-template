const async = require('async')

const bcrypt = require('bcrypt')
const saltRounds = 10

const User = require('../models/User')
const Todo = require('../models/Todo')

const db = require('./db')
// mongoose.Promise = global.Promise  

var MongoClient = require('mongodb').MongoClient;

const cors = require('cors')

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

function todoCreate(todoDetails, logger) {
    let todo = new Todo(todoDetails)
    todo.save(function (error) {
        if (error) {
            logger(error, null)
            return
        }
        logger(null,'New Todo: ' + JSON.stringify(todo,null,4))
    })
    return todo
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
            userInstances.push(user)
            logger(null,'New User: ' + JSON.stringify(user,null,4))
        })
    })
}

const create1User = () => {
    userCreate({
        created_on: new Date(),
        f_name: 'u',
        l_name: 'one',
        email: 'u1@u.com',
        pw_hash: '1',
        todos: todoCreate({text:"add todos",completed:false}, log)
    }, log)
}

const dropDB = function(callback) {
    
    // MongoClient.connect(dbURL, function(err, db) {
    
    //     if(err) throw err;
        
        // Drop database which is an asynchronous call
        db.connection.dropDatabase(function(err, result) {

            // After successfully dropping database, force 
            // close database which is another asynchronous call 
            // db.connection.close(true, function(err, result) {

                // Close successful so execute callback so second 
                // function in async.serial gets called
                callback(null, 'SUCCESS - dropped database');
            });
        // };
    // });
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