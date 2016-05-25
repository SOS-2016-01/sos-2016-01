  // 
  // console.log("Handling request");
  //
  // var request = $.ajax({
  //   url:"https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse",
  //   type:"GET"
  // });
  // request.done(function (data){
  //   console.log("Handling request (OK)");
  //   console.log("Data received: ");
  //   console.log(JSON.stringify(data));
  //   //array = JSON.parse(data);
  //   mytable = $('<tbody></tbody>')
  //   for (i=0;i<data.length;i++){
  //     var row = $('<tr></tr>').appendTo(mytable);
  //     $('<td></td>').text(data[i].title).appendTo(row);
  //     $('<td></td>').text(data[i].listPrice.amount).appendTo(row);
  //   }
  //   console.log("TTTTT:"+mytable.html());
  //   mytable.appendTo("#t1");
  //
  // });
  //
  // request.always(function (jqXHR,status){
  //   if(status=="error")
  //     console.log("Status: "+jqXHR.status);
  // });

  $(document).ready(function () {
      // prepare the data
      var url = "/ajax/services/feed/find?v=1.0&q=Official%20Google%20Blogs";

      var source =
                {
                    datatype: "json",
                    datafields: [
                          { name: 'url' },
                          { name: 'title' },
                          { name: 'contentSnippet'},
                          { name: 'link' }
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
            { text: 'url', datafield: 'url'},
            { text: 'title', datafield: 'title'},
            { text: 'contentSnippet', datafield: 'contentSnippet'},
            { text: 'link', datafield: 'link'}
          ]
      });
  });
