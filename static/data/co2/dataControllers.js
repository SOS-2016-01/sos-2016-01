$("body").ready(function (){
  console.log("jQuery Ready!");
  $("#load").click(function(){
    console.log("Handling click on load data");

    var apikey = $("#apikey").val();
    console.log("Apikey handled: "+apikey)
    var request = $.ajax({
      url:"/api/v1/co2?apikey="+apikey,
      type:"GET",
      contentType : "application/json"
    });

    request.done(function (data,jqXHR,status){
      var list;
      console.log("Handling request (OK)");
      console.log("Data received: ");
      console.log(data);
      $("#log").text("");
      $("#data").text("");
      $("#status").text("");
      $("#list").text("");
      $("#data").text(JSON.stringify(data));
      dataToHtml(data);
      console.log("Status: "+jqXHR.status);
    });

    request.always(function (jqXHR,status){
      $("#status").text(status);
      if(status=="error"){
        $("#status").text(jqXHR.status + " " + jqXHR.statusText);
        console.log("Status: "+jqXHR.status);
        $("#data").text("");
        $("#list").text("");
      }
    });
    function dataToHtml(data){
      mylist = $('<ul></ul>')
      if(data[0].co2kg){
      for (i=0;i<data.length;i++){
          $('<li></li>').text("Country="+data[i].country+", Year="+data[i].year+", co2mtn="+data[i].co2mtn+", co2kg="+data[i].co2kg).appendTo(mylist);
        }
      }
      else if(data[0].diesel){
        for (i=0;i<data.length;i++){
        $('<li></li>').text("Country="+data[i].country+", Year="+data[i].year+", diesel="+data[i].diesel+", gasoline="+data[i].gasoline).appendTo(mylist);
        }
      }
      else if(data[0].ePowerConsum){
        for (i=0;i<data.length;i++){
        $('<li></li>').text("Country="+data[i].country+", Year="+data[i].year+", ePowerConsum="+data[i].ePowerConsum+", energyUse="+data[i].energyUse+", urbanPopulation="+data[i].urbanPopulation).appendTo(mylist);
        }
      }
      console.log("List:"+mylist.html());
      mylist.appendTo("#list");
    }
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
      $('#tt').datagrid({
        title:'Co2 DataGrid',
        //iconCls:'icon-edit',
        width:450,
        cache:false,
        singleSelect:true,
        pagination:true,
        //idField:'itemid',
        url:'/api/v1/co2?apikey=vdcgrc',
        method: 'GET',
        columns:[[
          {field:'country',title:'Country',width:86,align:'center',editor:'text'},
          {field:'year',title:'Year',width:80,align:'center',editor:'numberbox'},
          {field:'co2mtn',title:'CO2 MTN',width:80,align:'center',editor:'numberbox'},
          {field:'co2kg',title:'CO2 KG',width:80,align:'center',editor:'numberbox'},
          {field:'action',title:'Action',width:90,align:'center',
            formatter:function(value,row,index){
              if (row.editing){
                var s = '<a href="#" >Save</a> ';
                var c = '<a href="#" >Cancel</a>';
                return s+c;
              } else {
                var e = '<a href="#" ><span class="icon-pencil">Editar</span></a> ';
                var d = '<a href="#" onclick="deleterow(this)">Eliminar<span class="icon-cross"></span></a>';
                return e+d;
              }
            }
          }
        ]],

        onLoadSuccess:function(data) {
            var tr = $("tbody")[3];
            var hijos = ($(tr).children());
            for(var i = 0; i < hijos.length; i++){
              var country = $(hijos[i]).children()[0];
              country = $(country).first().text();
              var year = $(hijos[i]).children()[1];
              year = $(year).first().text();
              var temp3 = $(hijos[i]).children()[3];
              var divDeEnlaces = $(temp3).first().children()[0];
              var enlaceEditar = $(divDeEnlaces).children()[0];
              console.log(enlaceEditar);
              var enlaceBorrar = $(divDeEnlaces).children()[1];
              console.log(enlaceBorrar);
              $(enlaceEditar).attr('href', 'editResourceCo.html?country='+country+'&year='+year);
              //$(enlaceBorrar).attr('href', 'deleteResource.html?country='+country+'&year='+year);
            }
        },
         onBeforeEdit:function(index,row){
            row.editing = true;
            updateActions(index);
         },
        onAfterEdit:function(index,row){
            row.editing = false;
            updateActions(index);
        },
        onCancelEdit:function(index,row){
            row.editing = false;
            updateActions(index);
        }
      });
    };
    function updateActions(index){
      $('#tt').datagrid('updateRow',{
        index: index,
        row:{}
      });
    }
    function getRowIndex(target){
      var tr = $(target).closest('tr.datagrid-row');
      var trcolum = $(tr).first();
      console.log(trcolum);
      return parseInt(tr.attr('datagrid-row-index'));
    }
    function editrow(target){
      $('#tt').datagrid('beginEdit', getRowIndex(target));
      console.log(getRowIndex(target));
    }
    function deleterow(target){

      // Una vez terminada la request, se borra de la tabla.
      var win= $.messager.confirm('Confirm','Are you sure?',function(r){
        if (r){
          // Borrado de la BD

        // Obtenemos Country y Year
        var tr = $("tbody")[3];
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
          url: '/api/v1/co2/'+country+'/'+year+"?apikey=vdcgrc",
          type: 'DELETE',
        });

        request.done(function(data, status, jqXHR){
          if(data != ""){
            //data = '[{"country": "spain"}, {"country": "portugal"}]';
            $("#data").text(data);
            var parsedData = $.parseJSON(data);
             $("#list").empty();

             if(Array.isArray(parsedData)){
               for(var i in parsedData){

                 var dump = "";
                 var obj = parsedData[i];
                 for(var prop in obj){
                   dump += "[" + prop + " = " + obj[prop] + "]";
                 }
                 $("#list").append("<li>"+dump+"</li>");
               }
             }else{
              var dump = "";
              var obj = parsedData;
              for(var prop in obj){
                dump += "[" + prop + " = " + obj[prop] + "]";
              }
             }
          }else{
            $("#list").empty();
            $("#data").empty();
          }
        });

        request.always(function(jqXHR, status){
          if(status == "error"){
            $("#status").text(jqXHR.status);
            $("#list").empty();
            $("#data").empty();
          }else{
            $("#status").text("200 OK");
            console.log("Done!");
          }
          $("#log").text("Done! ");
        });

            $('#tt').datagrid('deleteRow', getRowIndex(target));
          }
        });
        win.window('move',{
          top:100
          });

    }
    function saverow(target){
      $('#tt').datagrid('endEdit', getRowIndex(target));
    }
    function cancelrow(target){
      $('#tt').datagrid('cancelEdit', getRowIndex(target));
    }
