const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const FoodorderSchema = new Schema({
	name: {
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
	}
});

module.exports = mongoose.model('Foodorder', FoodorderSchema)