const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AutoIncrement_admin = require('mongoose-sequence')(mongoose);
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
	id: Number,
	name: {
		type: String,
		trim: true,		
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	}
},{_id:false});

AdminSchema.plugin(AutoIncrement_admin, {'id': 'admin_id_counter'});

AdminSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});

module.exports = mongoose.model('Admin', AdminSchema);