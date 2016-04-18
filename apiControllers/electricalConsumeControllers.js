var data = [];
var key = "asmsfc";

module.exports.getData = function(req,res){
      var apikey = req.query.apikey;
      var aux=[];
      var ok=false;
      var limit = req.query.limit;
      var offset = req.query.offset;
      var from1 = req.query.from;
      var to = req.query.to;
        if(checkApiKey(apikey,res)){
            if(limit && offset && from1 && to){
                for(i=0;i<data.length;i++){
                    if(data[i].year>=from1 && data[i].year<=to){
                      aux.push(data[i]);
                    }
                }
                ok=true;
                aux = aux.slice(offset,data.length);
                aux = aux.slice(0,limit);
                console.log("New GET of resource electrical consume with limit is "
                +limit+", offset is "+offset+", from is "+from1+" and to is "+to);
          }else{
                if(limit && offset){
                      aux = limitAndOffset(limit,offset,data);
                      ok=true;
                  }if(from1 && to){
                      aux = fromAndto(from1,to,data);
                      ok=true;
                  }else if(from1){
                      aux = methodFrom(from1,data);
                      ok=true;
                  }else if(to){
                      aux = methodTo(to,data);
                      ok=true
                  }
          }
          if(ok==true){
                res.send(aux);
          }else{
                console.log("New GET of resource electrical consume");
                res.send(data);
          }
        }
}



module.exports.addElectricalConsume = function (req,res){
      var electricalConsume = req.body;
      var country=electricalConsume.country;
      var year=electricalConsume.year;
      var changedOK=true;
      var apikey = req.query.apikey;

      if(checkApiKey(apikey,res)){
            if(checkJSON(electricalConsume,res)){
                for(i=0;i<data.length;i++){
                    if(data[i].country==country && data[i].year==year){
                    res.sendStatus(409);
                    changedOK=false;
                    break;
                    }
                }
            if(changedOK){
                data.push(electricalConsume);
                console.log("New electrical consume POST");
                console.log("Object recived: "+JSON.stringify(req.body));
                res.sendStatus(201);
            }
          }
      }
}

module.exports.delete = function (req,res){
        var apikey = req.query.apikey;
        if(checkApiKey(apikey,res)){
                console.log("New electrical consume DELETE");
                data = [];
                res.sendStatus(200);
          }
}

module.exports.initialData = function (req,res){
      var apikey = req.query.apikey;
      if(checkApiKey(apikey,res)){
            console.log("New initial electrical consume data charge");
            data = [{country : "brazil",
                     year : "2006",
                     ePowerConsum : "2.044.859",
                     energyUse : "1168.43",
                     urbanPopulation : "158.552.239"},
                    {country : "brazil",
                     year : "2007",
                     ePowerConsum : "2.137.765",
                     energyUse : "1.221.362",
                     urbanPopulation : "163.117.673"},
                     {country : "brazil",
                      year : "2008",
                      ePowerConsum : "2,198,484",
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
}

module.exports.getElectricalConsume = function (req,res){
        var country = req.params.country;
        var year = req.params.year;
        var electricalConsume = [];
        var apikey = req.query.apikey;
        var limit = req.query.limit;
        var offset = req.query.offset;
        var from1 = req.query.from;
        var to = req.query.to;

        if(checkApiKey(apikey,res)){
              console.log("New GET of resource electrical consume of "+country);

              for(i=0;i<data.length;i++){
                    if(data[i].country == country){
                        electricalConsume.push(data[i]);
                    }
              }
              for(i=0;i<data.length;i++){
                    if(data[i].year == country){
                        electricalConsume.push(data[i]);
                    }
              }

             if(limit && offset){
                    electricalConsume = limitAndOffset(limit,offset,electricalConsume);
              }
              if(from1 && to){
                    electricalConsume = fromAndto(from1,to,electricalConsume);
              }else if(from1){
                    electricalConsume = methodFrom(from1,electricalConsume);
              }else if(to){
                    electricalConsume=methodTo(to,electricalConsume);
              }
              if(electricalConsume.length==0){
                res.sendStatus(404);
              }else{
                res.send(electricalConsume);
              }
        }
}

module.exports.getCountryYear = function (req,res){
      var country = req.params.country;
      var year = req.params.year;
      var electricalConsume = [];
      var apikey = req.query.apikey;
      if(checkApiKey(apikey,res)){
            console.log("New GET of resource electrical consume of "+country+" and year "+year);
            for(i=0;i<data.length;i++){
                  if(data[i].country === country && data[i].year == year){
                    electricalConsume.push(data[i]);
                  }
            }
            if(electricalConsume.length==0)
                res.sendStatus(404);
            else{
                res.send(electricalConsume);
            }
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
        if(checkApiKey(apikey,res)){
                if(checkJSON(electricalConsume,res)){
                      console.log("New PUT of resource electrical consume of "+country);
                      for(i=0;i<data.length;i++){
                            if(data[i].country == country && data[i].year==year){
                                if(data[i].country==req.body.country && data[i].year==req.body.year){
                                    data[i]=req.body;
                                    updated = true;
                                }else{
                                    res.sendStatus(400);
                                }
                                break;
                            }
                      }
                      if(!updated)
                          res.sendStatus(404);
                      else if(updated)
                          res.sendStatus(200);
                }
        }
}


module.exports.deleteElectricalConsume = function (req,res){
        var country = req.params.country;
        var year = req.params.year;
        var removed = false;
        var apikey = req.query.apikey;
        if(checkApiKey(apikey,res)){
              console.log("New electrical consume DELETE "+country);
              for(i=0;i<data.length;i++){
                    if(data[i].country == country && data[i].year==year){

                      data.splice(i,1);
                      removed =true;
                      break;
                    }
              }
              if(!removed)
                  res.sendStatus(404);
              else
                  res.sendStatus(200);
          }
}




//Funciones auxiliares

function limitAndOffset(limit,offset,array){
      var aux = [];
      aux = array.slice(offset,array.length);
      aux = aux.slice(0,limit);
      console.log("New GET of resource electrical consume with limit is "+limit+" and offset is "+offset);
      console.log(":)");
      return aux;
}

function fromAndto(from1,to,array){
      var aux = [];

      for(i=0;i<array.length;i++){
        if(array[i].year>=from1 && array[i].year<=to){
            aux.push(array[i]);
        }
      }

      console.log("New GET of resource electrical consume with from is "+from1+" and to is "+to);
      console.log(":)");
      return aux;

}

function methodFrom(from1,array){
      var aux = [];
      for(i=0;i<array.length;i++){
            if(array[i].year>=from1){
              aux.push(array[i]);
            }
          }
      console.log("New GET of resource electrical consume with from is "+from1);
      console.log(":)");
      return aux;
}

function methodTo(to,array){
      var aux=[];
      for(i=0;i<array.length;i++){
          if(array[i].year<=to){
            aux.push(array[i]);
          }
      }
      console.log("New GET of resource electrical consume with to is "+to);
      console.log(":)");
      return aux;
}

function checkApiKey(apikey,res){
      if(apikey && key===apikey)
          return true;
      else{
        res.sendStatus(401);
        console.log(":)");
        return false;
        }
}

function checkJSON(json,res){
      if(json.year && json.country && json.ePowerConsum
        && json.energyUse && json.urbanPopulation)
        return true;
      else{
        res.sendStatus(400);
        return false;
      }
}
