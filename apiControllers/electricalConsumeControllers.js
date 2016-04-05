var data = [];
var key = "asmsfc";

module.exports.getData = function(req,res){
var apikey = req.query.apikey;
var aux=[];
var ok=false;
//Paginacion
var limit = req.query.limit;
var offset = req.query.offset;
//Busqueda
var from1 = req.query.from;
var to = req.query.to;
  if(apikey && apikey===key){
    //Busqueda y paginacion
    if(limit && offset && from1 && to){
      for(i=0;i<data.length;i++){
          if(data[i].year>=from1 && data[i].year<=to){
            aux.push(data[i]);
          }
      }
      ok=true;
      aux = aux.slice(offset,data.length);
      aux = aux.slice(0,limit);
      console.log("New GET of resource electrical consume with limit is "+limit+", offset is "+offset+", from is "+from1+" and to is "+to);


  }else{
    if(limit && offset){
        aux = data.slice(offset,data.length);
        aux = aux.slice(0,limit);
        console.log("New GET of resource electrical consume with limit is "+limit+" and offset is "+offset);
        ok=true;
        //Busqueda from y to
      }
      if(from1 && to){
        for(i=0;i<data.length;i++){
            if(data[i].year>=from1 && data[i].year<=to){
              aux.push(data[i]);
            }
        }
        console.log("New GET of resource electrical consume with from is "+from1+" and to is "+to);
        ok=true;
        //Busqueda from
      }else if(from1){
        for(i=0;i<data.length;i++){
              if(data[i].year>=from1){
                aux.push(data[i]);
              }
            }
        console.log("New GET of resource electrical consume with from is "+from1);
        ok=true;
        //Busqueda con to
      }else if(to){
        for(i=0;i<data.length;i++){
            if(data[i].year<=to){
              aux.push(data[i]);
            }
        }
        console.log("New GET of resource electrical consume with to is "+to);
        ok=true
      }
}
      if(ok==true){
        res.send(aux);
      }else{
  console.log("New GET of resource electrical consume");
  res.send(JSON.stringify(data));
}

}else{
res.sendStatus(401);
}
}


module.exports.addElectricalConsume = function (req,res){

  var electricalConsume = req.body;
  var country=electricalConsume.country;
  var year=electricalConsume.year;
  var change=0;
  var apikey = req.query.apikey;
  if(apikey && apikey===key){
  if(electricalConsume.year && electricalConsume.country && electricalConsume.ePowerConsum
    && electricalConsume.energyUse && electricalConsume.urbanPopulation){
  for(i=0;i<data.length;i++){


    if(data[i].country==country && data[i].year==year){
      res.sendStatus(409);
      change=1;
      break;
    }
  }
  if(change==0){
  data.push(electricalConsume);
  console.log("New electrical consume POST");
  console.log("Object recived: "+JSON.stringify(req.body));
  res.sendStatus(201);
  }
}else{
  res.sendStatus(400);
}
}else{
    res.sendStatus(401);
  }

}

module.exports.delete = function (req,res){
var apikey = req.query.apikey;
if(apikey && apikey===key){
  console.log("New electrical consume DELETE");
  data = [];
  res.sendStatus(200);
  }
else{
  res.sendStatus(401);
  }
}

module.exports.initialData = function (req,res){
var apikey = req.query.apikey;
if(apikey && apikey===key){
  console.log("New initial electrical consume data charge");
  data = [{country : "brazil",
           year : "2006",
           ePowerConsum : "2.044.859",
           energyUse : "1168.43",
           urbanPopulation : "158.552.239"},
          {country : "brazil",
           year : "2007",
           co2mtn : "cambiar",
           energyUse : "1276,27",
           urbanPopulation : "163117673"},
           {country : "brazil",
            year : "2008",
            co2mtn : "2,198,484",
            energyUse : "1276,27",
            urbanPopulation : "163117673"},
          {country : "spain",
           year : "2006",
           ePowerConsum : "6.105.076",
           energyUse : "3.194.081",
           urbanPopulation : "34.408.810"},
          {country : "spain",
           year : "2007",
           ePowerConsum : "6.054.374",
           energyUse : "3.180.033",
           urbanPopulation : "35.159.317"},
          {country : "canada",
           year : "2006",
           ePowerConsum : "3.237.216",
           energyUse : "8.355.173",
           urbanPopulation : "26.125.779"},
         {country : "canada",
          year : "2007",
          ePowerConsum : "3.353.156",
          energyUse : "8.076.398",
          urbanPopulation : "26.440.579"}];
    res.sendStatus(200);
  }
  else {
    res.sendStatus(401);
  }
}

