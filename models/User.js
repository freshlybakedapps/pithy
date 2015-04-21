var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

//body.json is a file that contains the json code
//curl --include -X POST -H "Content-Type: application/json" -d @body.json http://localhost:3000/api/user/create?apiKey=Nelson12345


//curl --include -X POST -H "Content-Type: application/json" -d '{"username":"jtubert@hotmail.com","password":"password"}' http://localhost:3000/api/user/signin?apiKey=Nelson12345

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, displayGravatar: true, initial: true, required: true, index: true },
	//phone: { type: Types.Number, initial: true, required: true, index: true },
	gender: { type: Types.Select, initial: true, required: true, options: 'Male, Female' },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
