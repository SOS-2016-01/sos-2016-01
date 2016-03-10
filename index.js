var express = require("express");
var bodyParser = require("body-parser");

  var app = express();
  var port = process.env.PORT || 8081;

  app.use(bodyParser.json());

  var cars = [];

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

  //Cars API
  app.get("/API/sandbox/cars",(req,res)=>{
    console.log("New GET of resource cars");
    res.send(JSON.stringify(cars));
  });

  app.post("/API/sandbox/cars",function(req,res){
    var car = req.body;
    cars.push(car);
    console.log("New cars POST");
    console.log("Object recived: "+JSON.stringify(req.body));
    res.sendStatus(200);
  });

  app.delete("/API/sandbox/cars", (req,res)=>{
    console.log("New cars DELETE");
    cars = [];
    res.sendStatus(200);
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

  app.get("/API/sandbox/cars/:name",(req,res)=>{
    var name = req.params.name;
    var car = [];
    for(i=0;i<cars.length;i++){
      if(cars[i].name == name){
        car.push(cars[i]);
      }
    }
    res.send(JSON.stringify(car));
    console.log("New GET of resource cars of "+name);
  });

  app.put("/API/sandbox/cars/:name",(req,res)=>{
    var name = req.params.name;
    for(i=0;i<cars.length;i++){
      if(cars[i].name == name){
        cars[i]=req.body;
      }
    }
    console.log("New POST of resource cars of "+name);
      res.sendStatus(200);
  });


  app.delete("/API/sandbox/cars/:name", (req,res)=>{
    var name = req.params.name;
    console.log("New car DELETE "+name);
    for(i=0;i<cars.length;i++){
      if(cars[i].name == name){
        delete cars[i];
        break;
      }
    }
    res.sendStatus(200);
  });

    app.listen(port,()=>{
      console.log("Listening on port: " + port);
    });
