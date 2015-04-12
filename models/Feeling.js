var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Feeling = new keystone.List('Feeling', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt' 
});
 
Feeling.add({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    
});
 
Feeling.defaultColumns = 'title, publishedAt|15%'
Feeling.register();