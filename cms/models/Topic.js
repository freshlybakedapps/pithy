var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Topic = new keystone.List('Topic', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});
 
Topic.add({
    title: { type: String, required: true },
    
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    
});
 
Topic.defaultColumns = 'title, publishedAt|15%'
Topic.register();