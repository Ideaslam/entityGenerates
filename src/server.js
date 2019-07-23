const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
var path = require('path');


var generation = require('./generation/generation');
 
 

const app = express();
 

const APP_PORT =3000 ;
app.listen(APP_PORT, () => {
    console.log("CONNECTED TO SERVER ON PORT 3000");
});
app.use(bodyParser.json({ limit:'50mb' })); 
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb',parameterLimit:50000 }));
app.use(cors());
app.options('*', cors());


app.use(express.static(path.join(__dirname,'../client')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  
app.post('/entity',async (req,res)=> {


    // var properties = [{name : 'orderNo', type : 'string'} ,{name : 'orderOwnerName', type : 'string'} , {name : 'code', type : 'int'}] ;

    
    // res.send('reached');
    var params = req.body; 

     

    var properties = params.properties; 
    config.projectPath= params.projectUrl == '' || undefined ? config.projectPath : params.projectUrl ;
    config.projectName= params.projectName == '' || undefined ? config.projectName : params.projectName ;
    config.domainProjectName= params.serviceName == '' || undefined ? config.domainProjectName : params.serviceName ;
    config.serviceProjectName= params.domainName == '' || undefined ? config.serviceProjectName : params.domainName ;

    generation.generateClasses(config.projectPath,params.entityName,properties );
     
    res.send({ status :true ,msg: "Generated Successfully"});

});



