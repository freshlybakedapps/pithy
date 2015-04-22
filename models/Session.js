var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Session = new keystone.List('Session', {
    autokey: { path: 'slug', from: 'sessionId', unique: true },
    map: { name: 'sessionId' },
    defaultSort: '-createdAt' 
});
 
Session.add({
    sessionId:{type: String},
    userId:{type: String},
    createdAt: { type: Date, default: Date.now }   
});
 
Session.defaultColumns = 'title, status, author, publishedAt|15%'
Session.register();