var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Topic = new keystone.List('Topic', {
    autokey: { path: 'slug', from: 'title', unique: true },    
    map: { name: 'title' },
    defaultSort: '-createdAt'
});
 
Topic.add({
    title: { type: String, required: true },
    context: { type: String, required: true, default: "What is this topic about?" },
    //createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    status: { type: Types.Select, initial: true, required: true, options: 'Approved, Pending, Denied', default: 'Approved' },
    author: { type: Types.Relationship, ref: 'Appuser', many: false, index: true, initial:false },
    createdBy: { type: Types.Relationship, ref: 'User', hidden: false },
    
});

//curl --include -X POST -H "Content-Type: application/json" -d '{"author":"552823bd4de501874bc61d62","title":"xxx","context":"context","status":"Pending"}' http://localhost:3000/api/topic/create?apiKey=Nelson12345


Topic.schema.pre('save', function(next) {

	/*
		{ _id: 550df5d4d42c5c2a79d142b3,
	  isAdmin: true,
	  password: '$2a$10$WHtAGSZrdJpfFhyX2lc8iuq31O5.bA4/w2jNGH8G.0FL6yOWFQ8je',
	  email: 'jtubert@gmail.com',
	  __v: 0,
	  name: { last: 'Tubert', first: 'John' } }
  	*/
    
    
    if (!this.createdBy) {
        this.createdBy = this._req_user;
        this.defaultColumns = 'title, context, status, createdBy|15%'
    }

    
    

    

    //console.log("xxxxxxxxx "+keystone.nativeApp);


    
    next();
});
 
Topic.defaultColumns = 'title, context, status, author|15%'
Topic.register();