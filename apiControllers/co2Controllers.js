var data = [];

module.exports.getData = function(req,res){
console.log("New GET of resource co2");
res.send(JSON.stringify(data));
}

module.exports.addCo2 = function (req,res){
var car = req.body;
data.push(car);
console.log("New co2 POST");
console.log("Object recived: "+JSON.stringify(req.body));
res.sendStatus(201);
}

module.exports.delete = function (req,res){
console.log("New co2 DELETE");
data = [];
res.sendStatus(200);
}

module.exports.initialData = function (req,res){
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

module.exports.getCo2 = function (req,res){
  var country = req.params.country;
  var car = [];
  var from = req.query.from;
  var to = req.query.to;
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
      equal=false;
      for(year=from;year<=to;year++){
        if(car[i].year==year){
          equal=true;
        }
      }
      if(!equal){
        car.splice(i,1);
      }
    }
  }

  if(car.length==0)
    res.sendStatus(404);
    else{
      res.send(JSON.stringify(car));
    }
}

module.exports.getCountryYear = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var car = [];
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

module.exports.update = function (req,res){
var country = req.params.country;
var year = req.params.year;
var updated = 0;
console.log("New PUT of resource co2 of "+country);
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

module.exports.deleteCo2 = function (req,res){
var country = req.params.country;
var year = req.params.year;
var removed = 0;
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
