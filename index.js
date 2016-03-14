var express = require("express");
var bodyParser = require("body-parser");

  var app = express();
  var port = (process.env.PORT || 8081);

  app.use(bodyParser.json());

  var cars = [];
  var smartphones = [];
  var teams = [];

  app.use("/about",express.static(__dirname + '/static/about'));

  app.get("/", (req, res) => {
      res.write("<html><header><title>Hello World</title></header>");
      res.write("<body><h1>Hello World!</h1></body></html>")
      res.end();
      console.log("New request to HELLO arrived!!")
    });

  app.get("/time",(req,res)=>{
    var date = new Date();
    res.write("<html><header><title>Time</title></header>");
    res.write("<body><h1>It is "+date+"</h1></body></html>");
    res.end();
    console.log("New request to TIME arrived!!");
  });

  //----------------------Api Teams---------------------------------

  app.get("/api/sandbox/teams",(req,res)=>{
    console.log("New GET of resource teams");
    res.send(JSON.stringify(teams));
  });

  app.post("/api/sandbox/teams",function(req,res){
    var team = req.body;
    teams.push(team);
    console.log("New team POST");
    console.log("Object recived: "+JSON.stringify(req.body));
    res.sendStatus(200);
  });

  app.delete("/api/sandbox/teams", (req,res)=>{
    console.log("New team DELETE");
    teams = [];
    res.sendStatus(200);
  });

  app.put("/api/sandbox/teams", (req,res)=>{
    console.log("PUT not allowed");
    res.send("Method Not Allowed")
  });


  app.get("/api-test/teams/loadInitialData",(req,res)=>{
    console.log("New initial teams data charge");
    teams = [{name : "SevillaFC",
             year : "1905",
             city: "Sevilla"},
            {name: "FCBarcelona",
             year : "1889",
             city : "Barcelona"}];
    res.sendStatus(200);
  });

  app.get("/api/sandbox/teams/:name",(req,res)=>{
    var name = req.params.name;
    var team = [];
    console.log("New GET of resource team of "+name);
    for(i=0;i<teams.length;i++){
      if(teams[i].name == name){
        team.push(teams[i]);
      }
    }
    if(team.length==0)
      res.sendStatus(404);
    else{
      res.send(JSON.stringify(team));
    }
  });

  app.post("/api/sandbox/teams/:name", (req,res)=>{
    console.log("POST not allowed");
    res.send("Method Not Allowed")
  });

  app.put("/api/sandbox/teams/:name",(req,res)=>{
    var name = req.params.name;
    var updated = 0;
    console.log("New POST of resource teams of "+name);
    for(i=0;i<teams.length;i++){
      if(teams[i].name == name){
        teams[i]=req.body;
        updated = 1;
        break;
      }
    }
    if(updated==0)
      res.sendStatus(404);
    else
      res.sendStatus(200);
  });


  app.delete("/api/sandbox/teams/:name", (req,res)=>{
    var name = req.params.name;
    var removed = 0;
    console.log("New team DELETE "+name);
    for(i=0;i<teams.length;i++){
      if(teams[i].name == name){
        teams.splice(i);
        removed =1;
        break;
      }
    }
    if(removed==0)
      res.sendStatus(404);
    else
      res.sendStatus(200);
  });


  //----------------------Api Cars---------------------------------
  app.get("/api/sandbox/cars",(req,res)=>{
    console.log("New GET of resource cars");
    res.send(JSON.stringify(cars));
  });

  app.post("/api/sandbox/cars",function(req,res){
    var car = req.body;
    cars.push(car);
    console.log("New cars POST");
    console.log("Object recived: "+JSON.stringify(req.body));
    res.sendStatus(200);
  });

  app.delete("/api/sandbox/cars", (req,res)=>{
    console.log("New cars DELETE");
    cars = [];
    res.sendStatus(200);
  });

  app.put("/api/sandbox/cars", (req,res)=>{
    console.log("PUT not allowed");
    res.send("Method Not Allowed")
  });


  app.get("/api-test/cars/loadInitialData",(req,res)=>{
    console.log("New initial cars data charge");
    cars = [{name : "Insignia",
             brand : "Opel",
             year : "2014"},
            {name: "207",
             brand : "Peugeot",
             year : "2007"}];
    res.sendStatus(200);
  });

  app.get("/api/sandbox/cars/:name",(req,res)=>{
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
  });

  app.post("/api/sandbox/cars/:name", (req,res)=>{
    console.log("POST not allowed");
    res.send("Method Not Allowed")
  });

  app.put("/api/sandbox/cars/:name",(req,res)=>{
    var name = req.params.name;
    var updated = 0;
    console.log("New POST of resource cars of "+name);
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
  });


  app.delete("/api/sandbox/cars/:name", (req,res)=>{
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
  });


  //----------------------Api SmartPhones---------------------------------
  app.get("/api/sandbox/smartphones",(req,res)=>{
    console.log("New GET of resource SmartPhones");
    res.send(JSON.stringify(smartphones));
  });

  app.post("/api/sandbox/smartphones",function(req,res){
    var smartphone = req.body;
    smartphones.push(smartphone);
    console.log("New SmartPhone POST");
    console.log("Object recived: "+JSON.stringify(req.body));
    res.sendStatus(200);
  });

  app.delete("/api/sandbox/smartphones", (req,res)=>{
    console.log("New SmartPhone DELETE");
    smartphones = [];
    res.sendStatus(200);
  });

  app.put("/api/sandbox/smartphones", (req,res)=>{
    console.log("PUT not allowed");
    res.send("Method Not Allowed")
  });


  app.get("/api-test/smartphones/loadInitialData",(req,res)=>{
    console.log("New initial smartphone data charge");
    smartphones = [{model : "S6",
             brand : "Samsung",
             price : "499"},
            {model: "P8",
             brand : "Huawei",
             price : "299"}];
    res.sendStatus(200);
  });
  app.get("/api/sandbox/smartphones/:model",(req,res)=>{
    var model = req.params.model;
    var smartphone = [];
    console.log("New GET of resource SmartPhones of "+model);
    for(i=0;i<smartphones.length;i++){
      if(smartphones[i].model == model){
        smartphone.push(smartphones[i]);
      }
    }
    if(smartphone.length==0)
      res.sendStatus(404);
    else{
      res.send(JSON.stringify(smartphone));
    }
  });

  app.post("/api/sandbox/smartphones/:model", (req,res)=>{
    console.log("POST not allowed");
    res.send("Method Not Allowed")
  });

  app.put("/api/sandbox/smartphones/:model",(req,res)=>{
    var model = req.params.model;
    var updated = 0;
    console.log("New POST of resource SmartPhones of "+model);
    for(i=0;i<smartphones.length;i++){
      if(smartphones[i].model == model){
        smartphones[i]=req.body;
        updated = 1;
        break;
      }
    }
    if(updated==0)
      res.sendStatus(404);
    else
      res.sendStatus(200);
  });


  app.delete("/api/sandbox/smartphones/:model", (req,res)=>{
    var model = req.params.model;
    var removed = 0;
    console.log("New smartphone DELETE "+model);
    for(i=0;i<smartphones.length;i++){
      if(smartphones[i].model == model){
        smartphones.splice(i,1);
        removed =1;
        break;
      }
    }
    if(removed==0)
      res.sendStatus(404);
    else
      res.sendStatus(200);
  });


    app.listen(port,()=>{
      console.log("Listening on port: " + port);
    });
