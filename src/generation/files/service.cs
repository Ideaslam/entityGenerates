 
{dependencies}
using System;
using System.Collections.Generic; 
using System.Text;

namespace {namespace}
{
   public  class {className}Service : I{className}Service
    {

        private IRepository<{className}> {variableClassName}Repository;
        


        public {className}Service(IRepository<{className}> {variableClassName}Repository )
        {
            this.{variableClassName}Repository = {variableClassName}Repository;
           
        }

        public void Delete{className}(long id)
        {
            {className} {variableClassName} = Get{className}(id);
            {variableClassName}Repository.Remove({variableClassName});
            {variableClassName}Repository.SaveChanges();
        }

        public {className} Get{className}(long id)
        {
            return {variableClassName}Repository.Get(id);
        }

        public IEnumerable<{className}> Get{className}s()
        {
            return {variableClassName}Repository.GetAll();
        }

        public void Insert{className}({className} {variableClassName})
        {
            {variableClassName}Repository.Insert({variableClassName});
        }

        public void Update{className}({className} {variableClassName})
        {
            {variableClassName}Repository.Update({variableClassName});
        }
    }
}
