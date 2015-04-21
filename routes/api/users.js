var async = require('async'),
	keystone = require('keystone');

var User = keystone.list('User');

/**
 * List User
 */
exports.list = function(req, res) {

	User.model.find().exec(function(err, items) {
	    if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			users: items
		});
	});
}

/**
 * Get User by ID
 */
exports.get = function(req, res) {
	User.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			user: item
		});
		
	});
}


/**
 * Create a User
 */
exports.create = function(req, res) {
	
	var item = new User.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			user: item
		});
		
	});
}

/**
 * Get User by ID
 */
exports.update = function(req, res) {
	User.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				user: item
			});
			
		});
		
	});
}

/**
 * Delete User by ID
 */
exports.remove = function(req, res) {
	User.model.findById(req.params.id).exec(function (err, item) {
		
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

exports.signin = function(req, res) {
  
  if (!req.body.username || !req.body.password) return res.json({ success: false });
  
  keystone.list('User').model.findOne({ email: req.body.username }).exec(function(err, user) {
    
    if (err || !user) {
      return res.json({
        success: false,
        session: false,
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
    }
    
    keystone.session.signin({ email: user.email, password: req.body.password }, req, res, function(user) {
      
      return res.json({
        success: true,
        session: true,
        date: new Date().getTime(),
        userId: user.id
      });
      
    }, function(err) {
      
      return res.json({
        success: true,
        session: false,
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
      
    });
    
  });
}

// you'll want one for signout too
exports.signout = function(req, res) {
  keystone.session.signout(req, res, function() {
    res.json({ 'signedout': true });
  });
}

