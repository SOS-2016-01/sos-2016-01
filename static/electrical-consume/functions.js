$("body").ready(function (){
  console.log("jQuery Ready!");


  $("#loadInitialData").click(function(){
        console.log("Handling click on load data");

        var apikey = $("#apikey").val();
        console.log("Apikey handled: "+apikey)
        var request = $.ajax({
            url:"/api/v1/electrical-consume/loadInitialData?apikey="+apikey,
            type:"GET",
            contentType : "application/json"
        });

        request.done(function (data,jqXHR,status){
            $("#t1").find("tr:gt(0)").remove();
            table("");
            console.log("Handling request (OK)");
            console.log("Status: "+jqXHR.status);
        });

        request.always(function (jqXHR,status){
            if(status=="error" && jqXHR.status==401){
              console.log("Status: "+jqXHR.status);
              alertify.alert("Incorrect apikey");
            }
        });
  });

  $("#deleteAll").click(function(){
        var apikey = $("#apikey").val();

        var request = $.ajax({
            url:"/api/v1/electrical-consume?apikey="+apikey,
            type:"DELETE"
        });

        request.done(function (data){
            console.log("Handling request (OK)");
            $("#t1").find("tr:gt(0)").remove();
            table("");
        });

        request.always(function (){
            if(status=="error"){
              console.log("Status: "+jqXHR.status);
            }
        });
    });

    $("#deleteItem").click(function(){
        var apikey = $("#apikey").val();
        var country = $("#country").val();
        var year = $("#year").val();
        if(country && year){

        var request = $.ajax({
            url:"/api/v1/electrical-consume/"+country+"/"+year+"?apikey="+apikey,
            type:"DELETE"
        });

        request.done(function (data){
            console.log("Handling request (OK)");
            $("#t1").find("tr:gt(0)").remove();
            table("");

        });

        request.always(function (jqXHR,status){
            if(status=="error"){
              console.log("Status: "+jqXHR.status);
            }
        });
      }//poner emergente
    });


    $("#search").click(function(){
            console.log("Handling click");
            var apikey = $("#apikey").val();
            var country = $("#country").val();
            var year = $("#year").val();
            items = $("#items").val();
            page = $("#page").val();
            var url="";

            if(country && year){
              url = "/api/v1/electrical-consume/"+country+"/"+year+"?apikey="+apikey;
            }else if(year){
              url = "/api/v1/electrical-consume/"+year+"?apikey="+apikey;
            }else if (country){
              url = "/api/v1/electrical-consume/"+country+"?apikey="+apikey;
            }

            var request = $.ajax({
              url:"/api/v1/electrical-consume?apikey="+apikey,
              type:"GET"
            });

            request.done(function (data){
              console.log("Handling request (OK)");
              $("#t1").find("tr:gt(0)").remove();
              table(url);
            });

            request.always(function (jqXHR,status){
              if(status=="error"){
                console.log("Status: "+jqXHR.status);
              }
            });
          });


      $("#createB").click(function(){
            var apikey = $("#apikey").val();
            var country = $("#countryCr").val();
            var year = $("#yearCr").val();
            var ePowerConsum = $("#ePowerConsum").val();
            var energyUse = $("#energyUse").val();
            var urbanPopulation = $("#urbanPopulation").val();
            var url = "";

           if(country && year && ePowerConsum && energyUse && urbanPopulation){

            var request = $.ajax({
                url:"/api/v1/electrical-consume?apikey="+apikey,
                type:"POST",
                data: '{"country":"'+country+'","year":'+year+',"ePowerConsum":'+ePowerConsum+',"energyUse":'+energyUse+',"urbanPopulation":'+urbanPopulation+'}',
                contentType : "application/json"
            });

            request.done(function (data){
                console.log("Handling request (OK)");
                $("#t1").find("tr:gt(0)").remove();
                table("");
            });

            request.always(function (jqXHR,status){
                if(status=="error" && jqXHR.status==409){
                  console.log("Status: "+jqXHR.status);
                  alertify.alert("Resource already exists");
                }
            });
            }//emergente
    });

    $("#update").click(function(){
          var apikey = $("#apikey").val();
          var country = $("#countryCr").val();
          var year = $("#yearCr").val();
          var ePowerConsum = $("#ePowerConsum").val();
          var energyUse = $("#energyUse").val();
          var urbanPopulation = $("#urbanPopulation").val();
          var url = "";

          if(country && year && ePowerConsum && energyUse && urbanPopulation){
          var request = $.ajax({
            url:"/api/v1/electrical-consume/"+country+"/"+year+"?apikey="+apikey,
            type:"PUT",
            data: '{"country":"'+country+'","year":'+year+',"ePowerConsum":'+ePowerConsum+',"energyUse":'+energyUse+',"urbanPopulation":'+urbanPopulation+'}',
            contentType : "application/json"
          });

          request.done(function (data){
            console.log("Handling request (OK)");
            $("#t1").find("tr:gt(0)").remove();
            table("");
          });

          request.always(function (jqXHR,status){
            if(status=="error"){
              console.log("Status: "+jqXHR.status);
            }
          });
        }//emergente
    });




  });



function table(url){
  console.log("Handling load table");
  console.log(url);
  $("#t1").find("tr:gt(0)").remove();
  var apikey = $("#apikey").val();
  items = $("#items").val();
  page = $("#page").val();
  var country = $("#country").val();
  var year = $("#year").val();

  if(country && year){
    url = "/api/v1/electrical-consume/"+country+"/"+year+"?apikey="+apikey+"&limit="+items+"&offset="+items*(page-1);
  }else if(year){
    url = "/api/v1/electrical-consume/"+year+"?apikey="+apikey+"&limit="+items+"&offset="+items*(page-1);
  }else if (country){
    url = "/api/v1/electrical-consume/"+country+"?apikey="+apikey+"&limit="+items+"&offset="+items*(page-1);
  }



  if(url=="" || url==undefined){
    url="/api/v1/electrical-consume?apikey="+apikey+"&limit="+items+"&offset="+items*(page-1);
    console.log(url);
  }

  var request = $.ajax({
    url:url,
    type:"GET",
    contentType : "application/json"
  });
  request.done(function (data){
    console.log("Handling request (OK)");
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
}
