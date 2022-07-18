const Movie = require('../models/Movie');


exports.index = function(req,res) {
    /// if req params ... filter
    Movie.find({},
        (err,docs) => {
            let results = ['no results'];
            if (err) {
                res.send(err);
            } else if (docs.length>0) {            
                results = docs.map((doc,i)=>{ return {
                    // or do I need whole doc?
                    _id: doc._id
                }
                });
            }
            res.send(results)
        }
	);
};

exports.show = function(req,res) {
    console.log('req', req.params)
    Movie.findById(req.params.id, function(err,doc) {
        if (err) {
            return res.send(err);
        } else {
            return res.json(doc);
        }
    });
};

exports.create = function(req, res) {
    let params = req.body;
    params.created_by = res.locals.user._id;
    let movie = new Movie(params);
    movie.save(function (err, doc) {
        if (err) {
            return res.send(err);
        } else {
            return res.json(doc);
        }
    });
 };

 exports.update = function(req, res) {
	
    let params = req.body;
	if (req.body.identity){
        params.last_name = req.body.identity[1].value;
        params.first_name = req.body.identity[0].value;
    }
    
    Movie.findOneAndUpdate({"_id": req.params.id},params,
        {new: true},
        (err,doc) => {
            if (err) {
                res.send(err);
            } else {
                res.json(doc);
            }
        }
    );
 };

 exports.delete = (req, res) => {
     console.log(req.params, 'params');
     Movie.findOneAndDelete({"_id": req.params.id},
     (err,doc) => {
        if (err) {
            res.send(err);
        } else {
            let response = doc._id;
            res.send(response);
        }
     });
 };

 exports.search = function(req,res) {
	let query = req.body;
	console.log(query, 'search');
    Movie.find({$text: {$search: query}})
    //    .skip(20)
       .limit(10)
       .exec((err,docs) => {
		let results = ['no results'];
		if (err) {
			res.send(err);
		} else if (docs.length>0) {            
			results = docs
		}
		res.send(results)
	});
};

exports.store = function(req,res) {
    let query = req.body;
    Movies
}