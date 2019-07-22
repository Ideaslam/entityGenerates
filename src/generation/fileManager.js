 

var writeFile = require('write');
var read = require('read-file');

var files ={} ;
 

files.writeFile =  (fileUrl  , content  )=> { 
       
        
        writeFile(fileUrl, content, function(err ) {
            if (err) 
            console.log(err) 
            else  console.log("Saved");

          });
    }

files.readFile =  (fileUrl )=> {
        var buffer = read.sync(fileUrl);
        return buffer.toString() ; 
    }

  
 
 module.exports = files;