const express = require('express');
const logger = require('morgan');
const foodorders = require('./routes/foodorders') ;
const users = require('./routes/users');
const vendors = require('./routes/vendors');
const admins = require('./routes/admins');
const bodyParser = require('body-parser');
const mongoose = require('./model/foodcourt'); //appbase configuration
var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'Foodcourt'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
res.json({"started":"App Started"});
});

// public route
app.use('/users', users);
app.use('/admins',admins);
app.use('/vendors',vendors);

// private route
app.use('/foodorders', validateUser,foodorders);


app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, app:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}


// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something looks wrong :( !!!"});

});

app.listen(3000, function(){
	console.log('Node server listening on port 3000');
});
