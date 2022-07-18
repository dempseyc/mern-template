const Trope = require('../models/Trope');

exports.index = function(req,res) {
    Trope.find({},
        (err,docs) => {
            let results = ['no results'];
            if (err) {
                res.send(err);
            } else if (docs.length>0) {            
                results = docs;
            }
            res.json(results)
        }
	);
};

exports.show = function(req,res) {
    Trope.findById(req.params.id, function(err,doc) {
        if (err) {
            return res.send(err);
        } else {
            return res.json(doc);
        }
    });
};

exports.create = function(req, res) {
    let params = req.body;
    let trope = new Trope(params);
    trope.save(function (error, response) {
        if (error) {
            return res.send(error);
        } else {
            res.json(response);
        }
    });
 };

exports.update = function(req, res) {
    let params = req.body;
    // console.log('prog class', params);
    Trope.findOneAndUpdate({"_id": req.params.id},
        params,
        {new: true},
        (error,doc) => {
            if (error) {
                res.send([error]);
            } else {
                res.send(doc);
            }
        }
    );
};

exports.delete = function(req, res) {
    Trope.findOneAndDelete({"_id": req.params.id},
    (error,doc) => {
         if (error) {
             res.send([error]);
         } else {
             res.send(["One Trope deleted", req.params.id]);
         }
     });
};
