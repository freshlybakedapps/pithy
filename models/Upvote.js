var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Upvote = new keystone.List('Upvote', {
    autokey: { path: 'slug', from: 'topic', unique: true },
    map: { name: 'topic' },
    defaultSort: '-createdAt'  
});
 
Upvote.add({
    topic: { type: Types.Relationship, ref: 'Topic', many: false, index: true, initial:true  },    
    user: { type: Types.Relationship, ref: 'User', many: false, index: true, initial:true },    
    createdAt: { type: Date, default: Date.now, many: true },
    
});
 
Upvote.defaultColumns = 'id, topic, user, createdAt|15%'
Upvote.register();