var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
// app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	console.log('hi');
    res.sendFile('public/index.html');
});

app.post('/myaction', function(req, res) {
  
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});
