
const vendorModel = require('../models/vendors');					

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		vendorModel.findById(req.params.vendorId, function(err, vendorInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Foodorder found!!!", data:{vendors: vendorInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let vendorsList = [];

		vendorModel.find({}, function(err, vendors){
			if (err){
				next(err);
			} else{
				for (let vendor of vendors) {
					vendorsList.push({id: vendor.vendor_id, 
					
					name: vendor.name, gst: vendor.gst,Validity: vendor.validity , 
		mobile:vendor.mobile,email:vendor.email,
		locality:vendor.locality,city:vendor.city,
		data:vendor.data,contenttype:vendor.contenttype});
				}
				res.json({status:"success", message: "Foodorders list found!!!", data:{vendors: vendorsList}});
							
			}

		});
	},

	updateById: function(req, res, next) {
		vendorModel.findByIdAndUpdate(req.params.vendorId,{name: req.body.name, gst: req.body.gst,Validity: req.body.validity , 
		mobile:req.body.mobile,email:req.body.email,
		locality:req.body.locality,city:req.body.city,
		data:req.body.data,contenttype:req.body.contenttype}, function(err, vendorInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Foodorder updated successfully!!!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		vendorModel.findByIdAndRemove(req.params.vendorId, function(err, vendorInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Foodorder deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		console.log("coming");
		vendorModel.create({ name: req.body.name, gst: req.body.gst,Validity: req.body.validity , 
		mobile:req.body.mobile,email:req.body.email,
		locality:req.body.locality,city:req.body.city,
		data:req.body.data,contenttype:req.body.contenttype}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Foodorder added successfully!!!", data: null});
				  
				});
	},

}					