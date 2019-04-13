const adminModel = require('../models/admins');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');

		

module.exports = {
	create: function(req, res, next) {
	
	adminModel.findOne({ email: req.body.email })
    .exec(function (err, admin) {
      if (err) {
        return callback(err)
      } else if (!admin) {
		 adminModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Admin added successfully!!!", data: null});
				  
				});
				
			console.log("added admin");
	
	 }
	 else if(admin)
	 {
		res.json({message: "Admin already exists!!"});
	 
	 }
	 
	  });
	},

	authenticate: function(req, res, next) {
		adminModel.findOne({email:req.body.email}, function(err, adminInfo){
					if (err) {
						next(err);
					} else {

						if(adminInfo != null && bcrypt.compareSync(req.body.password, adminInfo.password)) {

						 //const token = jwt.sign({id: adminInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

						 res.json({status:"success", message: "admin found!!!"});//, data:{admin: adminInfo, token:token}	

						}else{

							res.json({status:"error", message: "Invalid email/password!!!", data:null});

						}
					}
				});
	},

}					
