var bank = require('../models/bank');
var load = require('../loaddata');
var path = require('path');
var DateTime = require('datetime-converter-nodejs');

module.exports = function(router) {

	router.get('/loaddata', function(req, res){
		var csvHeaders = {
		    BANKS: {
		        headers: ['ifsc', 'bank_id', 'branch', 'address', 'city', 'district', 'state', 'bank_name']
		    }
		}
		//var csvFile = path.normalize(__dirname + '/../bank.csv');
	  	load.importFile("https://github.com/snarayanank2/indian_banks/blob/master/bank_branches.csv", csvHeaders.BANKS.headers, 'bankSchema');
	  	return res.json({ success : true, message : 'Bank data loaded into the database' });
	});

	router.get('/searchByIFSC/:IFSC', function(req, res){
		var IFSC = req.params.IFSC;
		bank.findOne({ ifsc : { $regex : new RegExp(IFSC, "i") } }, { _id : 0 } , function(err, banks){
			if(err) {
				return res.json({ success : false, message : err.message});
			}
			else if(!banks){
				return res.json({ success : false, message : 'No bank with given IFSC number' });
			}
			else{
				return res.json({ success: true, bank : banks });
			}
		});
	});

	router.get('/searchBankByCity/:city/:bank', function(req, res){
		var city = req.params.city;
		bank.find({ city : { $regex : new RegExp(city, "i") } , bank_name : req.params.bank },{ _id : 0 } , function(err, banks){
			if(err) {
				return res.json({ success : false, message : err.message});
			}
			else if(!banks){
				return res.json({ success : false, message : 'No banks with given name in given city' });
			}
			else{
				return res.json({ success: true, bank : banks });
			}
		});
	});

	return router;
}