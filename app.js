var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var busboy = require('connect-busboy');
var parse = require('csv-parse');
var fs = require('fs-extra');
var os = require('os');
var http = require('http');

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
// app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());
var app = express();
app.use(busboy({ immediate: true }));

// app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	console.log('hi');
    res.sendFile('public/index.html');
});

app.post('/dropFile', function(req, res) {
	//console.log(req);
	// req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
 //      console.log('hi');
 //    });
    res.redirect('index.html');
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});
