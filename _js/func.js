$(document).ready(function (){
  $.ajax({
    url:"/teste",
    method:"POST",
    datatype: "json",
    data: {teste:"hahaha"},
    success: function(data){
      dt = JSON.parse(data)
      console.log(dt)
    }
  });
})
