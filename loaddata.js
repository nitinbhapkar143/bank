var mongoose = require('mongoose');
var csv = require('fast-csv');
var bank = require('./models/bank');

module.exports.importFile = function(filePath, fileHeaders, modelName) {
    csv
        .fromPath(filePath, {headers: fileHeaders})
        .on('data', function(data) {
            var newBank = new bank();
            newBank.ifsc  = data.ifsc
            newBank.bank_id = data.bank_id 
            newBank.branch = data.branch  
            newBank.address =  data.address 
            newBank.city    = data.city 
            newBank.district = data.distric    
            newBank.state   = data.state 
            newBank.bank_name =  data.bank_name
            newBank.save(function (err) {
                if (err)
                    console.log(err);
            });
        })

        .on('end', function() {
            console.log("done");
        });
}