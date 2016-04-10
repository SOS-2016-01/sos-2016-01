
  console.log("Handling request");

  var request = $.ajax({
    url:"/api/v1/co2?apikey=vdcgrc",
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
      $('<td></td>').text(array[i].co2mtn).appendTo(row);
      $('<td></td>').text(array[i].co2kg).appendTo(row);
    }
    console.log("TTTTT:"+mytable.html());
    mytable.appendTo("#t1");
/*  var element = document.getElementById("t1");
    for (i=0;i<array.length;i++){
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(array[i].country));
      element.appendChild(td);
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(array[i].year));
      element.appendChild(td);
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(array[i].co2mtn));
      element.appendChild(td);
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(array[i].co2kg));
      element.appendChild(td);
      element.appendChild(tr);
    }*/

  });

  request.always(function (jqXHR,status){
    if(status=="error")
      console.log("Status: "+jqXHR.status);
  });
