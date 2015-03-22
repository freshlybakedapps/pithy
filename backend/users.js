//https://github.com/ncb000gt/node.bcrypt.js/
var bcrypt = require('bcrypt');

//POST using curl
//curl --include -X POST -H "Content-Type: application/json" -d '{"username":"xyz","email":"xyz","password":"xyz","date":"xyz"}' http://localhost:3000/users

//GET all messages
//curl --include -X GET http://localhost:3000/users

//http://localhost:3000/users?select=email
///users/?sort=name

exports.init = function(app,mongoose,restful){

var User = app.user = restful.model('user', mongoose.Schema({
    username: 'string',
    email: 'string',
    password: 'string',
    date: 'string'
  }))
  .methods(['get', 'post', 'put', 'delete'])
  .after('get',function(req, res, next){
    //console.log(">>>>>>>>>>> "+res.locals.bundle[0].password);
    
     
    next();
  })
  .before('post', hash_password)
  .before('put', hash_password);

function hash_password(req, res, next) {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
          req.body.password = hash;
          next();
      });
  });
}

//curl --include -X POST -H "Content-Type: application/json" -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/users/login
User.route('login.post', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.find({ username: username },function(err,users){
    console.log;

    // Load hash from your password DB.
    var passwordHash = users[0].password;
    bcrypt.compare(password, passwordHash, function(err, response) {
        if(response == true){
          res.send('login successful');
        }else{
          res.send('wrong username or password');
        }
        
    });
  });
  
  
});

User.register(app, '/users');


  
}