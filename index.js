var express = require('express');
var nodemailer = require('nodemailer');
var app=express();
/*var smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	    auth: {
		    user: "happy123demo@gmail.com",
   		 	}
});
*/

var smtpTransport = nodemailer.createTransport({
	host: "mailtrap.io",
    	port: 2525,
    	auth: {
		user: "52885226139a9f766",
    		pass: "3f12b8b855a0a6"
	}
});

app.get('/', function(req,res){
	res.sendfile('index.html');
});

app.get('/send', function(req,res){
	console.log("sending email");
	console.log(req.query);
	console.log("req query end");
	var mailOptions= {
		from: 'Jenny',
		to: req.query.to,
		subject: req.query.subject,
		text: req.query.text,
		html:'<b>Hello World</b>'
	}

	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(err, res){
		if(err){
			console.log(err);
		}else{
			console.log(res);
		}
	});
});

app.listen(3000, function(){
	console.log(3000);
});
