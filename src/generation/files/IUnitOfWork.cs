using SI.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SI.Repo
{
   public interface IUnitOfWork  
    {
        Repository<User> UserRepository { get;}
       
    }
}
