var async = require('async'),
	keystone = require('keystone');

var Reaction = keystone.list('Reaction');

/**
 * List Reaction
 */
exports.list = function(req, res) {

	Reaction.model.find().populate('topic').exec(function(err, items) {
	    if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			reactions: items
		});
	});


	/*
	Reaction.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			reactions: items
		});
		
	});
	*/
}

/**
 * Get Reaction by ID
 */
exports.get = function(req, res) {
	Reaction.model.findById(req.params.id).populate('topic').exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			reactions: item
		});
		
	});
}


/**
 * Create a Reaction
 */
exports.create = function(req, res) {
	
	var item = new Reaction.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			reactions: item
		});
		
	});
}

/**
 * Get Reaction by ID
 */
exports.update = function(req, res) {
	Reaction.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				reactions: item
			});
			
		});
		
	});
}

/**
 * Delete Reaction by ID
 */
exports.remove = function(req, res) {
	Reaction.model.findById(req.params.id).exec(function (err, item) {
		
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


/**
 * Increase counter by 1
 */
exports.increaseCount = function(req, res) {
	Reaction.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.count++;

		
		var data = {
		    title: item.title,
		    count: item.count,
		    createdAt: Date.now,
		    publishedAt: Date.now,
		}

		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				reactions: item
			});
			
		});
		
	});
}
