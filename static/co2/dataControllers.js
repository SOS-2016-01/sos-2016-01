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

function createData(){
  console.log("Handling create data");
  var apikey = $("#apikey").val();
  var country = $("#countryMod").val();
  var url = "/api/v1/co2";

  if(countrySearch)
    url = url+"/"+countrySearch;
  url = url +"?apikey="+apikey+"&limit="+items+"&offset="+items*(page-1)+"&from="+fromS+"&to="+to;

  var request = $.ajax({
    url:url,
    type:"GET",
    contentType : "application/json"
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
      $('<td class="data"></td>').html('<a href="#" onClick="deleteRow(this)"><i class="small material-icons">mode_edit</i><i class="small material-icons">delete</i></a>').appendTo(row);
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
