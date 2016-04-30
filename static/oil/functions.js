$("body").ready(function (){
  console.log("jQuery Ready!");


  $("#loadInitialData").click(function(){
    var apikey = $("#apiKey").val();
    var dir = "";

    var request = $.ajax({
      url:"/api/v1/oil/loadInitialData?apikey="+apikey,
      type:"GET"
    });

    if(apikey==12345){

    request.done(function (data){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      $("#data").text("Data Loaded!");

      table(dir);

    });

  }else{

    $("#data").text("Unauthorized!");

  }

  });

  $("#cleanButton").click(function(){
    var apikey = $("#apiKey").val();
    var dir = "";

    var request = $.ajax({
      url:"/api/v1/oil?apikey="+apikey,
      type:"DELETE"
    });

    if(apikey==12345){

    request.done(function (data){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      $("#data").text("Data Clear!");
      table(dir);

    });

  }else{

    $("#data").text("Unauthorized!");

  }

  });

  $("#deleteButton").click(function(){
    var apikey = $("#apiKey").val();
    var country = $("#country").val();
    var year = $("#year").val();
    var dir = "";

    var request = $.ajax({
      url:"/api/v1/oil/"+country+"/"+year+"?apikey="+apikey,
      type:"DELETE"
    });

    if(apikey==12345){

    request.done(function (data){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      $("#data").text("Data Clear!");
      table(dir);

    });

  }else{

    $("#data").text("Unauthorized!");

  }

  });



  $("#searchButton").click(function(){
    console.log("Handling click");
    var apikey = $("#apiKey").val();
    var country = $("#country").val();
    var year = $("#year").val();
    var dir = "";
    if(country && year){
      var dir = "/api/v1/oil/"+country+"/"+year+"?apikey="+apikey;
    }else if(year){
      var dir = "/api/v1/oil/"+year+"?apikey="+apikey;

    }else if (country){

      var dir = "/api/v1/oil/"+country+"?apikey="+apikey;

    }

  var request = $.ajax({
    url:"/api/v1/oil?apikey="+apikey,
    type:"GET"
  });

  if(apikey==12345){


  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    $("#data").text("");
    table(dir);


  });
}else{

    $("#data").text("Unauthorized!");

}


  request.always(function (jqXHR,status){
    if(status=="error")
      console.log("Status: "+jqXHR.status);
  });

});

$("#createButton").click(function(){
  var apikey = $("#apiKey").val();
  var country = $("#countryCreate").val();
  var year = $("#yearCreate").val();
  var diesel = $("#dieselCreate").val();
  var gasoline = $("#gasolineCreate").val();
  var dir = "";

  var request = $.ajax({
    url:"/api/v1/oil?apikey="+apikey,
    type:"POST",
    data: '{"country":"'+country+'","year":'+year+',"diesel":'+diesel+',"gasoline":'+gasoline+'}',
    contentType : "application/json"
  });
  console.log(data);

  if(apikey==12345){

  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    $("#data").text("Data Created!");
    table(dir);

  });

}else{

  $("#data").text("Unauthorized!");

}

});

$("#updateButton").click(function(){
  var apikey = $("#apiKey").val();
  var country = $("#countryCreate").val();
  var year = $("#yearCreate").val();
  var diesel = $("#dieselCreate").val();
  var gasoline = $("#gasolineCreate").val();
  var dir = "";

  var request = $.ajax({
    url:"/api/v1/oil/"+country+"/"+year+"?apikey="+apikey,
    type:"PUT",
    data: '{"country":"'+country+'","year":'+year+',"diesel":'+diesel+',"gasoline":'+gasoline+'}',
    contentType : "application/json"
  });
  console.log(data);

  if(apikey==12345){

  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    $("#data").text("Data Update!");
    table(dir);

  });

}else{

  $("#data").text("Unauthorized!");

}

});




});




function table(dir){
  $(document).ready(function () {
    var apikey = $("#apiKey").val();
    if(dir==""){

      dir = "/api/v1/oil?apikey="+apikey;
    }

      // prepare the data

      var url = dir;
      var source =
                {
                    datatype: "json",
                    datafields: [
                          { name: 'country' },
                          { name: 'year' },
                          { name: 'diesel'},
                          { name: 'gasoline' }
                      ],
                    id: 'id',
                    url: url
                };
                var dataAdapter = new $.jqx.dataAdapter(source, {
                    downloadComplete: function (data, status, xhr) { },
                    loadComplete: function (data) { },
                    loadError: function (xhr, status, error) { }
      });
      $("#jqxgrid").jqxGrid(
      {
          source: dataAdapter,
          columns: [
            { text: 'Country', datafield: 'country'},
            { text: 'Year', datafield: 'year'},
            { text: 'Diesel', datafield: 'diesel'},
            { text: 'Gasoline', datafield: 'gasoline' }
          ]
      });
  });

}
