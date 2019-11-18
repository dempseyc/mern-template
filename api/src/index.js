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

// move constants to .env file or something
const key = {TOKEN_KEY: 'DA_TOKEN_KEY' };

const userRouter = require('./routes/userRouter');

const User = require('./models/User');

// protect routes but give access to celeste bot ???

// function protectRoute(req,res,next){
//   // if user exists the token was sent with the request
//   if(req.user){
//    //if user exists then go to next middleware
//      next();
//   }
// // token was not sent with request send error to user
//   else{
//      res.status(500).json({error:'login is required'});
//   }
// }

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
        jwt.verify(token, key.TOKEN_KEY, function (err, payload) {
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

app.use('/api/user', userRouter);

app.get('/', function (req, res) {
    logger.debug('Debug statement');
    logger.info('Info statement');
    res.send('Hello World!');
});

app.post('/api/auth/login', function(req,res){
    if (req.details) {
        User.findOne({email: req.details[0].toString()}, function (err,user) {
                bcrypt.compare(req.details[1], user.pw_hash.toString(), (err, isMatch) => {
                    if (isMatch) {
                        var token = jwt.sign({user_id: user._id}, key.TOKEN_KEY);
                        res.status(200).json({
                            user_id: user._id,
                            email: user.email,
                            f_name: user.f_name,
                            l_name: user.l_name,
                            token
                        })
                    } else {
                        res.status(400).json({message: 'Invalid Password/Username'});
                    }
                });
        })
        .catch((err) => {
            res.status(400).json({message:'Invalid Request'});
        })
    } else {
        res.status(400).json({message:'No Auth Details'});
    }
});

// need middleware to handle error

// app.use(function(req, res, next){
//     logger.error('404 page requested');
//     res.status(404).send('This page does not exist!');
// });

app.listen(3001, function () {
  console.log('Example app listening on port 8080!')
});

module.exports = app;

