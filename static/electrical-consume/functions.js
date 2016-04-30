$("body").ready(function (){
  console.log("jQuery Ready!");

  $("#loadInitialData").click(function(){
    var apikey = $("#apikey").val();
    var dir = "";

    var request = $.ajax({
      url:"/api/v1/electrical-consume/loadInitialData?apikey="+apikey,
      type:"GET"
    });

    
    request.done(function (data){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      $("#data").text("Data Loaded!");

      table(data);

    });

    request.always(function (jqXHR,status){
      if(status=="error")
        console.log("Status: "+jqXHR.status);
    });
      });


  });






function table(data){
  mytable = $('<tbody></tbody>')
  for (i=0;i<data.length;i++){
    var row = $('<tr></tr>').appendTo(mytable);
    $('<td></td>').text(data[i].country).appendTo(row);
    $('<td></td>').text(data[i].year).appendTo(row);
    $('<td></td>').text(data[i].ePowerConsum).appendTo(row);
    $('<td></td>').text(data[i].energyUse).appendTo(row);
    $('<td></td>').text(data[i].urbanPopulation).appendTo(row);
  }
  console.log("TTTTT:"+mytable.html());
  mytable.appendTo("#t1");
}
