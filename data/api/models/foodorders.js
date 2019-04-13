const mongoose = require('mongoose');
const Item = require('./items');
const User = require('./users');
const AutoIncrement_foodorder = require('mongoose-sequence')(mongoose);

//Define a schema
const Schema = mongoose.Schema;

const FoodorderSchema = new Schema({
	order_id:{
		type: Number,
		trim: true,		
		required: true,
	},
	
	order_by: {
		type: Number,
		trim: true,		
		required: true,
	},
	Total_price:{
		type: Number,
		trim: true,		
		required: true,
	},
	Total_quantity:{
		type: Number,
		trim: true,		
		required: true,
	},
	
	/*item_id: {
		type: Number,
		trim: true,		
		required: true,
	},
	itemname: {
		type: String,
		trim: true,		
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price:{
		type: Number,
		required: true,
	}*/
	order_by:{
		type: Schema.Types.ObjectId, ref: 'User' 
	},
	orderdetails:[{ type: Schema.Types.ObjectId, ref: 'Item' },
		{quantity:{type:Number}},
			{price:{type:Number}}]
},{_id:false});
FoodorderSchema.plugin(AutoIncrement_foodorder, {inc_field: 'order_id'});




module.exports = mongoose.model('Foodorder', FoodorderSchema)