var async = require('async'),
	keystone = require('keystone');

var Vote = keystone.list('Vote');

/**
 * List Vote
 */
exports.list = function(req, res) {

	
	var query = {};
	var populate = "";
	
	//http://localhost:3000/api/vote/?apiKey=Nelson12345&user=550df5d4d42c5c2a79d142b3
	if(req.query.user){
		query['appuser'] = req.query.user;
	}

	

	//http://localhost:3000/api/vote/?apiKey=Nelson12345&populate=true
	if(req.query.populate == "true"){
		populate = 'topic feeling appuser';
	}

	//only return votes by this user
	Vote.model.find(query).populate(populate).exec(function(err, items) {

	    if (err) return res.apiError('database error', err);

	    var clone = items.slice(0);


	    //http://localhost:3000/api/vote/?apiKey=Nelson12345&populate=true&filterGender=Female
	   	if(req.query.filterGender){
	   		for (var i = clone.length - 1; i >= 0; i--) {
		   		var gender = clone[i].appuser.gender;

		   		if(gender != req.query.filterGender){
		   			//console.log(clone[i]);
		   			if(clone.length > 1){
		   				clone.splice(i, 1);
		   			}
		   		}
		   	};
	   	}
	   	
	   	res.apiResponse({
			votes: clone
		});
	});

	


	
}

/**
 * Get Vote by topic and gender
 * /api/vote/:topic/gender/:gender
 * http://localhost:3000/api/vote/550df81f6e1573c77c2f24f8/gender/Female?apiKey=Nelson12345
 */
exports.topicgender = function(req, res) {

	
	var query = {};
	var populate = 'topic feeling appuser';
	
	//http://localhost:3000/api/vote/?apiKey=Nelson12345&user=550df5d4d42c5c2a79d142b3
	if(req.query.user){
		query['appuser'] = req.query.user;
	}

	Vote.model.find(query).populate(populate).exec(function(err, items) {

	    if (err) return res.apiError('database error', err);

	    
	    var arr = [];

	    for (var i = items.length - 1; i >= 0; i--) {
	   		var gender = items[i].appuser.gender;
	   		var topic = items[i].topic.id;

	   		if(gender == req.params.gender && topic == req.params.topic){
	   			arr.push(items[i]);
	   		}
	   	};
	   	
	   	
	   	res.apiResponse({
			votes: arr
		});
	});
}


/**
 * Get Vote by topic and feeling
 * /api/vote/:topic/feeling/:feeling
 * http://localhost:3000/api/vote/550df81f6e1573c77c2f24f8/feeling/5529b1f7f38b849e6b46411a?apiKey=Nelson12345
 */
exports.topicfeeling = function(req, res) {
	var query = {};
	var populate = 'topic feeling appuser';
	
	//http://localhost:3000/api/vote/?apiKey=Nelson12345&user=550df5d4d42c5c2a79d142b3
	if(req.query.user){
		query['appuser'] = req.query.user;
	}

	Vote.model.find(query).populate(populate).exec(function(err, items) {

	    if (err) return res.apiError('database error', err);

	    
	    var arr = [];

	    for (var i = items.length - 1; i >= 0; i--) {
	   		var feeling = items[i].feeling.id;
	   		var topic = items[i].topic.id;

	   		if(feeling == req.params.feeling && topic == req.params.topic){
	   			arr.push(items[i]);
	   		}
	   	};
	   	
	   	
	   	res.apiResponse({
			votes: arr
		});
	});
}


/**
 * Get all Votes by gender
 * api/vote/gender/:gender
 * http://localhost:3000/api/vote/gender/Female?apiKey=Nelson12345
 */
exports.gender = function(req, res) {
	var query = {};
	var populate = 'topic feeling appuser';
	
	//http://localhost:3000/api/vote/?apiKey=Nelson12345&user=550df5d4d42c5c2a79d142b3
	if(req.query.user){
		query['appuser'] = req.query.user;
	}

	Vote.model.find(query).populate(populate).exec(function(err, items) {

	    if (err) return res.apiError('database error', err);

	    
	    var arr = [];

	    for (var i = items.length - 1; i >= 0; i--) {
	   		var gender = items[i].appuser.gender;
	   		

	   		if(gender == req.params.gender){
	   			arr.push(items[i]);
	   		}
	   	};
	   	
	   	
	   	res.apiResponse({
			votes: arr
		});
	});
}

/**
 * Get all Votes by feeling
 * api/vote/feeling/:feeling
 * http://localhost:3000/api/vote/feeling/{feeling id}?apiKey=Nelson12345
 */
exports.feeling = function(req, res) {
	var query = {};
	var populate = 'topic feeling appuser';
	
	//http://localhost:3000/api/vote/?apiKey=Nelson12345&user=550df5d4d42c5c2a79d142b3
	if(req.query.user){
		query['appuser'] = req.query.user;
	}

	Vote.model.find(query).populate(populate).exec(function(err, items) {

	    if (err) return res.apiError('database error', err);

	    
	    var arr = [];

	    for (var i = items.length - 1; i >= 0; i--) {
	   		var feeling = items[i].feeling.id;
	   		

	   		if(feeling == req.params.feeling){
	   			arr.push(items[i]);
	   		}
	   	};
	   	
	   	
	   	res.apiResponse({
			votes: arr
		});
	});
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
