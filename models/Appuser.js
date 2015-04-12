var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var Appuser = new keystone.List('Appuser', {
    autokey: { path: 'slug', from: 'phone', unique: true },
    map: { name: 'phone' },
    defaultSort: '-createdAt'
});

Appuser.add({
	phone: { type: String, initial: true, required: true, index: true },
	userid: { type: String, initial: true, required: true, index: true },
	gender: { type: Types.Select, initial: true, required: true, options: 'Male, Female' }
});




/**
 * Registration
 */

Appuser.defaultColumns = 'phone, userid, gender';
Appuser.register();
