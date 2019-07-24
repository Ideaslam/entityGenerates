

 const config ={
     "projectPath" :"C:/Users/islam/source/repos/islah_v3",
     "projectName" :"islah_v3" ,
     "domainProjectName" :"Domain" ,
     "serviceProjectName" :"Service" ,
     "repositoryProjectName" :"Repository" ,
     "entityBuilder":"entityBuilder." ,
     "appStartUpName":"Startup",
     "appContextName":"ApplicationContext",
     "contextTemplate":"\n new {{entity}}Map(modelBuilder.Entity<{{entity}}>());",
     "injectionTemplate":"\n services.AddTransient<I{{entity}}Service, {{entity}}Service>();",
     "injectionUsing":"\n using {{serviceProjectName}}.{{entity}}{{serviceProjectName}};"
}

 



module.exports = config ;