
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var connect = require('connect');

var mongo = require('mongodb');
//https://github.com/baugarten/node-restful
var restful = require('node-restful');
var mongoose = restful.mongoose;

var app = express();


var server = http.createServer(app);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.basicAuth("admin", 'admin'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.bodyParser());
app.use(express.query());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://freshlybakedapps:Nelson12345@dbh62.mongolab.com:27627/pithy");

//create restful endpoint
var users = require('./users');
users.init(app,mongoose,restful);


if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);




/*
var getMessage = function(userData, reqExit) {
    var m = null;
    var is_exit = (typeof reqExit === "undefined") ? false : reqExit;
    User.find({ facebookId: userData.facebookId },function(err,users){       
        var m = null;
        Message.find(function(err,messages){
          var rand=Math.floor(Math.random() * messages.length);
          m=messages[rand];
          console.log(">>>>>>>>>>> "+is_exit);
          io.sockets.emit('message', {user:users[0],message:m, userExited:is_exit});  
        });      
    });
}
*/

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
 