using SI.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SI.Repo
{
   public  class UnitOfWork : IUnitOfWork
    {
         
            private readonly ApplicationContext _dbContext;



            public UnitOfWork(ApplicationContext dbcontext)
            {
                this._dbContext = dbcontext;
            }

           //lastRepository
        

       
         
       

     

    }
}
