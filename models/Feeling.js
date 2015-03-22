var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Feeling = new keystone.List('Feeling', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});
 
Feeling.add({
    title: { type: String, required: true },
    count: {type: Number, required: true, default: 0},
    femaleCount: {type: Number, default: 0},
    maleCount: {type: Number, default: 0},
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    
});
 
Feeling.defaultColumns = 'title, count, femaleCount, maleCount, publishedAt|15%'
Feeling.register();