  var cars = [];

module.exports.getCars = function(req,res){
  console.log("New GET of resource cars");
  res.send(JSON.stringify(cars));
}

module.exports.addCar = function (req,res){
  var car = req.body;
  cars.push(car);
  console.log("New cars POST");
  console.log("Object recived: "+JSON.stringify(req.body));
  res.sendStatus(200);
}

module.exports.delete = function (req,res){
  console.log("New cars DELETE");
  cars = [];
  res.sendStatus(200);
}

module.exports.initialData = function (req,res){
  console.log("New initial cars data charge");
  cars = [{name : "Insignia",
           brand : "Opel",
           year : "2014"},
          {name: "207",
           brand : "Peugeot",
           year : "2007"}];
  res.sendStatus(200);
}

module.exports.getCar = function (req,res){
  var name = req.params.name;
  var car = [];
  console.log("New GET of resource cars of "+name);
  for(i=0;i<cars.length;i++){
    if(cars[i].name == name){
      car.push(cars[i]);
    }
  }
  if(car.length==0)
    res.sendStatus(404);
  else{
    res.send(JSON.stringify(car));
  }
}

module.exports.update = function (req,res){
  var name = req.params.name;
  var updated = 0;
  console.log("New PUT of resource cars of "+name);
  for(i=0;i<cars.length;i++){
    if(cars[i].name == name){
      cars[i]=req.body;
      updated = 1;
      break;
    }
  }
  if(updated==0)
    res.sendStatus(404);
  else
    res.sendStatus(200);
}

module.exports.deleteCar = function (req,res){
  var name = req.params.name;
  var removed = 0;
  console.log("New car DELETE "+name);
  for(i=0;i<cars.length;i++){
    if(cars[i].name == name){
      //delete cars[i];
      cars.splice(i);
      removed =1;
      break;
    }
  }
  if(removed==0)
    res.sendStatus(404);
  else
    res.sendStatus(200);
}
