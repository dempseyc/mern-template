const async = require('async')

const bcrypt = require('bcrypt')
const saltRounds = 10

const User = require('../models/User')
const Todo = require('../models/Todo')

const db = require('./db')
// mongoose.Promise = global.Promise  

const cors = require('cors')
db.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

let userInstances = []

function log(err, results) {
    if (err) {
        console.log('ERROR:', err)
    }
    else {
        console.log('results:', JSON.stringify(results)) 
    }
}

function todoCreate(todoDetails, logger) {
    let todo = new Todo(todoDetails)
    todo.save(function (err) {
        if (err) {
            logger(err, null)
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
        user.save(function (err) {
            if (err) {
                logger(err, null)
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

async.series([ create1User ],
function(err, results) {
    if (err) {
        console.log('FINAL ERR:', err)
    }
    else {
        console.log('userInstances:', JSON.stringify(userInstances))
        
    }
    mongoose.connection.close()
})