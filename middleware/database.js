var mongoose = require('mongoose');

var uristring = 'mongodb://demouser:123abc@ds161446.mlab.com:61446/sandeep_kuri_website';

mongoose.connect(uristring, function(err, res){
    
    if(err){
        console.log('ERROR connecting to:' + uristring + '--' + err);
        
    }
    else{
        console.log('Succesfully connected to:' + uristring );
    }
});

module.export=mongoose;
