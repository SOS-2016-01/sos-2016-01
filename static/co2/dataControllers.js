function charge_pages(){
  var apikey = $("#apikey").val();
  var request = $.ajax({
    url:"/api/v1/co2?apikey="+apikey,
    type:"GET",
    contentType : "application/json"
  });

  request.done(function (data,jqXHR,status){
    console.log("Handling request (OK)");
    console.log("Status: "+jqXHR.status);
    console.log(data);
    var pages = data.length/$("#items").val();
    $(".pagesValues").remove();

    var select=$('#pages');

    for(i=1;i<pages+1;i++){
      $('<option class="pagesValues" value='+i+'></option>').text(i).appendTo(select);
    }
    select.appendTo("#inputPages");
    $('select').material_select();
  });

  request.always(function (jqXHR,status){
    if(status=="error"){
      console.log("Status: "+jqXHR.status);
    }
  });


}



$("body").ready(function (){
  console.log("jQuery Ready!");
  charge_pages();
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
      loadTable();
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
      loadTable();
    });

    request.always(function (jqXHR,status){
      if(status=="error"){
        $("#status").text(jqXHR.status + " " + jqXHR.statusText);
        console.log("Status: "+jqXHR.status);

      }
    });
  });



});

function createData(){
  console.log("Handling create data");
  var apikey = $("#apikey").val();
  var country = $("#countryMod").val();
  var year = $("#yearMod").val();
  var co2mtn = $("#co2mtnMod").val();
  var co2kg = $("#co2kgMod").val();
  var url = "/api/v1/co2?apikey="+apikey;

  if(country&&year&&co2mtn&&co2kg){
  var data = '{"country" : "'+country+'","year" : "'+year+'","co2mtn" : "'+co2mtn+'","co2kg" : "'+co2kg+'"}';
  var request = $.ajax({
      url:url,
      type:"POST",
      data:data,
      contentType : "application/json"
    });

  }
  else {
    alert("You have to enter all modify inputs");
  }
  request.done(function (data){
    console.log("Handling request (OK)");
    loadTable();
  });
  request.always(function (jqXHR,status){
    if(status=="error"){
      console.log("Status: "+jqXHR.status);
      if(jqXHR.status==401)
      alert("You entered a wrong APIkey");
      if(jqXHR.status==409)
      alert("You entered a existing data");
    }
  });

}

function deleteData(){
  console.log("Handling delete data");
  var apikey = $("#apikey").val();
  var country = $("#countryMod").val();
  var year = $("#yearMod").val();
  var url = "/api/v1/co2";

  if(country&&year){
  url = url + "/"+country+"/"+year+"?apikey="+apikey;
  var request = $.ajax({
      url:url,
      type:"DELETE",
      contentType : "application/json"
    });

  }
  else {
    alert("You have to enter year and country modify inputs");
  }
  request.done(function (data){
    console.log("Handling request (OK)");
    loadTable();
  });
  request.always(function (jqXHR,status){
    if(status=="error"){
      console.log("Status: "+jqXHR.status);
      if(jqXHR.status==401)
      alert("You entered a wrong APIkey");
      if(jqXHR.status==409)
      alert("You entered a wrong data");
      if(jqXHR.status==404)
      alert("You entered a non existing data to delete");
    }
  });

}

function updateData(){
  console.log("Handling update data");
  var apikey = $("#apikey").val();
  var country = $("#countryMod").val();
  var year = $("#yearMod").val();
  var co2mtn = $("#co2mtnMod").val();
  var co2kg = $("#co2kgMod").val();
  var url = "/api/v1/co2";

  if(country&&year&&co2mtn&&co2kg){
  var data = '{"country" : "'+country+'","year" : "'+year+'","co2mtn" : "'+co2mtn+'","co2kg" : "'+co2kg+'"}';
  url = url + "/"+country+"/"+year+"?apikey="+apikey;
  var request = $.ajax({
      url:url,
      type:"PUT",
      data:data,
      contentType : "application/json"
    });

  }
  else {
    alert("You have to enter all modify inputs");
  }
  request.done(function (data){
    console.log("Handling request (OK)");
    loadTable();
  });
  request.always(function (jqXHR,status){
    if(status=="error"){
      console.log("Status: "+jqXHR.status);
      if(jqXHR.status==401)
      alert("You entered a wrong APIkey");
      if(jqXHR.status==409)
      alert("You entered a wrong data");
      if(jqXHR.status==404)
      alert("You entered a non existing data to update");
    }
  });

}

function loadTable(){
  console.log("Handling load table");
  $( ".data" ).remove();
  var apikey = $("#apikey").val();
  var items = $("#items").val();
  var page = $("#page").val();
  var fromS = $("#from").val();
  var to = $("#to").val();
  var countrySearch = $("#countrySearch").val();
  var url = "/api/v1/co2";

  if(countrySearch)
    url = url+"/"+countrySearch;
  url = url +"?apikey="+apikey+"&limit="+items+"&offset="+items*(page-1)+"&from="+fromS+"&to="+to;

  var request = $.ajax({
    url:url,
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
      var clase = "data"+i;
      var row = $('<tr id='+clase+'></tr>').appendTo(mytable);
      $('<td class="data"></td>').text(data[i].country).appendTo(row);
      $('<td class="data"></td>').text(data[i].year).appendTo(row);
      $('<td class="data"></td>').text(data[i].co2mtn).appendTo(row);
      $('<td class="data"></td>').text(data[i].co2kg).appendTo(row);
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

function deleteRow(target){

			// Una vez terminada la request, se borra de la tabla.
      var r = window.confirm("Are you sure to delete this element?");

				if (r){
					// Borrado de la BD
          console.log($('#tt >tbody >tr').length);
          console.log("To delete: "+($))
				// Obtenemos Country y Year
				var tr = $("tbody")[2];
				var hijos = ($(tr).children());
				var country, year;
				var indice = getRowIndex(target);
				console.log(indice);
				country = $(hijos[indice]).children()[0];
				country = $(country).first().text();
				year = $(hijos[indice]).children()[1];
				year = $(year).first().text();

				console.log(country + " " + year);
				// Petición de Delete a la BD.
				var request = $.ajax({
					url: '/api/v2/co2/'+country+'/'+year,
					type: 'DELETE',
				});

}


}
