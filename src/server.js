const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");

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
app.get('/entity',async (req,res)=> {


    var properties = [{name : 'orderNo', type : 'string'} ,{name : 'orderOwnerName', type : 'string'} , {name : 'code', type : 'int'}] ;

    generation.generateClasses(config.projectPath,'Orders',properties );
    res.send('reached');

});



