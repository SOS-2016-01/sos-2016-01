  $(document).ready(function () {
      // prepare the data
      var url = "https://restcountries.eu/rest/v1/all";

      var source =
                {
                    datatype: "json",
                    datafields: [
                          { name: 'name' },
                          { name: 'capital' },
                          { name: 'region'}
                      ],
                    id: 'id',
                    url: url
                };
                var dataAdapter = new $.jqx.dataAdapter(source, {
                    downloadComplete: function (data, status, xhr) { },
                    loadComplete: function (data) { },
                    loadError: function (xhr, status, error) { }
      });

      console.log(dataAdapter);

      $("#jqxgrid").jqxGrid(
      {
          source: dataAdapter,
          columns: [
            { text: 'name', datafield: 'name'},
            { text: 'capital', datafield: 'capital'},
            { text: 'region', datafield: 'region'}
          ]
      });
  });
