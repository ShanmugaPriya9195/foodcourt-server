const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AutoIncrement_vendor = require('mongoose-sequence')(mongoose);
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
	vendor_id :Number,
	name: {
		type: String,
		trim: true,		
		required: true,
	},
	
	mobile:{
		type: Number,
		trim: true,
		required: true
	},
	password:{
		type: String,
		trim: true,		
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	gst:{
		type: String,
		trim: true,
		required: true
	} ,	
	Validity: {
		type: String,
		trim: true,
		required: true
	},
	
	locality:{
		type: String,
		trim: true,
		required: true
	},
	city: {
		type: String,
		trim: true,
		required: true
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
	
	
},{_id:false});
VendorSchema.plugin(AutoIncrement_vendor,{inc_field: 'vendor_id'});

VendorSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});

module.exports = mongoose.model('Vendor', VendorSchema);