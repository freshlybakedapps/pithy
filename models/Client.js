var keystone = require('keystone'),
    Types = keystone.Field.Types;
var mongoose = keystone.mongoose,
  Schema = mongoose.Schema,
  model = module.exports;


  var OAuthAccessTokensSchema = new Schema({
  accessToken: { type: String },
  client_id: { type: String },
  userId: { type: String },
  expires: { type: Date }
});

var OAuthRefreshTokensSchema = new Schema({
  refreshToken: { type: String },
  client_id: { type: String },
  userId: { type: String },
  expires: { type: Date }
});

mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);

var OAuthAccessTokensModel = mongoose.model('OAuthAccessTokens'),
  OAuthRefreshTokensModel = mongoose.model('OAuthRefreshTokens');
//
// oauth2-server callbacks
//
model.getAccessToken = function (bearerToken, callback) {
  console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

  OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);

  
};

model.getClient = function (clientId, clientSecret, callback) {
  console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
  if (clientSecret === null) {
    // return OAuthClientsModel.findOne({ client_id: clientId }, callback);
    return  Client.model.find()
      .where('client_id', clientId).limit(1).exec(callback);
  }
  //OAuthClientsModel.findOne({ client_id: clientId, client_secret: clientSecret }, callback);
  return  Client.model.find()
      .where('client_id', clientId).where('client_secret', clientSecret).limit(1).exec(callback);
}; 
// This will very much depend on your setup, I wouldn't advise doing anything exactly like this but
// it gives an example of how to use the method to resrict certain grant types
var authorizedClientIds = ['abc123', 'toto'];
model.grantTypeAllowed = function (clientId, grantType, callback) {
  console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');
console.log("authorizedClientIds is hard coded, please change ******************");
  if (grantType === 'password') {
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
  }

  callback(false, true);
};

model.saveAccessToken = function (token, clientId, expires, userId, callback) {
  console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');

  var accessToken = new OAuthAccessTokensModel({
    accessToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  accessToken.save(callback);
};



/*
 * Required to support password grant type
 */
model.getUser = function (username, password, callback) {
  console.log('in getUser (username: ' + username + ', password: ' + password + ')');
  //OAuthUsersModel.findOne({ username: username }, function(err, user) {
  keystone.mongoose.model('User').findOne({ email: username }, function(err, user) {
    //.where('email',username )
    //.where('password', password)
    //.exec(function(err, user) {

    if(err) return callback(err);
    // test a matching password
    if (user) {

      // callback(null, user._id);
console.log("password is --------" + password);      
      user._.password.compare(password, function(err, isMatch){
          if (err) throw err;
          if (isMatch){
            callback(null, user._id);
          } else {
            callback(false);
          }
      });
      /*user.comparePassword(password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch){
            callback(null, user._id);
          } else {
            callback(false);
          }
      }); */
    } else {

      callback(false);
    }

  });
};

/*
 * Required to support refreshToken grant type
 */
model.saveRefreshToken = function (token, clientId, expires, userId, callback) {
  console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId +', userId: ' + userId + ', expires: ' + expires + ')');

  var refreshToken = new OAuthRefreshTokensModel({
    refreshToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  refreshToken.save(callback);
};

model.getRefreshToken = function (refreshToken, callback) {
  console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

  OAuthRefreshTokensModel.findOne({ refreshToken: refreshToken }, callback);
};

/**
 * Client Model
 * ==========
 */

var Client = new keystone.List('Client');

Client.add({
    client_id: { type: String, required: true, index: true, default: "1234" },
    client_secret: { type: String, initial: true, required: true, default: "secret" },
  redirectUri: { type: String, initial: true }
}, 'Permissions', {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});




/**
 * Relationships
 */

// User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Client.defaultColumns = 'client_id, client_secret, redirectUri';
Client.register();