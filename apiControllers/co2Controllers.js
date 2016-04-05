var data = [];
var key = "vdcgrc";

module.exports.getData = function(req,res){
var apikey = req.query.apikey;
var limit = req.query.limit;
var from = req.query.from;
var to = req.query.to;
var offset = req.query.offset;
var aux = [];
if(apikey && apikey===key){
  console.log("New GET of resource co2");
  if(from && to){
    for(i=0;i<data.length;i++){
        if(data[i].year>=from && data[i].year<=to){
          aux.push(data[i]);
        }
    }
  }else if (from){
    for(i=0;i<data.length;i++){
        if(data[i].year>=from){
            aux.push(data[i]);
      }
  }
  }else if (to){
  for(i=0;i<data.length;i++){
      if(data[i].year<=to){
        aux.push(data[i]);
    }
  }
} else {
  for(i=0;i<data.length;i++){
    aux.push(data[i]);
  }
}
  if(limit && offset){//Mirar
    aux = aux.slice(offset,data.length);
    aux = aux.slice(0,limit);
  }
  res.send(JSON.stringify(aux));
  }
else{
    res.sendStatus(401);
  }
}

module.exports.addCo2 = function (req,res){
var car = req.body;
var add = true;
var apikey = req.query.apikey;
  if(apikey===key){
    if(car.year && car.country && car.co2mtn && car.co2kg){
    for(i=0;i<data.length;i++){
      if(data[i].country === car.country && data[i].year == car.year){
        add = false;
      }
    }
    if(add){
        data.push(car);
        console.log("New co2 POST");
        console.log("Object recived: "+JSON.stringify(req.body));
        res.sendStatus(201);
      }
      else {
        res.sendStatus(409);
      }
    }
    else {
      res.sendStatus(400);
    }
  }
  else{
      res.sendStatus(401);
    }
}

module.exports.delete = function (req,res){
var apikey = req.query.apikey;
if(apikey && apikey===key){
  console.log("New co2 DELETE");
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
  console.log("New initial co2 data charge");
  data = [{country : "brazil",
         year : "2006",
         co2mtn : "1.8",
         co2kg : "158.153"},
        {country : "brazil",
         year : "2007",
         co2mtn : "1.9",
         co2kg : "151.823"},
        {country : "spain",
         year : "2006",
         co2mtn : "7.9",
         co2kg : "255.318"},
        {country : "spain",
         year : "2007",
         co2mtn : "7.9",
         co2kg : "241.441"},
        {country : "canada",
         year : "2006",
         co2mtn : "16.9",
         co2kg : "446.658"},
       {country : "canada",
        year : "2007",
        co2mtn : "17.1",
        co2kg : "434.705"}];
    res.sendStatus(200);
  }
  else {
    res.sendStatus(401);
  }
}

module.exports.getCo2 = function (req,res){
  var country = req.params.country;
  var car = [];
  var from = req.query.from;
  var to = req.query.to;
  var limit = req.query.limit;
  var offset = req.query.offset;
  var apikey = req.query.apikey;
  var aux = [];
  if(apikey && apikey===key){
    console.log("New GET of resource co2 of "+country);
    for(i=0;i<data.length;i++){
      if(data[i].country == country){
        car.push(data[i]);
      }
    }
    for(i=0;i<data.length;i++){
      if(data[i].year == country){
        car.push(data[i]);
      }
    }
    if(from && to){
      for(i=0;i<car.length;i++){
          if(car[i].year>=from && car[i].year<=to){
            aux.push(car[i]);
          }
      }
    }else if (from){
      for(i=0;i<car.length;i++){
          if(car[i].year>=from){
            aux.push(car[i]);
        }
    }
  }else if (to){
    for(i=0;i<car.length;i++){
        if(car[i].year<=to){
          aux.push(car[i]);
      }
    }
  }else{
    for(i=0;i<car.length;i++){
      aux.push(car[i]);
    }
  }
  if(limit && offset){
    aux = aux.slice(offset,data.length);
    aux = aux.slice(0,limit);
  }
    if(aux.length==0)
      res.sendStatus(404);
    else{
        res.send(JSON.stringify(aux));
      }
    }
  else {
    res.sendStatus(401);
  }
}
module.exports.getCountryYear = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var car = [];
  var apikey = req.query.apikey;
  if(apikey && apikey===key){
    console.log("New GET of resource co2 of "+country+" and year "+year);
    for(i=0;i<data.length;i++){
      if(data[i].country === country && data[i].year == year){
        car.push(data[i]);
      }
    }
    if(car.length==0)
      res.sendStatus(404);
    else{
        res.send(JSON.stringify(car));
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
  console.log("New PUT of resource co2 of "+country);
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
module.exports.deleteCo2 = function (req,res){
var country = req.params.country;
var year = req.params.year;
var removed = 0;
var apikey = req.query.apikey;
if(apikey && apikey===key){
  console.log("New co2 DELETE "+country);
  for(i=0;i<data.length;i++){
    if(data[i].country == country&&data[i].year==year){
      //delete cars[i];
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
