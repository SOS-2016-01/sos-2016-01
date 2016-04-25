
  console.log("Handling request");

  var request = $.ajax({
    url:"/api/v1/oil?apikey=12345",
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
      $('<td></td>').text(data[i].diesel).appendTo(row);
      $('<td></td>').text(data[i].gasoline).appendTo(row);
    }
    console.log("TTTTT:"+mytable.html());
    mytable.appendTo("#t1");

  });

  request.always(function (jqXHR,status){
    if(status=="error")
      console.log("Status: "+jqXHR.status);
  });

  $(document).ready(function (data) {
      // prepare the data
      var url = "/api/v1/oil?apikey=12345";
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
