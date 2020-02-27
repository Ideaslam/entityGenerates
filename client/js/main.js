
 
var entities ={} ; 
var properties =[];
var selectedDataType;

$(document).ready(()=>{
    generateTable();
})

// $("select.datatypes").change(function(){
//       selectedDataType = $(this).children("option:selected").val();
    
// });

// $( "#myselect option:selected" ).text();


function readError(msg)
{
        $('#error').text('* '+msg);
}

function clearProperty()
{
    $('#property-name').val('');
    selectedDataType='';
}

function clearAll( )
{
    clearProperty();
     //$('#project-url').val('');
    // $('#project-name').val('');
    // $('#domain-name').val('');
    // $('#service-name').val('');
     properties=[]
     entities ={};
     generateTable();

}


function setProperty()
{
    readError('');
    selectedDataType= $( "#datatype-select option:selected" ).val();
    console.log(selectedDataType);
    if(selectedDataType== '-1' || selectedDataType== undefined ){
        readError('please choose DataType');
    }
    else if ($('#property-name').val() == undefined || $('#property-name').val()  == ''){
        readError('please enter property name');
    }
    else if ( $('#property-name').val().toLowerCase() =="id" ){
        readError('Id is in Base Entity');
    }
    else {
        properties.push({name:$('#property-name').val() ,type:selectedDataType});
        clearProperty();
        generateTable();
    }
 
}


function  deleteProperty(id)
{
    properties.splice(id ,1);
    generateTable();

}

function generateTable()
{
    var rows =``  ;
   for (var i =0 ; i < properties.length; i++){
     
    rows +=`<tr>
        <th scope="row">${i}</th>
        <td>${properties[i].name}</td>
        <td>${properties[i].type}</td>
        <td>
        <button type="button" class="btn  " onclick="deleteProperty(${i})"><img src="imgs/delete.png" width="30px" alt=""></button>
        </td>
      </tr>`
   }


    $('#table-body').html(rows);
   
  

}

// $('#generate').click(()=>{
 

// })


$('form').on('submit', function(e) {

    if (!confirm('Are you sure ?'))  
    return false ;
    
    e.preventDefault();
    entities.projectUrl=$('#project-url').val();
    entities.projectName=$('#project-name').val();
    entities.domainName=$('#domain-name').val();
    entities.serviceName=$('#service-name').val();
    entities.entityName=$('#entity-name').val();
    entities.properties=properties;
    console.log(entities);

    if(entities.entityName == ''  ||  entities.entityName  == undefined || entities.entityName =='' ||   entities.properties.length ==0 )
    {
        readError('plesae add property');
    }
    else{
    GenerateEntity(entities,(result)=>{

        console.log(result);
        if(result.status){
            openModal(result.msg);
            
        }else{
            openModal(result.msg);
             
        }
    });

    clearAll();
    }
  


    //

});


function openModal(msg){
  $('#modal-body').html(msg) ;
  $('#modal').css('display','block');
}


function closeModal(){
    $('#modal').css('display','none');
}