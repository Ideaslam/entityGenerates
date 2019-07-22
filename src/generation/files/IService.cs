 
 
{dependencies}
using System;
using System.Collections.Generic;
using System.Text;


namespace {namespace}
{
   public interface I{className}Service
    {

        IEnumerable<{className}> Get{className}s();
        {className} Get{className}(long id);
        void Insert{className}({className} {variableClassName});
        void Update{className}({className} variableClassName);
        void Delete{className}(long id);

    }
}
