using Microsoft.EntityFrameworkCore;
using SI.Data.Entities;
using SI.Data.Dtos;
using SI.Data.Enums;
using SI.Data.Mappers;
using SI.Data.Messages;
using SI.Data.Shared;
using SI.Repo;
using SI.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static SI.Data.Enums.ResponseStateEnum;
using static SI.Data.Messages.Messages;

namespace {namespace}
{
   public  class {className}Service : I{className}Service 
    {
        readonly private IUnitOfWork unitOfWork;

        public {className}Service(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

 

        public Response<List<{className}Dto>> Get{className}s()
        {
           
            
            try
            {
               List<{className}Dto> {variableClassName}Dtos = {className}Map.Map(unitOfWork.{className}Repository.GetAll());

                if ({variableClassName}Dtos == null)
                    {variableClassName}Dtos = new List<{className}Dto>();

                return new Response<List<{className}Dto>>(true, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.DATAGOT), {variableClassName}Dtos);

            }
            catch (Exception ex)
            {
                return new Response<List<{className}Dto>>(false, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.UNEXPERROR), ex.Message, new List<{className}Dto>());
            }
        }

 
        public Response<{className}Dto> Get{className}(long id)
        {
            
           
            try
            {
                {className}Dto {variableClassName}Dto = {className}Map.Map(unitOfWork.{className}Repository.Get(id));

                if ({variableClassName}Dto == null)
                    {variableClassName}Dto = new {className}Dto();

                return new Response<{className}Dto>(true, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.DATAGOT), {variableClassName}Dto);

            }
            catch (Exception ex)
            {

                return new Response<{className}Dto>(false, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.UNEXPERROR), ex.Message, new {className}Dto());
            }
        }
  
        public Response<{className}Dto> Insert{className}({className} {variableClassName})
        {
           
           
            try
            {

                 
                {className}Dto {variableClassName}Dto = {className}Map.Map(unitOfWork.{className}Repository.Insert({variableClassName}));
 
                return new Response<{className}Dto>(true, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.INSERT_CORRECT), {variableClassName}Dto);

            }
            catch (Exception ex)
            {

                return new Response<{className}Dto>(false, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.INSERT_ERROR), ex.Message, new {className}Dto());
            }
        }
        public Response<{className}Dto> Update{className}({className} {variableClassName})
        {
             
            try
            {
        
                {className}Dto {variableClassName}Dto = {className}Map.Map(unitOfWork.{className}Repository.Update({variableClassName}));
                return new Response<{className}Dto>(true, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.UPDATE_CORRECT), {variableClassName}Dto);

            }
            catch (Exception ex)
            {

                return new Response<{className}Dto>(false, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.UPDATE_ERROR), ex.Message, new {className}Dto());
            }
        }
         public Response<bool> Delete{className}(long id)
        {
             
            try
            {
                {className} {variableClassName} = unitOfWork.{className}Repository.Get(id);
                unitOfWork.{className}Repository.Remove({variableClassName});
                unitOfWork.{className}Repository.SaveChanges();

                return new Response<bool>(true, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.DELETE_CORRECT), true);

            }
            catch (Exception ex)
            {

                return new Response<bool>(false, Messages.GetMessage(Lang, TypeM.DEFAULT, defaultM.DELETE_ERROR), ex.Message, false);
            }
        }
    }
}
