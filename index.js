'use strict';


// var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');


// var speech_to_text = new SpeechToTextV1({
//   username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
//   password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
// });

var watson = require('watson-developer-cloud');
var express = require('express');
var app = express();

var ssttoken;


var sstusername = "11b79bad-6256-40b5-87b6-f6dc26be9a4d";
var sstpassword = "NsH8ioXMxLbU";

var authorization = new watson.AuthorizationV1({
  username: sstusername,
  password: sstpassword,
  url: watson.SpeechToTextV1.URL
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**auth token method*/
app.get('/ssttoken', function(req, res){
	if(!ssttoken) {
		authorization.getToken(function (err, token) {
	  		if (!token) {
	    		console.log('error:', err);
	  		} else {
	  			// console.log('sst token is: ' + ssttoken);
				res.send(token);
	    		ssttoken = token;
	  		}
		});
	} else {
		console.log('it was already created!!');
		res.send(ssttoken);
	}

});

app.use(express.static('public'));
app.listen(3000);
console.log('server is listening on 3000');