var smartphones = [];

module.exports.getSmartphones = function(req,res){
console.log("New GET of resource smartphones");
res.send(JSON.stringify(smartphones));
}

module.exports.addSmartphone = function (req,res){
var smartphone = req.body;
smartphones.push(smartphone);
console.log("New smartphones POST");
console.log("Object recived: "+JSON.stringify(req.body));
res.sendStatus(200);
}

module.exports.delete = function (req,res){
console.log("New smartphones DELETE");
smartphones = [];
res.sendStatus(200);
}

module.exports.initialData = function (req,res){
console.log("New initial smartphones data charge");
smartphones = [{name : "S6",
         brand : "Samsung",
         price : "499"},
        {name: "P8",
         brand : "Huawei",
         price : "299"}];
res.sendStatus(200);
}

module.exports.getSmartphone = function (req,res){
var name = req.params.name;
var smartphone = [];
console.log("New GET of resource smartphones of "+name);
for(i=0;i<smartphones.length;i++){
  if(smartphones[i].name == name){
    smartphone.push(smartphones[i]);
  }
}
if(smartphone.length==0)
  res.sendStatus(404);
else{
  res.send(JSON.stringify(smartphone));
}
}

module.exports.update = function (req,res){
var name = req.params.name;
var updated = 0;
console.log("New PUT of resource smartphones of "+name);
for(i=0;i<smartphones.length;i++){
  if(smartphones[i].name == name){
    smartphones[i]=req.body;
    updated = 1;
    break;
  }
}
if(updated==0)
  res.sendStatus(404);
else
  res.sendStatus(200);
}

module.exports.deleteSmartphone = function (req,res){
var name = req.params.name;
var removed = 0;
console.log("New smartphone DELETE "+name);
for(i=0;i<smartphones.length;i++){
  if(smartphones[i].name == name){
    smartphones.splice(i);
    removed =1;
    break;
  }
}
if(removed==0)
  res.sendStatus(404);
else
  res.sendStatus(200);
}
