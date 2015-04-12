var async = require('async'),
	keystone = require('keystone');

var Appuser = keystone.list('Appuser');

/**
 * List Appuser
 */
exports.list = function(req, res) {

	Appuser.model.find().exec(function(err, items) {
	    if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			appuser: items
		});
	});
}

/**
 * Get Appuser by ID
 */
exports.get = function(req, res) {
	Appuser.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			appuser: item
		});
		
	});
}


/**
 * Create a Appuser
 */
exports.create = function(req, res) {
	
	var item = new Appuser.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			appuser: item
		});
		
	});
}

/**
 * Get Appuser by ID
 */
exports.update = function(req, res) {
	Appuser.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				appusers: item
			});
			
		});
		
	});
}

/**
 * Delete Appuser by ID
 */
exports.remove = function(req, res) {
	Appuser.model.findById(req.params.id).exec(function (err, item) {
		
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
