var express = require('express');
var nodemailer = require('nodemailer');
var app = express();
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://duckybomb.firebaseio.com/");

// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
  }
}

// Register the callback to be fired every time auth state changes
myFirebaseRef.onAuth(authDataCallback);

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
    var photos = 1;
    var mailOptions = {
        from: 'Jenny',
        to: req.query.to,
        subject: "Funny cat mail",
        text: req.query.text,
        html: '<a href="http://thecatapi.com"><img src="http://thecatapi.com/api/images/get?format=src&type=gif"></a>'
    }

    console.log(mailOptions);
    //console.log("adding to firebase");
    //myFirebaseRef.set({
    //    title: "Hello World!",
    //    author: "Firebase",
    //    location: {
    //        city: "San Francisco",
    //        state: "California",
    //        zip: 94103
    //    }
    //});

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
