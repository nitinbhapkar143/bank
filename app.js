var express = require('express');
var morgan  = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var bankRoute = require('./routes/bank')(router);
var app = express();
var port = process.env.port || 3000;
var database = process.env.PROD_MONGODB;
console.log(database);

mongoose.Promise = global.Promise;
mongoose.connect(database , { useMongoClient: true }, function(err){
	if(err){
		console.log('Error : ', err.message);
	}
	else{
		console.log('Connected to database');
	}
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/bank', bankRoute);

app.listen(port, function (err) {
	if(err) throw err;
	console.log('Listening on http://locahost:' + port);
});


