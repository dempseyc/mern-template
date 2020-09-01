const User = require('../models/User');
const Todo = require('../models/Todo');

exports.index = function(req, res) {
    console.log('todos index');
}

exports.show = (req, res) => {
    console.log('todos show');
}

exports.create = function(req, res) {
    let params = req.body;
    console.log('todo params cr', params, 'req.params.user', req.params.user);
    let todo = new Todo(params);
    User.findByIdAndUpdate(req.params.user.id, {$push: {todos: todo}}, {new: true}, (err,doc)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(doc.todos);
        }
    });
 };

exports.update = function(req, res) {
    let params = req.body;
    console.log('todo params ud', params);
    User.findByIdAndUpdate(
        {"_id": params.user.id, "todos._id": params.todo._id},
        {
            "$set": {"todos.$": todo}
        }, (err,doc) => {
        if (err) {
            res.send(err);
        } else {
            res.send(doc.todos);
        }
    });
};

exports.delete = function(req, res) {
    console.log('todos delete');
}