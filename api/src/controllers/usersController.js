// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

exports.show = function(req,res) {
    console.log(res.locals.user)
    if (res.locals.user) {
        User.findById(res.locals.user._id, function(error,response) {
            if (error) {
                return res.send(error);
            } else {
                response.pw_hash = 'secured';
                return res.json(response);
            }
        });
    } else {
        res.status(400).json({message: 'Invalid Password/Username'});
    }
}

exports.create = function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(error, hash) {
        let params = req.body;
        params.pw_hash = hash;
        let user = new User(params);
        user.save(function (error, response) {
            if (error) {
                return res.send(error);
            } else {
                res.json(response);
            }
        });
    });
 };

 exports.update = function(req, res) {
    console.log('user update');
    bcrypt.hash(req.body.newPassword, saltRounds, function(error, hash) {
        let params = req.body;
        params.pw_hash = hash;
        params = (({f_name,l_name,email,pw_hash}) => ({f_name,l_name,email,pw_hash}))(params)
        User.findOneAndUpdate({"_id": res.locals.user._id},{
            f_name: params.f_name,
            l_name: params.l_name,
            email: params.email,
            pw_hash: params.pw_hash
        },
        {new: true},
        (error,doc) => {
            if (error) {
                res.send([error]);
            } else {
                res.send(doc);
            }
        });
    });
 };

 exports.delete = (req, res) => {
     console.log('user delete');
     User.findOneAndDelete({"_id": res.locals.user._id},
     (error,doc) => {
         if (error) {
             res.send([error]);
         } else {
             res.send(["user deleted"]);
         }
     });
 };