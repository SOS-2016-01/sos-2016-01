var data = [];
var key = "12345";

module.exports.getData = function(req,res){
var apikey = req.query.apikey;
var aux=[];
var aux1=false;
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
    aux1=true;
    aux = aux.slice(offset,data.length);
    aux = aux.slice(0,limit);
    console.log("New GET of resource oil with limit is "+limit+",
    offset is "+offset+", from is "+from1+" and to is "+to);


}else{
  if(limit && offset){
        aux = limitAndOffset(limit,offset,data);
        aux1=true;
    }if(from1 && to){
        aux = fromAndto(from1,to,data);
        aux1=true;
    }else if(from1){
        aux = methodFrom(from1,data);
        aux1=true;
    }else if(to){
        aux = methodTo(to,data);
        aux1=true
    }
    }

    if(aux1==true){
      res.send(aux);
    }else{
        console.log("New GET of resource oil");
        res.send(JSON.stringify(data));
      }
    }
}

module.exports.addOil = function (req,res){
var oil = req.body;
var add = true;
var country=oil.country;
var year=oil.year;
var apikey = req.query.apikey;

if(checkApiKey(apikey,res)){
  if(checkJSON(oil,res)){
  for(i=0;i<data.length;i++){
    if(data[i].country == country && data[i].year == year){
      res.sendStatus(409);
      add = false;
      break;
    }
  }
  if(add){
      data.push(oil);
      console.log("New oil POST");
      console.log("Object recived: "+JSON.stringify(req.body));
      res.sendStatus(201);
    }
  }
  }
}

//Aquiiiiiiiiii

module.exports.delete = function (req,res){
var apikey = req.query.apikey;
if(apikey && apikey===key){
  console.log("New oil DELETE");
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
console.log("New initial oil data charge");
data = [{country : "brazil",
         year : "2006",
         diesel : "0.8",
         gasoline : "0.9"},
        {country : "brazil",
         year : "2007",
         diesel : "1.3",
         gasoline : "1.3"},
        {country : "spain",
         year : "2006",
         diesel : "0.7",
         gasoline : "0.7"},
        {country : "spain",
         year : "2007",
         diesel : "1.1",
         gasoline : "1.2"},
        {country : "canada",
         year : "2006",
         diesel : "0.8",
         gasoline : "0.6"},
       {country : "canada",
        year : "2007",
        diesel : "1.3",
        gasoline : "0.8"}];
        res.sendStatus(200);
}else {
  res.sendStatus(401);
}
}

module.exports.getOil = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var oil = [];
  var s1 = [];
  var aux1 = false;
  var aux2 = false;
  var from1 = req.query.from;
  var to1 = req.query.to;
  var apikey = req.query.apikey;
  var limit = req.query.limit;
  var offset = req.query.offset;

  if(apikey && apikey===key){
  console.log("New GET of resource oil of "+country);
  for(i=0;i<data.length;i++){
    if(data[i].country == country){
      oil.push(data[i]);
      aux1=true;
    }
  }
  for(i=0;i<data.length;i++){
    if(data[i].year == country){
      oil.push(data[i]);
      aux1=true;
    }
  }
  if(limit && offset){
     if(oil.length!=0){
       oil = oil.slice(offset,oil.length);
       oil = oil.slice(0,limit);
       console.log("New GET of resource oil with limit is "+limit+" and offset is "+offset);
       aux=true;
     }
   }

  if(from1 && to){
    for(i=0;i<oil.length;i++){
      if(oil[i].year>=from1 && oil[i].year<=to){
        aux.push(oil[i]);
      }
  }
  console.log("New GET of resource oil with from is "+from1+" and to is "+to);
  aux2 =true;
    }else if(from1){
      for(i=0;i<oil.length;i++){
            if(oil[i].year>=from1){
              aux.push(oil[i]);
            }
          }
  }else if(to1){
    for(i=0;i<oil.length;i++){
        if(oil[i].year<=to1){
          aux.push(oil[i]);
        }
    }
    console.log("New GET of resource oil with to is "+to);
    aux2=true;
  }

      if(oil.length==0){
        res.sendStatus(404);
      }else if(aux2){
        res.send(s1);
      }else{
        res.send(oil);
      }

  }else{
    res.sendStatus(401);
  }

}

module.exports.getCountryYear = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var oil = [];
  var apikey = req.query.apikey;
  if(apikey && apikey===key){
  console.log("New GET of resource oil of "+country+" and year "+year);
  for(i=0;i<data.length;i++){
    if(data[i].country === country && data[i].year == year){
      oil.push(data[i]);
    }
  }
  if(oil.length==0)
    res.sendStatus(404);
  else{
    res.send(JSON.stringify(oil));
  }
}
else{
  res.sendStatus(401);
}
}

module.exports.update = function (req,res){
var country = req.params.country;
var year = req.params.year;
var updated = false;
var badRequest = false;
var sent = req.body;
var apikey = req.query.apikey;
if(apikey && apikey===key){
console.log("New PUT of resource oil of "+country);
for(i=0;i<data.length;i++){
  if(data[i].country == country && data[i].year==year){
    if(data[i].country==sent.country && data[i].year==sent.year){
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
}
else {
res.sendStatus(401);
}
}

module.exports.deleteOil = function (req,res){
var country = req.params.country;
var year = req.params.year;
var removed = 0;
var apikey = req.query.apikey;
if(apikey && apikey===key){
console.log("New oil DELETE "+country);
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
