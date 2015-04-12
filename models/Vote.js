var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Vote = new keystone.List('Vote', {
    autokey: { path: 'slug', from: 'topic', unique: true },
    map: { name: 'topic' },
    defaultSort: '-createdAt'  
});
 
Vote.add({
    topic: { type: Types.Relationship, ref: 'Topic', many: false, index: true, initial:true  },
    feeling: { type: Types.Relationship, ref: 'Feeling', many: false , index: true, initial:true},
    appuser: { type: Types.Relationship, ref: 'Appuser', many: false, index: true, initial:true },
    createdAt: { type: Date, default: Date.now },
    
});
 
Vote.defaultColumns = 'id, topic, feeling, appuser, createdAt|15%'
Vote.register();