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

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);

	//curl --include -X POST -H "Content-Type: application/json" -d '{"title":"Amin Torres"}' http://localhost:3000/api/topic/create
	
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
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
