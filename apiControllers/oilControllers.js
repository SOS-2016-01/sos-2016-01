var data = [];
var key = "12345";

module.exports.getData = function(req,res){
var apikey = req.query.apikey;
var aux=[];
var aux1=false;
var limit = req.query.limit;
var offset = req.query.offset;
var from1 = req.query.from;
var to1 = req.query.to;
if(checkApiKey(apikey,res)){
  if(limit && offset && from1 && to1){
    for(i=0;i<data.length;i++){
        if(data[i].year>=from1 && data[i].year<=to1){
          aux.push(data[i]);
        }
    }
    aux1=true;
    aux = aux.slice(offset,data.length);
    aux = aux.slice(0,limit);
    console.log("New GET of resource oil with limit is "+limit+", offset is "+offset+", from is "+from1+" and to is "+to1);


}else{
  if(limit && offset){
        aux = limitAndOffset(limit,offset,data);
        aux1=true;
    }if(from1 && to1){
        aux = fromAndto(from1,to1,data);
        aux1=true;
    }else if(from1){
        aux = methodFrom(from1,data);
        aux1=true;
    }else if(to1){
        aux = methodTo(to1,data);
        aux1=true;
    }
    }

    if(aux1==true){
      res.send(JSON.stringify(aux));
    }else{
        console.log("New GET of resource oil");
        res.send(data);
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


module.exports.delete = function (req,res){
var apikey = req.query.apikey;
if(checkApiKey(apikey,res)){
  console.log("New oil DELETE");
  data = [];
  res.sendStatus(200);
    }
}

module.exports.initialData = function (req,res){
var apikey = req.query.apikey;
if(checkApiKey(apikey,res)){
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

      }
}

module.exports.getOil = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var oil = [];
  var from1 = req.query.from;
  var to1 = req.query.to;
  var apikey = req.query.apikey;
  var limit = req.query.limit;
  var offset = req.query.offset;

  if(checkApiKey(apikey,res)){
  console.log("New GET of resource oil of "+country);
  for(i=0;i<data.length;i++){
    if(data[i].country == country){
      oil.push(data[i]);
    }
  }
  for(i=0;i<data.length;i++){
    if(data[i].year == country){
      oil.push(data[i]);
    }
  }

  if(limit && offset){
         oil = limitAndOffset(limit,offset,oil);
   }
   if(from1 && to1){
         oil = fromAndto(from1,to1,oil);
   }else if(from1){
         oil = methodFrom(from1,oil);
   }else if(to1){
         oil=methodTo(to1,oil);
   }

      if(oil.length==0){
        res.sendStatus(404);
      }else{
        res.send(oil);
        }
    }
}

module.exports.getCountryYear = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var oil = [];
  var check = false;
  var apikey = req.query.apikey;
  if(checkApiKey(apikey,res)){
  console.log("New GET of resource oil of "+country+" and year "+year);
  for(i=0;i<data.length;i++){
    if(data[i].country === country && data[i].year == year){
      oil.push(data[i]);
      check = true;
    }
  }
  if (!check){
    res.sendStatus(400);
  }else if(oil.length==0){
    res.sendStatus(404);
  }else{
    res.send(oil);
    }
    }
}

module.exports.update = function (req,res){
var country = req.params.country;
var year = req.params.year;
var updated = false;
var sent = req.body;
var oil = req.body;
var apikey = req.query.apikey;
if(checkApiKey(apikey,res)){
  if(checkJSON(sent,res)){
      console.log("New PUT of resource oil of "+country);
  for(i=0;i<data.length;i++){
    if(data[i].country == country && data[i].year==year){
      if(data[i].country==sent.country && data[i].year==sent.year){
      data[i]=req.body;
      updated = true;
    }else{
      res.sendStatus(400);
    }
    break;
  }
  }
    if(!updated){
    res.sendStatus(404);
  }else{
        res.sendStatus(200);
      }
    }
  }
}

module.exports.deleteOil = function (req,res){
var country = req.params.country;
var year = req.params.year;
var removed = false;
var apikey = req.query.apikey;
if(checkApiKey(apikey,res)){
console.log("New oil DELETE "+country);
for(i=0;i<data.length;i++){
  if(data[i].country == country && data[i].year==year){
    data.splice(i,1);
    removed = true;
    break;
  }
}
if(!removed){
  res.sendStatus(404);
}else{
  res.sendStatus(200);
    }
  }
}


function limitAndOffset(limit,offset,array){
      var aux = [];
      aux = array.slice(offset,array.length);
      aux = aux.slice(0,limit);
      console.log("New GET of resource oil with limit is "+limit+" and offset is "+offset);
      return aux;
}

function fromAndto(from1,to1,array){
      var aux = [];

      for(i=0;i<array.length;i++){
        if(array[i].year>=from1 && array[i].year<=to1){
            aux.push(array[i]);
        }
      }

      console.log("New GET of resource oil with from is "+from1+" and to is "+to1);
      return aux;

}

function methodFrom(from1,array){
      var aux = [];
      for(i=0;i<array.length;i++){
            if(array[i].year>=from1){
              aux.push(array[i]);
            }
          }
      console.log("New GET of resource oil with from is "+from1);
      return aux;
}

function methodTo(to1,array){
      var aux=[];
      for(i=0;i<array.length;i++){
          if(array[i].year<=to1){
            aux.push(array[i]);
          }
      }
      console.log("New GET of resource oil with to is "+to1);
      return aux;
}

function checkApiKey(apikey,res){
      if(apikey && key===apikey){
          return true;
      }else{
        res.sendStatus(401);
        return false;
        }
}

function checkJSON(json,res){
      if(json.year && json.country && json.diesel && json.gasoline){
        return true;
      }else{
        res.sendStatus(400);
        return false;
      }
}
