const path = require('path');
const fs = require('fs');
const fileM = require('./fileManager');
const config = require("../config");
 
var generation= {} ;
var className='' ;
var properties=[] ;
var projectPath='';
var projectName =config.projectName ;
var domainProjectName =config.domainProjectName;
var serviceProjectName =config.serviceProjectName ;
var entityBuilder=config.entityBuilder;
 

var getDependenciesString =(depandencies)=>{
    let depandenciesString = '' ; 
    depandencies.forEach(depends => {
        depandenciesString += `using  ${depends}  ; \n`; 
    });
   return  depandenciesString ;
}


var getPropertiesString =(properties) =>{

        let propertiesString = '' ; 
        properties.forEach(property=>{
            propertiesString+=` public ${property.type} ${property.name}  {get;set;} \n \t \t`   ;
        });
        return propertiesString ;


}

var getMappingPropertiesString = (properties)=>{
    let propertiesString = entityBuilder+'HasKey(t => t.Id);\n \t \t \t';
    propertiesString+=entityBuilder+'Property(t => t.Id);\n \t \t \t'
    properties.forEach(property=>{
        if(property.name !=='Id'){
            propertiesString +=  entityBuilder+`Property(t => t.${property.name}); \n \t \t \t`;
        }
    });
    return propertiesString;
}


var generate=(name , template , replacement ,filepath)=>{
   
    let templateFile = fileM.readFile(path.join(__dirname,'./files/',`${template}.cs`)) ;
    let finalFile =templateFile ; 
    for (var header in replacement) {
        finalFile= replace(finalFile , `{${header}}`  , replacement[header]) ; 
    }
    
    
            let filename = path.join(filepath, `${name}.cs`);
            fileM.writeFile(filename,finalFile) ;
            //  fs.writeFileSync(filename,finalFile);
            console.log(filename) ;
             
       
        
      }
    
 
 


var replace=(templateFile , from , to  )=>{
  
   var content = new RegExp(from, 'g');
   return templateFile.replace(content,to);
}
generation.generateClasses = function (projectPathUrl ,classname , propertylist ) {

    
    className=classname;
    properties=propertylist;
    projectPath =projectPathUrl;
    classes = initClassesArray() ;
    //console.log(classes);
      classes.forEach(c => {
         generate(c.fileName ,c.template ,c.replacement ,c.filePath);
     });

  
    
     
 }


var getLowerCase =(name)=>{
        return name.toLowerCase();
}

 
 initClassesArray =()=> {
    const classes =[
        {
            className:`${className}` ,
            template :'entity' ,
            fileName:`${className}`,
            replacement:{
                className:className,
                variableClassName:getLowerCase(className),
                inherit:'BaseEntity',
                namespace:`${domainProjectName}.Entity`,
                dependencies :getDependenciesString([])  ,              
                properties:getPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${domainProjectName}/Entity`,
        }
        ,
        {
            className:`${className}` ,
            template :'map' ,
            fileName:`${className}Map`,
            replacement:{
                className:className,
                variableClassName:getLowerCase(className),
                namespace:`${domainProjectName}.Entity`,
                dependencies :getDependenciesString(['Microsoft.EntityFrameworkCore.Metadata.Builders'])  ,              
                properties:getMappingPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${domainProjectName}/Mapping`,
        }

        ,
         
        {
            className:`${className}` , 
            template :'service' ,
            fileName:`${className}Service`,
            replacement:{
                className:className,
                variableClassName:getLowerCase(className),
                namespace:`${serviceProjectName}.${className}Service`,
                dependencies :getDependenciesString(
                    [`${domainProjectName}.Entity`,
                     `Repository`
                ]
                    )  ,              
                properties:getMappingPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${serviceProjectName}/${className}Service`,
        }
        ,  
        {
            className:`${className}` ,
            template :'IService' ,
            fileName:`I${className}Service`,
            replacement:{
                className:className,
                variableClassName:getLowerCase(className),
                namespace:`${serviceProjectName}.${className}Service`,
                dependencies :getDependenciesString(
                    [`${domainProjectName}.Entity`
                ])  ,              
                properties:getMappingPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${serviceProjectName}/${className}Service`,
        },
         
        {
            className:`${className}` , 
            template :'controller' ,
            fileName:`${className}Controller`,
            replacement:{
                className:className,
                serviceProjectName:serviceProjectName ,
                variableClassName:getLowerCase(className),
                namespace:`${projectName}.Controllers`,
                dependencies :getDependenciesString(
                    [`System.Linq`,
                     `System.Threading.Tasks`,
                     `${domainProjectName}.Entity`,
                     `Microsoft.AspNetCore.Http` ,
                     `Microsoft.AspNetCore.Mvc`
                ])  ,              
                properties:getMappingPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${projectName}/Controllers`,
        }
        
        
        
        ]

        return classes; 
 }





 module.exports = generation ;