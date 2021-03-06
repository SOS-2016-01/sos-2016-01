$("body").ready(function (){
  console.log("jQuery Ready!");

  $("#loadInitialData").click(function(){

    var apikey = $("#apiKey").val();
    var dir = "";

    var request = $.ajax({
      url:"/api/v1/oil/loadInitialData?apikey="+apikey,
      type:"GET"
    });

    request.done(function (data){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      table(dir);

    });

    request.always(function (jqXHR,status){
      if(status=="error" && jqXHR.status==402 ){
        swal("Unauthorized: Apikey No Valid");
    }else {

      swal("Data Loaded");

    }
    });

  });

  $("#cleanButton").click(function(){
    var apikey = $("#apiKey").val();
    var dir = "";

    var request = $.ajax({
      url:"/api/v1/oil?apikey="+apikey,
      type:"DELETE"
    });

    request.done(function (data){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      table(dir);

    });

    request.always(function (jqXHR,status){
      if (status=="error" && jqXHR.status==402){

      swal("Unauthorized: Apikey No Valid");

    }else{

      swal("All Deleted");

    }
    });

  });

  $("#deleteButton").click(function(){
    var apikey = $("#apiKey").val();
    var country = $("#country").val();
    var year = $("#year").val();
    var dir = "";

    if(country && year){

    var request = $.ajax({
      url:"/api/v1/oil/"+country+"/"+year+"?apikey="+apikey,
      type:"DELETE"
    });

    request.done(function (data){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      table(dir);

    });

    request.always(function (jqXHR,status){
      if(status=="error" && jqXHR.status==404){
      swal("Data Not Found");
    }else if (status=="error" && jqXHR.status==402){

      swal("Unauthorized: Apikey No Valid");

    }else{

      swal("Data Deleted");

    }
    });

  }else{

    swal("Fill in all fields");

  }

  });

  $("#searchButton").click(function(){
    console.log("Handling click");
    var apikey = $("#apiKey").val();
    var country = $("#country").val();
    var year = $("#year").val();
    var item = $("#item").val();
    var page = $("#page").val();
    var dir = "";

  var request = $.ajax({
    url:"/api/v1/oil?apikey="+apikey,
    type:"GET"
  });



  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    table(dir);


  });


  request.always(function (jqXHR,status){
    if(status=="error" && jqXHR.status==402){

      swal("Unauthorized: Apikey No Valid");

  }

  });

});

$("#createButton").click(function(){
  var apikey = $("#apiKey").val();
  var country = $("#countryCreate").val();
  var year = $("#yearCreate").val();
  var diesel = $("#dieselCreate").val();
  var gasoline = $("#gasolineCreate").val();
  var dir = "";


  if(country && year && diesel && gasoline){

  var request = $.ajax({
    url:"/api/v1/oil?apikey="+apikey,
    type:"POST",
    data: '{"country":"'+country+'","year":'+year+',"diesel":'+diesel+',"gasoline":'+gasoline+'}',
    contentType : "application/json"
  });

  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    swal("Data Created!");
    table(dir);

  });

  request.always(function (jqXHR,status){
    if(status=="error" && jqXHR.status==402){

    swal("Unauthorized: Apikey No Valid");

  }else if(status=="error" && jqXHR.status==409){

    swal("Data Already Exists");

    }
  });

}else{

  swal("Fill in all fields");

}



});

$("#updateButton").click(function(){
  var apikey = $("#apiKey").val();
  var country = $("#countryCreate").val();
  var year = $("#yearCreate").val();
  var diesel = $("#dieselCreate").val();
  var gasoline = $("#gasolineCreate").val();
  var dir = "";

  if(country && year && diesel && gasoline){


  var request = $.ajax({
    url:"/api/v1/oil/"+country+"/"+year+"?apikey="+apikey,
    type:"PUT",
    data: '{"country":"'+country+'","year":'+year+',"diesel":'+diesel+',"gasoline":'+gasoline+'}',
    contentType : "application/json"
  });

  request.done(function (data){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    swal("Data Update!");
    table(dir);

  });

  request.always(function (jqXHR,status){
    if(status=="error" && jqXHR.status==402){

    swal("Unauthorized: Apikey No Valid");

  }else{

    swal("Data Updated");

    }
  });

}else{

  swal("Fill in all fields");

}

});

});

function table(dir){
  $(document).ready(function () {
    var apikey = $("#apiKey").val();
    var item = $("#item").val();
    var country = $("#country").val();
    var year = $("#year").val();
    var yearTo = $("#yearTo").val();
    var page = $("#page").val();
    if(dir==""){

      dir = "/api/v1/oil?apikey="+apikey+"&limit="+item+"&offset="+item*(page-1)+"&from="+year+"&to="+yearTo;

    }else{

        if(country && year){
          var dir = "/api/v1/oil/"+country+"?apikey="+apikey+"&limit="+item+"&offset="+item*(page-1)+"&from="+year+"&to="+yearTo;
        }else if(year){
          var dir = "/api/v1/oil?apikey="+apikey+"&limit="+item+"&offset="+item*(page-1)+"&from="+year+"&to="+yearTo;
        }else if (country){
          var dir = "/api/v1/oil/"+country+"?apikey="+apikey+"&limit="+item+"&offset="+item*(page-1)+"&from="+year+"&to="+yearTo;
        }else{
          dir = "/api/v1/oil?apikey="+apikey+"&limit="+item+"&offset="+item*(page-1)+"&from="+year+"&to="+yearTo;

        }
    }


      console.log(dir);

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
};
