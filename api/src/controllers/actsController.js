const User = require('../models/User');
const Act = require('../models/Act');

exports.index = function(req, res) {
    console.log('act index');
}

exports.create = function(req, res) {
    let params = req.body;
    console.log('params', params);
    let act = new Act(params);
    User.findByIdAndUpdate(req.user.id, {$push: {acts: act}}, {new: true}, (err,doc)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(doc.acts);
        }
    });
 };

exports.update = function(req, res) {
    console.log('act update');
}

exports.delete = function(req, res) {
    console.log('act delete');
}