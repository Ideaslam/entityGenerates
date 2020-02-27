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
var repositoryProjectName =config.repositoryProjectName;
var appStartUpName =config.appStartUpName ;
var appContextName=config.appContextName;
var IUnitFileName =config.IUnitFileName;
var UnitFileName=config.UnitFileName;
 

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
            propertiesString+=` public ${property.type} ${property.name}  {get;set;} \n \t `   ;
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

var getMappingString = (properties,type)=>{
    propertiesString ="";
    properties.forEach(property=>{
        if(type == 'entity'){
            propertiesString += `${property.name}  =  ${getLowerCase(className)}.${property.name}, \n \t \t \t`;
        }else{
            propertiesString += `${property.name}  = ${getLowerCase(className)}Dto.${property.name}  , \n \t \t \t`;
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
    
 
 
var appendContext=(context)=>{
    let templateFile = fileM.readFile( `${projectPath}/${repositoryProjectName}/`+`${appContextName}.cs`) ;
    var finalFile =templateFile ;
    finalFile=   replace(finalFile , `//lastContext`  ,  context+" //lastContext" ) ; 
    let filename =  `${projectPath}/${repositoryProjectName}/`+`${appContextName}.cs` ;
    fileM.writeFile(filename,finalFile) ;
    console.log(filename);

};
var appendInjection=(injection ,injectionUsing)=>{
    let templateFile = fileM.readFile( `${projectPath}/${projectName}/`+`${appStartUpName}.cs`) ;
    var finalFile =templateFile ;
    finalFile=   replace(finalFile , `//lastInjection`  ,  injection+" //lastInjection" ) ; 
 
   // finalFile=   replace(finalFile , `//lastUsing`  ,  injectionUsing+" //lastUsing" ) ; 
   
    let filename =  `${projectPath}/${projectName}/`+`${appStartUpName}.cs` ;
    fileM.writeFile(filename,finalFile) ;
    console.log(filename);
};

var appendInterfaceUnit=(IUnit  )=>{
    let path =`${projectPath}/${repositoryProjectName}/`+`${IUnitFileName}.cs` ;
    let templateFile = fileM.readFile( path) ;
    var finalFile =templateFile ;
    finalFile=   replace(finalFile , `//lastRepository`  ,  IUnit+" //lastRepository" ) ; 
  
    let filename = path ;
    fileM.writeFile(filename,finalFile) ;
    console.log(filename);
};

var appendUnit=(Unit  )=>{
    let path =`${projectPath}/${repositoryProjectName}/`+`${UnitFileName}.cs` ;
    let templateFile = fileM.readFile( path) ;
    var finalFile =templateFile ;
    finalFile=   replace(finalFile , `//lastRepository`  ,  Unit+" //lastRepository" ) ; 
  
    let filename = path ;
    fileM.writeFile(filename,finalFile) ;
    console.log(filename);
};

 

// var appendInjectionUsing=(using)=>{
//     let templateFile = fileM.readFile( `${projectPath}/${projectName}/`+`${appStartUpName}.cs`) ;
//     var finalFile =templateFile ;
//     finalFile=   replace(finalFile , `//lastInjectionUsing`  , using+" //lastInjectionUsing" ) ; 
//     let filename =  `${projectPath}/${projectName}/`+`${appStartUpName}.cs` ;
//     fileM.writeFile(filename,finalFile) ;
//     console.log(filename);
// };


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



     
     var context = replace(config.contextTemplate,'{{entity}}' ,className) ;
    
     appendContext(context);

     var injectionUsing = replace(config.injectionUsing ,'{{entity}}' ,className) ;
         injectionUsing = replace(injectionUsing,'{{serviceProjectName}}' ,serviceProjectName) ;

     var injection = replace(config.injectionTemplate,'{{entity}}' ,className) ; 

     var IUnit = replace(config.IUnitFile,'{{entity}}' ,className) ; 
     var Unit = replace(config.UnitFile,'{{entity}}' ,className) ; 
         Unit = replace(Unit,'{{variableClassName}}' ,getLowerCase(className)) ;
     
     appendInjection(injection ,injectionUsing);

     appendInterfaceUnit(IUnit) ;
     appendUnit(Unit) ;

   

   
  
  
    
     
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
                namespace:`${domainProjectName}.Entities`,
                dependencies :getDependenciesString([])  ,              
                properties:getPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${domainProjectName}/Entities`,
        }
        ,
        {
            className:`${className}` ,
            template :'entityDto' ,
            fileName:`${className}Dto`,
            replacement:{
                className:className,
                variableClassName:getLowerCase(className),
                inherit:'BaseEntity',
                namespace:`${domainProjectName}.Dtos`,
                dependencies :getDependenciesString([])  ,              
                properties:getPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${domainProjectName}/Dtos`,
        }
        ,
        {
            className:`${className}` ,
            template :'map' ,
            fileName:`${className}Map`,
            replacement:{
                className:className,
                variableClassName:getLowerCase(className),
                namespace:`${domainProjectName}.Mappers`,
                dependencies :getDependenciesString(['Microsoft.EntityFrameworkCore.Metadata.Builders'])  ,              
                properties:getMappingPropertiesString(properties),
                mappingString:getMappingString(properties,'entity'),
                mappingStringDto:getMappingString(properties,'dto'),
        
            },
            filePath:`${projectPath}/${domainProjectName}/Mappers`,
        }

        ,
         
        {
            className:`${className}` , 
            template :'service' ,
            fileName:`${className}Service`,
            replacement:{
                className:className,
                variableClassName:getLowerCase(className),
                namespace:`${serviceProjectName}.Services`,
                dependencies :getDependenciesString(
                    [`${domainProjectName}.Entity`,
                     `Repository`
                ]
                    )  ,              
                properties:getMappingPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${serviceProjectName}/Services`,
        }
        ,  
        {
            className:`${className}` ,
            template :'IService' ,
            fileName:`I${className}Service`,
            replacement:{
                className:className,
                variableClassName:getLowerCase(className),
                namespace:`${serviceProjectName}.Interfaces`,
                dependencies :getDependenciesString(
                    [`${domainProjectName}.Entity`
                ])  ,              
                properties:getMappingPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${serviceProjectName}/Interfaces`,
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
                    [
                    `System.Linq`,
                     `System.Threading.Tasks`,
                     `${domainProjectName}.Entities`,
                     `${serviceProjectName}.Interfaces`,
                     `Microsoft.AspNetCore.Http` ,
                     `Microsoft.AspNetCore.Mvc`,
                     `SI.Data.Dtos`
  
                ])  ,              
                properties:getMappingPropertiesString(properties)
        
            },
            filePath:`${projectPath}/${projectName}/Controllers`,
        }
        
          
        
        ]

        return classes; 
 }





 module.exports = generation ;