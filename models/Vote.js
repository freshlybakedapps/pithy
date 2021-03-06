var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Vote = new keystone.List('Vote', {
    autokey: { path: 'slug', from: 'topic', unique: true },
    map: { name: 'topic' },
    defaultSort: '-createdAt'  
});
 
Vote.add({
    topic: { type: Types.Relationship, ref: 'Topic', many: false, index: true, initial:true  },
    reaction: { type: Types.Relationship, ref: 'Reaction', many: false , index: true, initial:true},
    user: { type: Types.Relationship, ref: 'User', many: false, index: true, initial:true },
    intensity: { type: Number, default: 0, many: true },
    createdAt: { type: Date, default: Date.now, many: true },
    
});
 
Vote.defaultColumns = 'id, topic, reaction, user, createdAt|15%'
Vote.register();