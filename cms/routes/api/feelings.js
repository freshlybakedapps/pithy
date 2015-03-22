var async = require('async'),
	keystone = require('keystone');

var Feeling = keystone.list('Feeling');

/**
 * List Feeling
 */
exports.list = function(req, res) {
	Feeling.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			feelings: items
		});
		
	});
}

/**
 * Get Feeling by ID
 */
exports.get = function(req, res) {
	Feeling.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			feelings: item
		});
		
	});
}


/**
 * Create a Feeling
 */
exports.create = function(req, res) {
	
	var item = new Feeling.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			feelings: item
		});
		
	});
}

/**
 * Get Post by ID
 */
exports.update = function(req, res) {
	Feeling.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				feelings: item
			});
			
		});
		
	});
}

/**
 * Delete Post by ID
 */
exports.remove = function(req, res) {
	Feeling.model.findById(req.params.id).exec(function (err, item) {
		
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
