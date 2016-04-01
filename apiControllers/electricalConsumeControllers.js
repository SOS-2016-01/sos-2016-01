var data = [];

module.exports.getData = function(req,res){
console.log("New GET of resource electrical consume");
res.send(JSON.stringify(data));
}

module.exports.addElectricalConsume = function (req,res){

  var electricalConsume = req.body;
  var country=electricalConsume.country;
  var year=electricalConsume.year;
  var change=0;

  for(i=0;i<data.length;i++){


    if(data[i].country==country && data[i].year==year){
      res.sendStatus(409);
      change=1
      break;
    }
  }
  if(change==0){
  data.push(electricalConsume);
  console.log("New electrical consume POST");
  console.log("Object recived: "+JSON.stringify(req.body));
  res.sendStatus(201);
  }

}

module.exports.delete = function (req,res){
console.log("New electrical consume DELETE");
data = [];
res.sendStatus(200);
}

module.exports.initialData = function (req,res){
console.log("New initial electrical consume data charge");
data = [{country : "brazil",
         year : "2006",
         ePowerConsum : "2.044.859",
         energyUse : "1168.43",
         urbanPopulation : "158.552.239"},
        {country : "brazil",
         year : "2007",
         co2mtn : "2.137.765",
         energyUse : "1.221.362",
         urbanPopulation : "160.874.827"},
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

module.exports.getElectricalConsume = function (req,res){
  var country = req.params.country;
  var electricalConsume = [];
  var from = req.query.from;
  var to = req.query.to;
  //var limit = req.query.limit;
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
  if(from && to){
    for(i=0;i<electricalConsume.length;i++){
      equal=false;
      for(year=from;year<=to;year++){
        if(electricalConsume[i].year==year){
          equal=true;
        }
      }
      if(!equal){
        electricalConsume.splice(i,1);
      }
    }
  }

  if(electricalConsume.length==0)
    res.sendStatus(404);
    else{
      res.send(JSON.stringify(electricalConsume));
    }
}

module.exports.getCountryYear = function (req,res){
  var country = req.params.country;
  var year = req.params.year;
  var electricalConsume = [];
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

/*module.exports.update = function (req,res){
var country = req.params.country;
var year = req.params.year;
var updated = 0;
var ok = 0;
var ind = 0;
console.log("New PUT of resource electrical consume of "+country);
for(i=0;i<data.length;i++){
  if(data[i].country == country && data[i].year == year){

    ok = data[i];
    ind = i;
    updated = 1;
    break;
  }
}*/

module.exports.update = function (req,res){
var country = req.params.country;
var year = req.params.year;
var updated = false;
var badRequest = false;
var sent = req.body;
var apikey = req.query.apikey;
//if(apikey && apikey===key){
  console.log("New PUT of resource electrical consume of "+country);
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
  /*}
  else {
    res.sendStatus(401);
  }*/
}

if(req.body.country!=ok.country && req.body.year!=ok.year){
  res.sendStatus(400);
}else{
  if(updated==0){
    res.sendStatus(404);
  }else{
    data[ind]=req.body;
    res.sendStatus(200);
  }
}
}
module.exports.deleteElectricalConsume = function (req,res){
var country = req.params.country;
var removed = 0;
console.log("New electrical consume DELETE "+country);
for(i=0;i<data.length;i++){
  if(data[i].country == country){
    /////////
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
