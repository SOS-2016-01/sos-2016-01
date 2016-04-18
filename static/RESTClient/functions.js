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

    request.done(function (data,jqXHR,status){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      console.log(data);
      $("#log").text("");
      $("#data").text("");
      $("#status").text("");
      for(i=0;i>data.length;i++){
        $("#data").text("-"+JSON.stringify(data[i]));
      }



      $("#data").text(JSON.stringify(data));
      if(jqXHR.status){
        $("#status").text(jqXHR.status + " " + jqXHR.statusText);
        console.log("Status: "+jqXHR.status);
      }
    });

    request.always(function (jqXHR,status){
      if(status=="error"){
        $("#status").text(jqXHR.status + " " + jqXHR.statusText);
        console.log("Status: "+jqXHR.status);
        $("#data").text("");
      }
    });
  });
});
