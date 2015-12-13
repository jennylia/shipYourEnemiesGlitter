var express = require('express');
var nodemailer = require('nodemailer');
var app = express();
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://duckybomb.firebaseio.com/");

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

app.get('/contacts', function(req,res){
    res.sendfile('contacts.html');
});


app.get('/', function(req, res)
{
    res.sendfile('index.html');
});

app.get('/css/style.css', function(req, res){
    res.sendfile('css/style.css');
});

app.get('/send', function(req, res)
{
    console.log("sending email");
    console.log(req.query);
    console.log("req query end");
    // do the var for html here
    var photos = req.query.num;

    //generate the email body
    var body = '<h1>' + req.query.text + '</h1>';
    for (var i = 0; i < photos; i ++){
        body += '<a href="http://thecatapi.com"><img src="http://thecatapi.com/api/images/get?format=src&type=gif"></a><br/>';
    }
    var mailOptions = {
        from: 'Jenny',
        to: req.query.to,
        subject: "Funny cat mail",
        text: req.query.text,
        html: body
    }

    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(err, res)
    {
        if (err)
        {
            console.log(err);
        }
        console.log(res);

    });
});

app.listen(3000, function()
{
    console.log(3000);
});
