'use strict'
//const sendemail = require('./sendemail.js');
const foodorderModel = require('../models/foodorders');	
var username = "shanm181191@gmail.com";				
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');



module.exports = {




	getById: function(req, res, next) {
		console.log(req.body);
		foodorderModel.findById(req.params.foodorderId, function(err, foodorderInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Foodord found!!!", data:{foodorders: foodorderInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let foodordersList = [];

		foodorderModel.find({}, function(err, foodorders){
			if (err){
				next(err);
			} else{
				for (let foodorder of foodorders) {
					foodordersList.push({order_id: foodorder.order_id, name: foodorder.name, quantity: foodorder.quantity,price: foodorder.price});
				}
				res.json({status:"success", message: "Foodorders list found!!!", data:{foodorders: foodordersList}});
							
			}

		});
	},

	updateById: function(req, res, next) {
		foodorderModel.findByIdAndUpdate(req.params.foodorderId,{name:req.body.name}, function(err, foodorderInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Foodorder updated successfully!!!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		foodorderModel.findByIdAndRemove(req.params.foodorderId, function(err, foodorderInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Foodorder deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		foodorderModel.create({ name: req.body.name, quantity: req.body.quantity,price: req.body.price }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Foodorder added successfully!!!", data: null});
				  
				});
	},

}					