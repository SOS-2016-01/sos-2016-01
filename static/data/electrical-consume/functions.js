
  console.log("Handling request");

  var request = $.ajax({
    url:"/api/v1/electrical-consume?apikey=multiPlan_C4-sos-2016-01-asm_ag",
    type:"GET"
  });

  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    console.log(JSON.stringify(data));
    //array = JSON.parse(data);
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
  });

  request.always(function (jqXHR,status){
    if(status=="error")
      console.log("Status: "+jqXHR.status);
  });
