using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Data.Entities;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SI.Data.Dtos;

namespace  {namespace}
{
    public class {className}Map
    {
        public {className}Map(EntityTypeBuilder<{className}> entityBuilder)
        {
             {properties}
        }



        public static {className}Dto Map({className} {variableClassName})
        {
            if ({variableClassName} == null) return null;
            {className}Dto DTO = new {className}Dto()
            {
                 {mappingString}
            };
            return DTO;
        }

        public static List<{className}Dto> Map(List<{className}> {variableClassName}es)
        {
            if ({variableClassName}es == null) return null;
            return {variableClassName}es.Select(x => Map(x)).ToList();
        }

        public static {className} Map({className}Dto {variableClassName}Dto)
        {
            if ({variableClassName}Dto == null) return null;
            var {variableClassName} = new {className}()
            {
                {mappingString}

            };
            return {variableClassName};
        }
        public static List<{className}> Map(List<{className}Dto> {variableClassName}esDto)
        {
            if ({variableClassName}esDto == null) return null;
            return {variableClassName}esDto.Select(x => Map(x)).ToList();
        }

    }
}
