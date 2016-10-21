var express = require('express');
var app = express();
var expressHandlebars  = require('express-handlebars');
var request = require('request');

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/calculate', function(req, res) {
	var url = "https://bmi.p.mashape.com/";
	request({
	    headers: {
	      'X-Mashape-Key': 'uk8fe4AMzImshwEBzscxUWeMvf6tp10iRh3jsnapLBOAwOZePZ',
	      'Accept' : 'application/json',
	      'Content-Type' : 'application/json',
	    },
	    url: url,
	    method: 'POST',
	    form: JSON.stringify(req.query)
	}, function (err, apiRes, body) {
	    if(err){
	    	res.status(201).json({ success : false, message : 'Something went wrong!! Please try again later!!' });
	    }
		try {
		    response_body = JSON.parse(apiRes.body);
		    console.log(response_body);
		    if(response_body["error"] !== undefined){
		    	res.status(201).json({ success : false, message : 'Something went wrong!! Please try again later!!' });	
		    } else {
				res.status(200).json({ success : true, result : response_body});	
		    }
		    
		}
		catch (e) {
		    res.status(201).json({ success : false, message : 'Something went wrong!! Please try again later!!' });
		}


	    
	});
});

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.listen(process.env.PORT || 5008, function () {
	console.log("Listening on port 5008...");
});