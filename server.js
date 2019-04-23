var express = require('express'),
path = require('path'),
nodeMailer = require('nodemailer'),smtpTransport = require('nodemailer-smtp-transport'),
bodyParser = require('body-parser');

var logger = require('morgan');
var foodorders = require('./routes/foodorders') ;
var users = require('./routes/users');
var vendors = require('./routes/vendors');
var admins = require('./routes/admins');

var mongoose = require('./model/foodcourt'); //appbase configuration
var jwt = require('jsonwebtoken');
var app = express();

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
app.use('/foodorders',foodorders);


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





   
    app.set('view engine', 'jade');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    app.get('/email', function (req, res) {
let transporter = nodeMailer.createTransport(smtpTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'shanmu9195@gmail.com',
              pass: 'Sarash9195@@@'
          },tls:{rejectUnauthorized:false}
      }));
      let mailOptions = {
          from: '"Artisans Web" <shanmu9195@gmail.com>', // sender address
          to: 'shanmu9195@gmail.com', // list of receivers
          subject: 'shanmu9195@gmail.com', // Subject line
          text: 'shanmu9195@gmail.com', // plain text body
          html: '<b>NodeJS Email Tutorial</b>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.json('success');
          });     
 
    });
    
    
const cors = require("cors");
const ejs = require("ejs");

require("dotenv").config();



const {initPayment, responsePayment} = require("./paytm/services/index");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

app.get("/pay-withpaytm", (req, res) => {
    initPayment(req.query.amount).then(
        success => {
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
        },
        error => {
            res.send(error);
        }
    );
});

app.post("/paywithpaytmresponse", (req, res) => {
    responsePayment(req.body).then(
        success => {
            res.render("response.ejs", {resultData: "true", responseData: success});
        },
        error => {
            res.send(error);
        }
    );
});



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
