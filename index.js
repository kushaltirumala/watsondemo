'use strict';
var auth = require('./admin')
var watson = require('watson-developer-cloud');
var express = require('express');
var app = express();

var ssttoken;
var ttstoken;

/**auth token generations*/
var sstusername = auth.sstusername;
var sstpassword = auth.sstpassword;
var ttsusername = auth.ttsusername;
var ttspassword = auth.ttspassword;

var language_translator = new watson.LanguageTranslatorV2({
  username: '51a3cbe3-c9eb-48ed-9305-583309808167',
  password: '13iBjrLHGm3Z',
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});



var authorization = new watson.AuthorizationV1({
  username: sstusername,
  password: sstpassword,
  url: watson.SpeechToTextV1.URL
});

var authorization2 = new watson.AuthorizationV1({
  username: ttsusername,
  password: ttspassword,
  url: watson.TextToSpeechV1.URL
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


app.get('/ttstoken', function(req, res){
	if(!ttstoken) {
		authorization2.getToken(function (err, token) {
	  		if (!token) {
	    		console.log('error:', err);
	  		} else {
	  			// console.log('sst token is: ' + ssttoken);
				res.send(token);
	    		ttstoken = token;
	  		}
		});
	} else {
		console.log('it was already created!!');
		res.send(ttstoken);
	}

});


app.get('/translate', function(req, res){ 
	var requesttext = req.query.text;
	language_translator.translate({
  		text: requesttext, source : 'en', target: 'es' },
  			function (err, translation) {
		    if (err) {
		      console.log('error:', err);
		    } else {
		    	var translated = translation.translations[0].translation;
		      	console.log("the translated version is " + translated);
		      	res.send(translated);
		    }
});
	
});

app.use(express.static('public'));
app.listen(3000);
console.log('server is listening on 3000');