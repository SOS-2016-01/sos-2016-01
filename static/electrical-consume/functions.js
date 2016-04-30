$("body").ready(function(){
  console.log("Jquery Ready!");


  $("#loadInitialData").click(function(){
      console.log("Entra");
      var apikey = $("#apikey").val();
      var dir = "";

      var request = $.ajax({
        url:"/api/v1/electrical-consume/loadInitialData?apikey="+apikey,
        type:"GET"
      });

      var request = $.ajax({
        url:"/api/v1/electrical-consume?apikey="+apikey,
        type:"GET"
      });

      request.done(function (data){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        showTable(data);

      });


    });



});

function showTable(data){

  console.log("showTable"+data[0]);
  var mytable = $('<tbody></tbody>');
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
