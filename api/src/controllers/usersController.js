// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

exports.show = function(req,res) {
    if (req.user) {
        User.findById(req.user.id, function(error,response) {
            if (error) {
                return res.send(error);
            } else {
                return res.json(response);
            }
        });
    } else {
        res.status(400).json({message: 'Invalid Password/Username'});
    }
}

exports.create = function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
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
 }

 exports.delete = (req, res) => {
     console.log('user delete');
 }