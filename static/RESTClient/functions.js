$("body").ready(function (){
  console.log("jQuery Ready!");
  $("#button").click(function(){
    console.log("Handling click");

    var method = $("input[type=radio]:checked").attr("id");
    var request = $.ajax({
      url:$("#url").val(),
      type:method,
      data: $("#payload").val(),
      contentType : "application/json"
    });

    request.done(function (data){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      console.log(data);
      $("#log").text("");
      $("#status").text(statusCode +" "+statusCodeText);
      $("#data").text(data);
    });

    request.always(function (jqXHR,status){
      if(status=="error"){
        $("#status").text(statusCode +" "+statusCodeText);
        console.log("Status: "+jqXHR.status);
        $("#data").text("");
        $("#log").text(jqXHR.status);
      }else{
        $("#txtStatus").text(status);
      }
    });
  });
});
