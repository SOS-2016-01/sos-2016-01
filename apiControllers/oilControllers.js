var data = [];
var key = "12345";

module.exports.getData = function(req,res){
var apikey = req.query.apikey;
if(apikey && apikey===key){
  console.log("New GET of resource co2");
  res.send(JSON.stringify(data));
  }
else{
    res.sendStatus(401);
  }
}

module.exports.addOil = function (req,res){
var oil = req.body;
var add = true;
var apikey = req.query.apikey;
if(apikey===key){
  if(oil.year && oil.country && oil.diesel && oil.gasoline){
  for(i=0;i<data.length;i++){
    if(data[i].country === oil.country && data[i].year == oil.year){
      add = false;
    }
  }
  if(add){
      data.push(oil);
      console.log("New oil POST");
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
  var oil = [];
  var from = req.query.from;
  var to = req.query.to;
  var apikey = req.query.apikey;
  if(apikey && apikey===key){
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
  if(from && to){
    for(i=0;i<oil.length;i++){
      equal=false;
      for(year=from;year<=to;year++){
        if(oil[i].year==year){
          equal=true;
        }
      }
      if(!equal){
        oil.splice(i,1);
      }
    }
  }

  if(oil.length==0)
    res.sendStatus(404);
    else{
      res.send(JSON.stringify(oil));
    }
}
else {
  res.sendStatus(401);
}
}

module.exports.getCountryYear = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var country1 = req.query.country;
  var year1 = req.query.year;
  var oil = [];
  var apikey = req.query.apikey;
  if(apikey && apikey===key){
  console.log("New GET of resource oil of "+country+" and year "+year);
  for(i=0;i<data.length;i++){
    if(data[i].country === country || data[i].country === country1
          && data[i].year == year || data[i].year == year){
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
