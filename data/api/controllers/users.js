const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');

		

module.exports = {
	create: function(req, res, next) {
	
	userModel.findOne({ email: req.body.email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
		 userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password
		 ,mobile: req.body.mobile
			,gender: req.body.gender,	address:req.body.address,
				city: req.body.city			}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "User added successfully!!!", data: null});
				  
				});
				
			console.log("added user");
	
	 }
	 else if(user)
	 {
		res.json({message: "User already exists!!"});
	 
	 }
	 
	  });
	},

	authenticate: function(req, res, next) {
		userModel.findOne({email:req.body.email}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

						 res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});	

						}else{

							res.json({status:"error", message: "Invalid email/password!!!", data:null});

						}
					}
				});
	},

}					