module.exports.getElectricalConsume = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var electricalConsume = [];
  var apikey = req.query.apikey;
  var ok = false;
  var okb = false;
  var oks=false;
  var aux=[];
  //PAginacion
  var limit = req.query.limit;
  var offset = req.query.offset;
  //Busqueda
  var from1 = req.query.from;
  var to = req.query.to;

  if(apikey && apikey===key){
    console.log("New GET of resource electrical consume of "+country);
    //Busca pais
    for(i=0;i<data.length;i++){
      if(data[i].country == country){
       electricalConsume.push(data[i]);
       ok=true;
      }
    }
    //Busca año
    for(i=0;i<data.length;i++){
      if(data[i].year == country){ //
        electricalConsume.push(data[i]);
        ok=true;
      }
    }
  /*  if(limit && offset && from1 && to){
      for(i=0;i<electricalConsume.length;i++){
          if(electricalConsume[i].year>=from1 && electricalConsume[i].year<=to){
            aux.push(electricalConsume[i]);
          }
      }
      okb=true;
      aux = aux.slice(offset,data.length);
      aux = aux.slice(0,limit);
      console.log("New GET of resource electrical consume with limit is "+limit+", offset is "+offset+", from is "+from1+" and to is "+to);


    }else{
*/








    //Pagincion
   if(limit && offset){
      if(electricalConsume.length!=0){
        electricalConsume = electricalConsume.slice(offset,electricalConsume.length);
        electricalConsume = electricalConsume.slice(0,limit);
        console.log("New GET of resource electrical consume with limit is "+limit+" and offset is "+offset);
        //res.send(aux);
        ok=true;
      }
    }
   //Busqueda
    if(from1 && to){
      for(i=0;i<electricalConsume.length;i++){
          if(electricalConsume[i].year>=from1 && electricalConsume[i].year<=to){
            aux.push(electricalConsume[i]);
          }
      }
      console.log("New GET of resource electrical consume with from is "+from1+" and to is "+to);
      okb=true;
      //Busqueda from
    }else if(from1){
      for(i=0;i<electricalConsume.length;i++){
            if(electricalConsume[i].year>=from1){
              aux.push(electricalConsume[i]);
            }
          }
      console.log("New GET of resource electrical consume with from is "+from1);
      okb=true;
    }else if(to){
      for(i=0;i<electricalConsume.length;i++){
          if(electricalConsume[i].year<=to){
            aux.push(electricalConsume[i]);
          }
      }
      console.log("New GET of resource electrical consume with to is "+to);
      okb=true;
    }
//}
    if(electricalConsume.length==0){
      res.sendStatus(404);
    }else if(okb){
      res.send(aux);
    }else{
      res.send(electricalConsume);
    }

}else{
  res.sendStatus(401);
}
}




module.exports.getCountryYear = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var electricalConsume = [];
  var apikey = req.query.apikey;
  if(apikey && apikey===key){
    console.log("New GET of resource electrical consume of "+country+" and year "+year);
    for(i=0;i<data.length;i++){
      if(data[i].country === country && data[i].year == year){
        electricalConsume.push(data[i]);
      }
    }
    if(electricalConsume.length==0)
      res.sendStatus(404);
    else{
        res.send(JSON.stringify(electricalConsume));
      }
  }
  else{
    res.sendStatus(401);
  }
}

module.exports.update = function (req,res){
var country = req.params.country;
var year = req.params.year;
var electricalConsume = req.body;
var updated = false;
var badRequest = false;
var sent = req.body;
var apikey = req.query.apikey;
if(apikey && apikey===key){
  if(electricalConsume.year && electricalConsume.country && electricalConsume.ePowerConsum
    && electricalConsume.energyUse && electricalConsume.urbanPopulation){
  console.log("New PUT of resource electrical consume of "+country);
  for(i=0;i<data.length;i++){
    if(data[i].country == country && data[i].year==year){
        if(data[i].country==req.body.country && data[i].year==req.body.year){
      data[i]=req.body;
      updated = true;
      }
      else{
        res.sendStatus(400);
        badRequest = true;
      }
      break;
    }
  }
  if(!updated && !badRequest)
    res.sendStatus(404);
  else if(updated)
    res.sendStatus(200);
  }else{
    res.sendStatus(400);
  }

  }else {
    res.sendStatus(401);
  }
}
module.exports.deleteElectricalConsume = function (req,res){
var country = req.params.country;
var year = req.params.year;
var removed = 0;
var apikey = req.query.apikey;
if(apikey && apikey===key){
  console.log("New electrical consume DELETE "+country);
  for(i=0;i<data.length;i++){
    if(data[i].country == country&&data[i].year==year){

      data.splice(i,1);
      removed =1;
      break;
    }
  }
  if(removed==0)
    res.sendStatus(404);
  else
    res.sendStatus(200);
  }
  else {
    res.sendStatus(401);
  }
}
