
{dependencies}
using System;
using System.Collections.Generic;


namespace {namespace}
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class {className}Controller : ControllerBase

    {

        private readonly I{className}Service {variableClassName}Service;

        public {className}Controller(I{className}Service {variableClassName}Service)
        {
            this.{variableClassName}Service = {variableClassName}Service;
            
        }


        // GET: api/{className}
        [ActionName("GetAll")]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok({variableClassName}Service.Get{className}s());
        }


 

        // GET: api/{className}/5
        [ActionName("GetOne")]
        [HttpGet]
        public IActionResult GetOne([FromQuery(Name = "id")] int id)
        {
            return Ok({variableClassName}Service.Get{className}(id));
        }

        // POST: api/{className}
        [HttpPost]
        public IActionResult Post([FromBody] {className}  {variableClassName})
        {
            return Ok({variableClassName}Service.Insert{className}({variableClassName}));
        }

       

        // PUT: api/{className}/5
        [HttpPut]
        public IActionResult Put([FromQuery(Name = "id")] int id, [FromBody] {className} {variableClassName})
        {
            return Ok({variableClassName}Service.Update{className}({variableClassName}));
        }


      

        [HttpDelete]
        public IActionResult Delete([FromQuery(Name ="id")] int id)
        {
            return Ok({variableClassName}Service.Delete{className}(id));
        }
    }
}
