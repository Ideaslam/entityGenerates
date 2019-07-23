function callWebApi( direction ,type , data ,  callback) {

    $.ajax({
        url: direction ,
        type:type,
        dataType: 'json',
        
        contentType: 'application/json',
        data: JSON.stringify(data)
    })
    .done(function (data) {
        
        callback(data);
    })
    .fail(function (error) {
        callback({status:false ,msg:'error'});
    })
    .always(function () {
        console.log("complete");
    });
}


 
    
 
 


function GenerateEntity (data,callback) {

   console.log('reach CALL API');
    callWebApi('http://localhost:3000/entity' ,'POST', data , function(result){
        callback(result);
    })
}

  