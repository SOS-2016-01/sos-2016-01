
  console.log("Handling request");

  var request = $.ajax({
    url:"/api/v1/oil?apikey=12345",
    type:"GET"
  });

  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    console.log(data);
    array = JSON.parse(data);
    mytable = $('<tbody></tbody>')
    for (i=0;i<array.length;i++){
      var row = $('<tr></tr>').appendTo(mytable);
      $('<td></td>').text(array[i].country).appendTo(row);
      $('<td></td>').text(array[i].year).appendTo(row);
      $('<td></td>').text(array[i].diesel).appendTo(row);
      $('<td></td>').text(array[i].gasoline).appendTo(row);
    }
    console.log("TTTTT:"+mytable.html());
    mytable.appendTo("#t1");

  });

  request.always(function (jqXHR,status){
    if(status=="error")
      console.log("Status: "+jqXHR.status);
  });
