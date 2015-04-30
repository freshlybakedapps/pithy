var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Reaction = new keystone.List('Reaction', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt' 
});
 
Reaction.add({
    title: { type: String, required: true },
    status: { type: Types.Select, initial: true, required: true, options: 'Approved, Pending, Denied', default: 'Approved' },
    createdBy: { type: Types.Relationship, ref: 'User', hidden: false },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    
});

Reaction.schema.pre('save', function(next) {
	if (!this.createdBy) {
        this.createdBy = this._req_user;
    }    
    next();
});
 
Reaction.defaultColumns = 'title, status, createdBy, publishedAt|15%'
Reaction.register();