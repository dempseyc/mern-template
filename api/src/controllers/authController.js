const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.login = function (req,res){
    if (res.locals.details) {
        try {
            User.findOne({email: res.locals.details[0].toString()}, function (err,user) {
            if (err) {
                console.log(`some mongoose err, ${err}`);
                return res.status(401).json({message: 'Invalid Password/Email 0'});
            }
            else if (user) {
                console.log('user', user);
                bcrypt.compare(res.locals.details[1], user.pw_hash.toString(), (err, isMatch) => {
                    if (err) {
                        console.log(`err from bcrypt`);
                        return res.status(401).json({message: 'Invalid Password/Email 1'});
                    } else if (isMatch) {
                        var token = jwt.sign({user_id: user._id}, process.env.TOKEN_KEY);
                        return res.status(200).json({
                            user_id: user._id,
                            email: user.email,
                            username: user.username,
                            token: token,
                        });
                    } else {
                        console.log(`bad pw`);
                        return res.status(401).json({message: 'Invalid Password/Email 2'});
                    }
                });
            } else { 
                console.log(`no user, no err?`);
                res.status(401).json({message: 'Invalid Password/Email 3'})
                return res.end();
            }
        })
        } catch (error) {
            console.log(`findOne error--> ${error}`);
            return res.status(401).json({message: 'Invalid Password/Email 4'});
        }
    } else {
        console.log(`no details`);
        return res.status(400).json({message:'No Auth Details'});
    }
};

// var passport = require('passport');

// exports.fb_login = function(req,res) {
//     console.log(req.body, 'success');
//     return res.status(200).json(req.body.user)
// } 

// exports.fb_fail = function(req,res) {
//     console.log(req.body, 'fail');
//     return res.status(401).json({message: 'fb failed login'})
// }

// exports.fb_logout = function(req,res, next) {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         return res.status(402).json({message: 'fb logged out'})
//     })
// }