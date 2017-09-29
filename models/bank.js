var mongoose = require('mongoose');
var schema = mongoose.Schema;

//ifsc	bank_id	branch	address	city	district	state	bank_name

var bankSchema = new schema({
	ifsc : { type : String },
	bank_id : { type : Number },
	branch : { type : String },
	address : { type : String },
	city :{ type : String },
	district : { type : String },
	state : { type : String },
	bank_name : { type : String }
});

module.exports = mongoose.model('bank', bankSchema); 