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
      var list;
      console.log("Handling request (OK)");
      console.log("Data received: ");
      console.log(data);
      $("#log").text("");
      $("#data").text("");
      $("#status").text("");
      $("#list").text("");
      $("#data").text(JSON.stringify(data));
      dataToHtml(data);
      console.log("Status: "+jqXHR.status);
    });

    request.always(function (jqXHR,status){
      $("#status").text(jqXHR.status + " " + jqXHR.statusText);
      if(status=="error"){
        $("#status").text(jqXHR.status + " " + jqXHR.statusText);
        console.log("Status: "+jqXHR.status);
        $("#data").text("");
        $("#list").text("");
      }
    });
    function dataToHtml(data){
      mylist = $('<ul></ul>')
      if(data[0].co2kg){
      for (i=0;i<data.length;i++){
          $('<li></li>').text("Country="+data[i].country+", Year="+data[i].year+", co2mtn="+data[i].co2mtn+", co2kg="+data[i].co2kg).appendTo(mylist);
        }
      }
      else if(data[0].diesel){
        for (i=0;i<data.length;i++){
        $('<li></li>').text("Country="+data[i].country+", Year="+data[i].year+", diesel="+data[i].diesel+", gasoline="+data[i].gasoline).appendTo(mylist);
        }
      }
      else if(data[0].ePowerConsum){
        for (i=0;i<data.length;i++){
        $('<li></li>').text("Country="+data[i].country+", Year="+data[i].year+", ePowerConsum="+data[i].ePowerConsum+", energyUse="+data[i].energyUse+", urbanPopulation="+data[i].urbanPopulation).appendTo(mylist);
        }
      }
      console.log("List:"+mylist.html());
      mylist.appendTo("#list");
    }
  });
});
