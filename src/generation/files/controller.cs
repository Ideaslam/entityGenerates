 
{dependencies}
using System;
using System.Collections.Generic;




namespace {namespace}
{
    [Route("api/[controller]")]
    [ApiController]
    public class {className}Controller : ControllerBase    {


      
            private readonly {serviceProjectName}.{className}Service.I{className}Service {variableClassName}Service;
            

            public {className}Controller({serviceProjectName}.{className}Service.I{className}Service {variableClassName}Service )
            {
                this.{variableClassName}Service = {variableClassName}Service;
                 
            }

      


        // GET: api/{className}
        [HttpGet]
        public IEnumerable<{className}> Get()
        {
             List<{className}> {variableClassName} = new List<{className}>() ;
             return {variableClassName}; 
        }

        // GET: api/{className}/5
        [HttpGet("{id}")]
        public  ActionResult<{className}>  Get(int id)
        { 
              {className} {variableClassName} =new {className}() ;
             return {variableClassName}; 
        }

        // POST: api/{className}
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/{className}/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
