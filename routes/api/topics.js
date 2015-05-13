var async = require('async'),
	keystone = require('keystone');
	client = require('../../models/Client');

var Topic = keystone.list('Topic');


		

		


/**
 * List Topic
 */
exports.list = function(req, res) {
	
	/*

	client.getAccessToken(req.query.access_token, function(err, obj){
		console.log(obj.userId);

		Topic.model.find().where('createdBy', obj.userId).exec(function(err, items) {
			if (err) return res.apiError('database error', err);		
				res.apiResponse({
					topics: items
				});
			})

		
		//keystone.list('User').model.findOne({ _id: obj.userId}).exec(function(err, user) {
		//	console.log(user);
		//})
	});

	*/

	
	Topic.model.find(function(err, items) {
	//Topic.model.find({status:'Approved'}).exec(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			topics: items
		});
		
	});
	
}

/**
 * Get Topic by ID
 */
exports.get = function(req, res) {
	Topic.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			topics: item
		});
		
	});
}


/**
 * Create a Topic
 */
exports.create = function(req, res) {
	
	var item = new Topic.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			topics: item
		});
		
	});
}

/**
 * Get Post by ID
 */
exports.update = function(req, res) {
	Topic.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				topics: item
			});
			
		});
		
	});
}

/**
 * Delete Post by ID
 */
exports.remove = function(req, res) {
	Topic.model.findById(req.params.id).exec(function (err, item) {
		
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
