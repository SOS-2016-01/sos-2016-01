var data = [];

module.exports.getData = function(req,res){
console.log("New GET of resource oil");
res.send(JSON.stringify(data));
}

module.exports.addOil = function (req,res){
var oil = req.body;
data.push(oil);
console.log("New oil POST");
console.log("Object recived: "+JSON.stringify(req.body));
res.sendStatus(201);
}

module.exports.delete = function (req,res){
console.log("New oil DELETE");
data = [];
res.sendStatus(200);
}

module.exports.initialData = function (req,res){
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

module.exports.getOil = function (req,res){
  var country = req.params.country;
  var oil = [];
  var from = req.query.from;
  var to = req.query.to;
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

module.exports.getCountryYear = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var oil = [];
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

module.exports.update = function (req,res){
var country = req.params.country;
var year = req.params.year;
var updated = 0;
console.log("New PUT of resource oil of "+country);
for(i=0;i<data.length;i++){
  if(data[i].country == country && data[i].year==year){
    data[i]=req.body;
    updated = 1;
    break;
  }
}
if(updated==0)
  res.sendStatus(404);
else
  res.sendStatus(200);
}

module.exports.deleteOil = function (req,res){
var country = req.params.country;
var year = req.params.year;
var removed = 0;
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
