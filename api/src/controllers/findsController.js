const User = require('../models/User');
const Movie = require('../models/Movie');
const Trope = require('../models/Trope');
const Find = require('../models/Find');

exports.index = function(req, res) {
    console.log('todos index');
}

exports.show = (req, res) => {
    console.log('todos show');
}

exports.create = function(req, res) {
    let params = req.body;
    let todo = new Find(params);
    User.findByIdAndUpdate(res.locals.user._id, {$push: {todos: todo}}, {new: true}, (err,doc)=>{
        if (err) {
            console.log('err in todo create');
            res.send([err]);
        } else {
            console.log(doc.todos);
            res.send(doc.todos);
        }
    });
 };

exports.update = function(req, res) {
    let params = req.body;
    console.log('todo params ud', params);
    User.findOneAndUpdate(
        {"_id": res.locals.user._id, "todos._id": params._id},
        {
            "$set": {"todos.$": params}
        },
        {new: true},
        (err,doc) => {
        if (err) {
            res.send([err]);
        } else {
            res.send(doc.todos);
        }
    });
};

exports.delete = function(req, res) {
    let params = req.body;
    User.findOneAndUpdate(
        {"_id": res.locals.user._id},
        {
         "$pull": { "todos": { "_id": params._id } }
        },
        {new: true},
        (err,doc) => {
        if (err) {
            res.send([err]);
        } else {
            console.log(doc)
            res.send(doc.todos);
        }
    });
};
