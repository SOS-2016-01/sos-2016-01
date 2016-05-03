$("body").ready(function (){
  var request = $.ajax({
    url:"/api/v1/co2?apikey=vdcgrc",
    type:"GET",
    contentType : "application/json"
  });

  request.done(function (data,jqXHR,status){
    var list;
    console.log("Handling request (OK)");
    console.log("Status: "+jqXHR.status);
    console.log(data);
    var years = [];
    var exist = false;
    var select=$('<select id="yearSel" onchange="drawRegionsMap()"></select>');
    $('<option value="" disabled selected></option>').text("Choose your option").appendTo(select);
    for (i=0;i<data.length;i++){
      for(x=0;x<years.length;x++){
        if(data[i].year==years[x])
          exist=true;
      }
      if(!exist)
        years.push(data[i].year);
      exist=false;
    }
    console.log("Años: "+years);
    for(i=0;i<years.length;i++){
      $('<option value='+years[i]+'></option>').text(years[i]).appendTo(select);
    }
    select.appendTo("#year");
    $('select').material_select();
  });

  request.always(function (jqXHR,status){
    if(status=="error"){
      console.log("Status: "+jqXHR.status);
    }
  });

});



  function drawRegionsMap() {
    var dataMap = [['Country',$(measure).val()]];

    var request = $.ajax({
      url:"/api/v1/co2?apikey=vdcgrc",
      type:"GET",
      contentType : "application/json"
    });

      request.done(function (data,jqXHR,status){
        for(i=0;i<data.length;i++){
          if(data[i].year==$("#yearSel").val()){
            if($("#measure").val()=="co2mtn")
              dataMap.push([data[i].country, Number(data[i].co2mtn)]);
            else
              dataMap.push([data[i].country, Number(data[i].co2kg)]);
          }
        }
        console.log("Data to google: "+dataMap);
        var dataGoogle = google.visualization.arrayToDataTable(dataMap);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));

        chart.draw(dataGoogle, options);
      });

      request.always(function (jqXHR,status){});


  }
