require('dotenv').config();

const express = require('express');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const morgan = require('morgan');
const logger = require('./logger');
const bodyParser = require('body-parser');
const app = express();

const db = require('./db/db'); //mongostuff
const cors = require('cors');

const jwt = require('jsonwebtoken');

const userRouter = require('./routes/userRouter');
const todoRouter = require('./routes/todoRouter');

const User = require('./models/User');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth/login', function(req,res,next) {
    const auth = req.headers.auth.split(' ')[1];
    try {
        const details = Buffer.from(auth, 'base64').toString().split(':');
        req.details = details;
        console.log('req.details', req.details);
        next();
    } catch(e) {
        next();
    }
});

// check for token and assign to user
app.use(function(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_KEY, function (err, payload) {
            if (payload) {
                User.findById(payload.user_id).then(
                    (doc) => {
                        req.user = doc;
                        next();
                    }
                )
            } else {
                next();
            }
        })
    } catch(err) {
        next();
    }
});

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

app.use('/api/user/:id/todos', todoRouter);
app.use('/api/user', userRouter);

app.get('/', function (req, res) {
    logger.debug('Debug statement');
    logger.info('Info statement');
    res.send('Hello World!');
});

app.post('/api/auth/login', function(req,res){
    if (req.details) {
        User.findOne({email: req.details[0].toString()}, function (err,user) {
            if(user) {
                bcrypt.compare(req.details[1], user.pw_hash.toString(), (err, isMatch) => {
                    if (err) {
                        throw err;
                    } else if (isMatch) {
                        var token = jwt.sign({user_id: user._id}, process.env.TOKEN_KEY);
                        res.status(200).json({
                            user_id: user._id,
                            email: user.email,
                            f_name: user.f_name,
                            l_name: user.l_name,
                            token
                        });
                    } else {
                        res.status(401).json({message: 'Invalid Password/Username'});
                    }
                });
            } else { 
                res.status(401).json({message: 'Email not Found'});
            }
        })
        .catch((err) => {
            res.status(400).json({message:'Invalid Request'});
        })
    } else {
        res.status(400).json({message:'No Auth Details'});
    }
});

app.listen(process.env.PORT||3002, function () {
  console.log('Example app listening on port 3002!')
});

module.exports = app;

