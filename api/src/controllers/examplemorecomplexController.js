const mongoose = require('mongoose');

const Program = require('../models/Program');
const Recipient = require('../models/Recipient');

const ProgItem = require('../models/ProgItem');

exports.index = function(req,res) {
    Program
    .find({})
    .populate('items')
    .exec((err,docs) => {
        let results = [];
        if (err) {
            res.send(err);
        } else if (docs.length>0) {            
            results = docs
        }
        res.json(results)
    });
};

exports.show = function(req,res) {
    Program.findById(req.params.prog_id, function(err,doc) {
        if (err) {
            return res.send(err);
        } else {
            return res.json(doc);
        }
    });
};

exports.create = function(req, res) {
    let params = req.body;
    let prog = new Program(params);
    prog.save(function (err, doc) {
        if (err) {
            return res.send(err);
        } else {
            Recipient.findByIdAndUpdate(doc.recip_id, {$push: {programs: doc._id}}, {new: true}, (err,rec)=>{
                if (err) {
                    return res.send(err);
                } else {
                    res.json(doc);
                }
            })
        }
    });
 };

exports.update = function(req, res) {
    let params = req.body;
    if (params.hasOwnProperty('item_id')) {
        console.log('updateitem')
        ProgItem.findByIdAndUpdate(params.item_id, {$set: {item_data: params.item_data}}, {new: true}, (err,doc) => {
            if (err) {
                res.send([err])
            } else {
                Program.findById(req.params.prog_id, (err,doc) => {
                    if (err) {
                        res.send([err])
                    } else {
                        res.json(doc)
                    }
                 });
            }
        });
    } else if (params.hasOwnProperty('item_data')) {
        console.log('createitem')
        params.prog_id = req.params.prog_id;
        // make new Item with Item_data, save it, get id, push Item Id to items
        let item = new ProgItem(params)
        item.save(function (err,item){
            if (err) {
                res.send([err]);
            } else {
                var newItemId = item._id;
                Program.findByIdAndUpdate(req.params.prog_id, {$push: {items: newItemId} }, {new: true}, (err,doc)=>{
                    if (err) {
                        res.send([err])
                    } else {
                        res.json(doc)
                    }
                });
            }
        });
    } else if (params.hasOwnProperty('intake_data')){
        console.log('edit intake data')
        Program.findByIdAndUpdate(req.params.prog_id, {$set: {intake_data: params.intake_data }}, {new: true}, (err,doc)=>{
            if (err) {
                res.send([err])
            } else {
                res.json(doc)
            }
        });
    } else {
        console.log('add intake data')
        Program.findByIdAndUpdate(req.params.prog_id, {$push: { intake_data: params }},{new : true}, (err,doc) => {
            if (err) {
                res.send([err])
            } else {
                res.json(doc)
            }
        })
    }
};

exports.delete = function(req, res) {
    Program.findByIdAndRemove(req.params.prog_id,{},(err,prog)=>{
        if (err) {
            res.send([err]);
        } else {
            console.log(prog._id, 'progid')
            Recipient.findByIdAndUpdate(prog.recip_id,{
            $pull: { programs: prog._id }
            },{new: true},(err,doc)=>{
                if (err) {
                    res.send([err]);
                } else {
                    res.json(prog)
                }
            });
        }
    });
};

exports.selection = function(req,res) {
    let arr = req.body.prog_ids.map(id=>mongoose.Types.ObjectId(id))
    console.log(arr)
    Program
    .find({
        '_id': { $in: [...arr]}
    })
    .populate('items')
    .exec((err, docs) => {
        let results = [];
            if (err) {
                res.send([err]);
            } else if (docs.length>0) {            
                results = docs.map(doc=>doc.populate('items'))
            }
            res.json(results)
    });
}
