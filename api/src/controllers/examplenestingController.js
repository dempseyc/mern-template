const Program = require('../models/Program');
const ProgItem = require('../models/ProgItem');

exports.index = function(req, res) {
    console.log('progItems index');
}

exports.show = (req, res) => {
    console.log('progItems show');
}

exports.create = function(req, res) {
    let params = req.body;
    let item = new ProgItem(params);
    Program.findByIdAndUpdate(params.prog_id, {$push: {"items": item}, $inc : { "item_count" : 1 }}, {new: true}, (err,doc)=>{
        if (err) {
            console.log('err in todo create');
            res.send([err]);
        } else {
            console.log(doc.items);
            res.send(doc.items);
        }
    });
 };

exports.update = function(req, res) {
    let params = req.body;
    console.log('todo params ud', params);
    Program.findOneAndUpdate(
        {"_id": params.prog_id, "items._id": params._id},
        {
            "$set": {"items.$": params}
        },
        {new: true},
        (err,doc) => {
        if (err) {
            res.send([err]);
        } else {
            res.send(doc.items);
        }
    });
};

exports.delete = function(req, res) {
    let params = req.body;
    Program.findOneAndUpdate(
        {"_id": params.prog_id},
        {
         "$pull": { "items": { "_id": params._id } }
        },
        {new: true},
        (err,doc) => {
        if (err) {
            res.send([err]);
        } else {
            console.log(doc)
            res.send(doc.items);
        }
    });
};
