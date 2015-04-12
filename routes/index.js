/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// create a route that handles signin

function signin(req, res) {
  
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
function signout(req, res) {
  keystone.session.signout(req, res, function() {
    res.json({ 'signedout': true });
  });
}

// also create some middleware that checks the current user

// as long as you're using Keystone's session management, the user
// will already be loaded if there is a valid current session

function checkAuth(req, res, next) {
  // you could check user permissions here too
  if (req.user) return next();
  return res.status(403).json({ 'error': 'no access' });
}



// check that the key has been provided in the request body,
// could also be a header
 
function checkAPIKey(req, res, next) {
	// you would have the key in an env variable or load it from
	// your database or something.
	if (req.query.apiKey === "Nelson12345") return next();
	return res.status(403).json({ 'error': 'No access. Make sure you pass apiKey query to get access' });
} 

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);

	//how to add a topic via the terminal
	//curl --include -X POST -H "Content-Type: application/json" -d '{"title":"Amin Torres"}' http://localhost:3000/api/topic/create
	

	

	// add an API endpoint for signing in _before_ your protected routes
	app.post('/api/signin', signin);
	app.post('/api/signout', signout);

	
	//app.all('/api*', checkAuth);


	// then bind that middleware in your routes before any paths
	// that should be protected
	app.all('/api*', checkAPIKey);

	app.get('/api/appuser', keystone.middleware.api, routes.api.appusers.list);
	app.all('/api/appuser/create', keystone.middleware.api, routes.api.appusers.create);
	app.get('/api/appuser/:id', keystone.middleware.api, routes.api.appusers.get);
	app.all('/api/appuser/:id/update', keystone.middleware.api, routes.api.appusers.update);
	app.get('/api/appuser/:id/remove', keystone.middleware.api, routes.api.appusers.remove); 

	app.get('/api/vote', keystone.middleware.api, routes.api.votes.list);

	app.get('/api/vote/gender/:gender', keystone.middleware.api, routes.api.votes.gender);
	app.get('/api/vote/feeling/:feeling', keystone.middleware.api, routes.api.votes.feeling);

	app.get('/api/vote/:topic/gender/:gender', keystone.middleware.api, routes.api.votes.topicgender);
	app.get('/api/vote/:topic/feeling/:feeling', keystone.middleware.api, routes.api.votes.topicfeeling);


	app.all('/api/vote/create', keystone.middleware.api, routes.api.votes.create);
	app.get('/api/vote/:id', keystone.middleware.api, routes.api.votes.get);
	app.all('/api/vote/:id/update', keystone.middleware.api, routes.api.votes.update);
	app.get('/api/vote/:id/remove', keystone.middleware.api, routes.api.votes.remove); 
	 
	app.get('/api/topic', keystone.middleware.api, routes.api.topics.list);
	app.all('/api/topic/create', keystone.middleware.api, routes.api.topics.create);
	app.get('/api/topic/:id', keystone.middleware.api, routes.api.topics.get);
	app.all('/api/topic/:id/update', keystone.middleware.api, routes.api.topics.update);
	app.get('/api/topic/:id/remove', keystone.middleware.api, routes.api.topics.remove); 

	app.get('/api/feeling', keystone.middleware.api, routes.api.feelings.list);
	app.all('/api/feeling/create', keystone.middleware.api, routes.api.feelings.create);
	app.get('/api/feeling/:id', keystone.middleware.api, routes.api.feelings.get);
	app.all('/api/feeling/:id/update', keystone.middleware.api, routes.api.feelings.update);
	app.get('/api/feeling/:id/remove', keystone.middleware.api, routes.api.feelings.remove); 

	app.all('/api/feeling/:id/increaseCount', keystone.middleware.api, routes.api.feelings.increaseCount);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
