$("body").ready(function (){
  console.log("jQuery Ready!");
  $("#load").click(function(){
    console.log("Handling click on load data");

    var apikey = $("#apikey").val();
    console.log("Apikey handled: "+apikey)
    var request = $.ajax({
      url:"/api/v1/co2/loadInitialData?apikey="+apikey,
      type:"GET",
      contentType : "application/json"
    });

    request.done(function (data,jqXHR,status){
      var list;
      console.log("Handling request (OK)");
      console.log("Status: "+jqXHR.status);
    });

    request.always(function (jqXHR,status){
      if(status=="error"){
        console.log("Status: "+jqXHR.status);
      }
    });
  });

  $("#Delete_all").click(function(){
    console.log("Handling click on delete all");

    var apikey = $("#apikey").val();
    console.log("Apikey handled: "+apikey)
    var request = $.ajax({
      url:"/api/v1/co2?apikey="+apikey,
      type:"DELETE",
      contentType : "application/json"
    });

    request.done(function (data,jqXHR,status){
      console.log("Handling DELETE ALL (OK)");
      console.log("Status: "+jqXHR.status);
    });

    request.always(function (jqXHR,status){
      if(status=="error"){
        $("#status").text(jqXHR.status + " " + jqXHR.statusText);
        console.log("Status: "+jqXHR.status);

      }
    });
  });



});

function loadTable(){
  console.log("Handling load table");
  var apikey = $("#apikey").val();
  var items = $("#items").val();
  var page = $("#page").val();
  var request = $.ajax({
    url:"/api/v1/co2?apikey="+apikey+"&limit="+items+"&offset="+items*page,
    type:"GET",
    contentType : "application/json"
  });
  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    console.log(JSON.stringify(data));
    items = $("#items").val();
    page = $("#page").val();
  //  array = JSON.parse(data);
    mytable = $('<tbody></tbody>')
    for (i=0;i<data.length;i++){
      var row = $('<tr></tr>').appendTo(mytable);
      $('<td></td>').text(data[i].country).appendTo(row);
      $('<td></td>').text(data[i].year).appendTo(row);
      $('<td></td>').text(data[i].co2mtn).appendTo(row);
      $('<td></td>').text(data[i].co2kg).appendTo(row);
      $('<td></td>').html('<i class="small material-icons">mode_edit</i><i class="small material-icons">delete</i>').appendTo(row);
    }
    console.log("TTTTT:"+mytable.html());
    mytable.appendTo("#tt");
  });

  request.always(function (jqXHR,status){
    if(status=="error"){
      console.log("Status: "+jqXHR.status);
      if(jqXHR.status==401)
      alert("You entered a wrong APIkey")
    }

  });
}

function searchTable(){
  console.log("Handling search table");
  var apikey = $("#apikey").val();
  var fromS = $("#from").val();
  var to = $("#to").val();
  if(fromS&&to){
  var request = $.ajax({
    url:"/api/v1/co2?apikey="+apikey+"&from="+fromS+"&to="+to,
    type:"GET",
    contentType : "application/json"
  });
  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    console.log(JSON.stringify(data));
    items = $("#items").val();
    page = $("#page").val();
  //  array = JSON.parse(data);
    mytable = $('<tbody></tbody>')
    for (i=0;i<data.length;i++){
      var row = $('<tr></tr>').appendTo(mytable);
      $('<td></td>').text(data[i].country).appendTo(row);
      $('<td></td>').text(data[i].year).appendTo(row);
      $('<td></td>').text(data[i].co2mtn).appendTo(row);
      $('<td></td>').text(data[i].co2kg).appendTo(row);
      $('<td></td>').html('<i class="small material-icons">mode_edit</i><i class="small material-icons">delete</i>').appendTo(row);
    }
    console.log("TTTTT:"+mytable.html());
    mytable.appendTo("#tt");
  });

  request.always(function (jqXHR,status){
    if(status=="error"){
      console.log("Status: "+jqXHR.status);
      if(jqXHR.status==401)
      alert("You entered a wrong APIkey")
    }
  });
  }
  else alert("Insert a valid intervale");
}
