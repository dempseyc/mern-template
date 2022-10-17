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
                        const token = jwt.sign({user_id: user._id}, process.env.TOKEN_KEY);
                        const info = {
                            user_id: user._id,
                            email: user.email,
                            username: user.username,
                            token: token,
                        };
                        console.log(info);
                        return res.status(200).json(info);
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