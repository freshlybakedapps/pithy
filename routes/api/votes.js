var async = require('async'),
	keystone = require('keystone');

var Vote = keystone.list('Vote');

/**
 * List Vote
 */
exports.list = function(req, res) {

	if(req.query.user){
		

		//http://localhost:3000/api/vote/?apiKey=Nelson12345&user=550df5d4d42c5c2a79d142b3


		//only return votes by this user
		Vote.model.find().where('user', req.query.user).populate('topic feeling').exec(function(err, items) {
		    if (err) return res.apiError('database error', err);
			
			res.apiResponse({
				votes: items
			});
		});
	}else{
		Vote.model.find().populate('topic feeling').exec(function(err, items) {
	    if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			votes: items
		});
	});
	}

	


	
}

/**
 * Get Vote by ID
 */
exports.get = function(req, res) {
	Vote.model.findById(req.params.id).populate('topic feeling').exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			votes: item
		});
		
	});
}


/**
 * Create a Vote
 */
exports.create = function(req, res) {
	
	var item = new Vote.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			votes: item
		});
		
	});
}

/**
 * Get Post by ID
 */
exports.update = function(req, res) {
	Vote.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				votes: item
			});
			
		});
		
	});
}

/**
 * Delete Post by ID
 */
exports.remove = function(req, res) {
	Vote.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}
