using SI.Data.Entities;
using SI.Data.Shared;
using SI.Data.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace {namespace}
{
   public interface I{className}Service
    {
    
        Response<List<{className}Dto>> Get{className}s();
        Response<{className}Dto> Get{className}(long id);
        Response<{className}Dto> Insert{className}({className} {variableClassName});
        Response<{className}Dto> Update{className}({className} {variableClassName});
        Response<bool> Delete{className}(long id);
 

      
    }
}
