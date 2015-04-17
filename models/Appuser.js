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
	name: { type: Types.Name, required: true, index: true, initial: true },
	phone: { type: String, initial: true, required: true, index: true },
	userid: { type: String, initial: true, required: true, index: true },
	gender: { type: Types.Select, initial: true, required: true, options: 'Male, Female' },
	topic: { type: Types.Relationship, ref: 'Topic', many: true, index: true, initial:true  },   
	dob: { type: Date, required: false  }
});




/**
 * Registration
 */

Appuser.defaultColumns = 'name, phone, userid, topic, gender';
Appuser.register();
