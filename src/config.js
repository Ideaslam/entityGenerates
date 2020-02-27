

 const config ={
     "projectPath" :"C:/Users/eslam227863/Desktop/Athar1.0",
     "projectName" :"SI.Web" ,
     "domainProjectName" :"SI.Data" ,
     "serviceProjectName" :"SI.Service" ,
     "repositoryProjectName" :"SI.Repo" ,
     "entityBuilder":"entityBuilder." ,
     "appStartUpName":"Startup",
     "IUnitFileName" :"IUnitOfWork",
     "UnitFileName" :"UnitOfWork",
     "appContextName":"ApplicationContext",
     "contextTemplate":"\n new {{entity}}Map(modelBuilder.Entity<{{entity}}>());",
     "injectionTemplate":"\n services.AddTransient<I{{entity}}Service, {{entity}}Service>();",
     "injectionUsing":"\n using {{serviceProjectName}}.{{entity}}{{serviceProjectName}};",
     "IUnitFile":"\n Repository<{{entity}}> {{entity}}Repository { get;}",
     "UnitFile":` \n  private Repository<{{entity}}> {{variableClassName}}Repository;
     public Repository<{{entity}}> {{entity}}Repository
     {
         get
         {
             if (this.{{variableClassName}}Repository == null)
             {
                 this.{{variableClassName}}Repository = new Repository<{{entity}}>(_dbContext);
             }
             return {{variableClassName}}Repository;
         }
     } `
}

 



module.exports = config ;