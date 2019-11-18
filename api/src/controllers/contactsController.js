const mongoose = require('mongoose');

const User = require('../models/User');
const Contact = require('../models/Contact');

exports.index = function(req, res) {
    console.log('contact index');
}

exports.create = function(req, res) {
    let params = req.body;
    console.log('params', params);
    let contact = new Contact(params);
    User.findByIdAndUpdate(req.user.id, {$push: {contacts: contact}}, {new: true}, (err,doc)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(doc.contacts);
        }
    });
 };

exports.update = function(req, res) {
    console.log('contact update');
}

exports.delete = function(req, res) {
    console.log('contact delete');
}