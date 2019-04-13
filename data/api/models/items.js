const mongoose = require('mongoose');


//Define a schema
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	item_id:{
		type: Number,
		trim: true,		
		required: true,
	},
	
	itemname: {
		type: String,
		trim: true,		
		required: true,
	},
	availability: {
		type: Number,
		required: true,
	},
	price:{
		type: Number,
		required: true,
	},
	data:{
		type: Number,
		trim: true,
		required: true
	},
	contenttype: {
		type: String,
		trim: true,
		required: true
},
});

module.exports = mongoose.model('Item', ItemSchema)