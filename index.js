var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var cors = require("cors");
var governify = require("governify");
var carsControllers = require('./apiControllers/carsControllers.js');
var co2Ctl = require('./apiControllers/co2Controllers.js');
var smartphonesControllers = require('./apiControllers/smartphonesControllers.js');
var electricalConsumeCtl = require('./apiControllers/electricalConsumeControllers.js');
var teamsControllers = require('./apiControllers/teamsControllers.js');
var oilControllers = require('./apiControllers/oilControllers.js');


  var app = express();
  var port = (process.env.PORT || 8081);
// Gonzalo
governify.control(app,{
  datastore : "http://datastore.governify.io/api/v6.1/",
  namespace : "sos-2016-01-grc",
  defaultPath: "/api/v1/co2"
});
// Javi key= multiPlan_C4_sos-2016-01-fjfr_ag
governify.control(app, {
  datastore: "http://datastore.governify.io/api/v6.1/",
  namespace: "sos-2016-01-fjfr",
  defaultPath: "/api/v1/oil"
});
// Angel  key=multiPlan_C3_sos-2016-01-asm_ag
 governify.control(app, {
  datastore: "http://datastore.governify.io/api/v6.1/",
  namespace: "sos-2016-01-asm",
  defaultPath: "/api/v1/electrical-consume"
});

  app.use(cors());

// Gonzalo
    var pathGon = '/api/v1/mort-sickness';
    var apiServerHostGon = 'http://sos-2016-03.herokuapp.com';

    app.use(pathGon,function(req,res){
      var url = apiServerHostGon + pathGon + req.url;
      console.log("Piped: "+ req.baseUrl + req.url);
      console.log("URL Accesed: "+ url);

      req.pipe(request(url,(error,response,body)=>{
        if(error){
          console.error(error);
          res.sendStatus(503);
        }
      })).pipe(res);
    });

// Javi
    var pathJav = '/api/v1/music';
    var apiServerHostJav = 'http://sos-2016-08.herokuapp.com';
    var pathJav2 = '/data/2.5/box/city';
    var apiServerHostJav2 = 'http://api.openweathermap.org';
    var apiServerHostJav3 = 'http://www.fitbit.com/apis.json';

    app.use('/fitbit',function(req,res){
      var url = apiServerHostJav3 + req.url;
      console.log("Piped: "+ req.baseUrl + req.url);
      console.log("URL Accesed: "+ url);
      req.pipe(request(url,(error,response,body)=>{
        if(error){
          console.error(error);
          res.sendStatus(503);
        }
      })).pipe(res);
    });

    app.use(pathJav2,function(req,res){
      var url = apiServerHostJav2 + pathJav2 + req.url;
      console.log("Piped: "+ req.baseUrl + req.url);
      console.log("URL Accesed: "+ url);
      req.pipe(request(url,(error,response,body)=>{
        if(error){
          console.error(error);
          res.sendStatus(503);
        }
      })).pipe(res);
    });

    app.use(pathJav,function(req,res){
      var url = apiServerHostJav + pathJav + req.url;
      console.log("Piped: "+ req.baseUrl + req.url);
      console.log("URL Accesed: "+ url);

      req.pipe(request(url,(error,response,body)=>{
        if(error){
          console.error(error);
          res.sendStatus(503);
        }
      })).pipe(res);
    });
// Angel
  var pathAng = '/api/v1/participants-number';
  var apiServerHostAng = 'http://sos-2016-05.herokuapp.com';
  var pathAng2 = '/ajax/services/feed';
  var apiServerHostAng2 = 'http://ajax.googleapis.com'

  app.use(pathAng,function(req,res){
    var url = apiServerHostAng + pathAng + req.url;
    console.log("Piped: "+ req.baseUrl + req.url);
    console.log("URL Accesed: "+ url);

    req.pipe(request(url,(error,response,body)=>{
      if(error){
        console.error(error);
        res.sendStatus(503);
      }
    })).pipe(res);
  });

  app.use(pathAng2,function(req,res){
    var url = apiServerHostAng2 + pathAng2 + req.url;
    console.log("Piped: "+ req.baseUrl + req.url);
    console.log("URL Accesed: "+ url);

    req.pipe(request(url,(error,response,body)=>{
      if(error){
        console.error(error);
        res.sendStatus(503);
      }
    })).pipe(res);
  });


//Escribid vuestros pipe antes de esta línea pq si no no va bien
  app.use(bodyParser.json());

  app.use("/about",express.static(__dirname + '/static/about'));

  app.use("/RESTClient",express.static(__dirname + '/static/RESTClient'));

  app.use("/data",express.static(__dirname + '/static/data'));


  app.use("/electrical-consume",express.static(__dirname + '/static/electrical-consume'));

  app.use("/oil",express.static(__dirname + '/static/oil'));

  app.use("/co2",express.static(__dirname + '/static/co2'));

  app.use("/",express.static(__dirname + '/static'));




  // app.get("/", (req, res) => {
  //     res.write("<html><header><title>Hello World</title></header>");
  //     res.write('<body bgcolor="#29B6F6"><h1>Hello World!</h1><a href="../about">About</a></body></html>');
  //     res.end();
  //     console.log("New request to HELLO arrived!!")
  //   });

  app.get("/time",(req,res)=>{
    var date = new Date();
    res.write("<html><header><title>Time</title></header>");
    res.write("<body><h1>It is "+date+"</h1></body></html>");
    res.end();
    console.log("New request to TIME arrived!!");
  });

  //----------------------Api Oil---------------------------------

  app.get("/api/v1/oil",oilControllers.getData);
  app.post("/api/v1/oil",oilControllers.addOil);
  app.delete("/api/v1/oil", oilControllers.delete);
  app.put("/api/v1/oil", (req,res)=>{
    console.log("PUT not allowed");
    res.sendStatus(405);
  });
  app.get("/api/v1/oil/loadInitialData",oilControllers.initialData);
  app.get("/api/v1/oil/:country",oilControllers.getOil);
  app.get("/api/v1/oil/:country/:year",oilControllers.getCountryYear);
  app.post("/api/v1/oil/:country/:year", (req,res)=>{
    console.log("POST not allowed");
    res.sendStatus(405);
  });
  app.put("/api/v1/oil/:country/:year",oilControllers.update);
  app.delete("/api/v1/oil/:country/:year", oilControllers.deleteOil);


  //----------------------Api Teams---------------------------------

  app.get("/api/sandbox/teams",teamsControllers.getTeams);
  app.post("/api/sandbox/teams",teamsControllers.addTeam);
  app.delete("/api/sandbox/teams", teamsControllers.delete);
  app.put("/api/sandbox/teams", (req,res)=>{
    console.log("PUT not allowed");
    res.sendStatus(405);
  });
  app.get("/api-test/teams/loadInitialData",teamsControllers.initialData);
  app.get("/api/sandbox/teams/:name",teamsControllers.getTeam);
  app.post("/api/sandbox/teams/:name", (req,res)=>{
    console.log("POST not allowed");
    res.sendStatus(405);
  });
  app.put("/api/sandbox/teams/:name",teamsControllers.update);
  app.delete("/api/sandbox/teams/:name", teamsControllers.deleteTeam);



  //----------------------Api Cars---------------------------------
  app.get("/api/sandbox/cars",carsControllers.getCars);
  app.post("/api/sandbox/cars",carsControllers.addCar);
  app.delete("/api/sandbox/cars", carsControllers.delete);
  app.put("/api/sandbox/cars", (req,res)=>{
    console.log("PUT not allowed");
    res.sendStatus(405);
  });
  app.get("/api-test/cars/loadInitialData",carsControllers.initialData);
  app.get("/api/sandbox/cars/:name",carsControllers.getCar);
  app.post("/api/sandbox/cars/:name/:year", (req,res)=>{
    console.log("POST not allowed");
    res.sendStatus(405);
  });
  app.put("/api/sandbox/cars/:name",carsControllers.update);
  app.delete("/api/sandbox/cars/:name", carsControllers.deleteCar);

  //-----------------------------Api CO2-----------------------------
  app.get("/api/v1/co2",co2Ctl.getData);
  app.post("/api/v1/co2",co2Ctl.addCo2);
  app.delete("/api/v1/co2", co2Ctl.delete);
  app.put("/api/v1/co2", (req,res)=>{
    console.log("PUT not allowed");
    res.sendStatus(405);
  });
  app.get("/api/v1/co2/loadInitialData",co2Ctl.initialData);
  app.get("/api/v1/co2/:country",co2Ctl.getCo2);
  app.get("/api/v1/co2/:country/:year",co2Ctl.getCountryYear);
  app.post("/api/v1/co2/:name/:year", (req,res)=>{
    console.log("POST not allowed");
    res.sendStatus(405);
  });
  app.put("/api/v1/co2/:country/:year",co2Ctl.update);
  app.delete("/api/v1/co2/:country/:year", co2Ctl.deleteCo2);

  //----------------------Api SmartPhones---------------------------------

  app.get("/api/sandbox/smartphones",smartphonesControllers.getSmartphones);
  app.post("/api/sandbox/smartphones",smartphonesControllers.addSmartphone);
  app.delete("/api/sandbox/smartphones", smartphonesControllers.delete);
  app.put("/api/sandbox/smartphones", (req,res)=>{
    console.log("PUT not allowed");
    res.sendStatus(405);
  });
  app.get("/api-test/smartphones/loadInitialData",smartphonesControllers.initialData);
  app.get("/api/sandbox/smartphones/:name",smartphonesControllers.getSmartphone);
  app.post("/api/sandbox/smartphones/:name", (req,res)=>{
    console.log("POST not allowed");
    res.sendStatus(405);
  });
  app.put("/api/sandbox/smartphones/:name",smartphonesControllers.update);
  app.delete("/api/sandbox/smartphones/:name", smartphonesControllers.deleteSmartphone);

//----------------------Api Electrical Consume---------------------------------

app.get("/api/v1/electrical-consume",electricalConsumeCtl.getData);
app.post("/api/v1/electrical-consume",electricalConsumeCtl.addElectricalConsume);
app.delete("/api/v1/electrical-consume", electricalConsumeCtl.delete);
app.put("/api/v1/electrical-consume", (req,res)=>{
  console.log("PUT not allowed");
  res.sendStatus(405);
});
app.get("/api/v1/electrical-consume/loadInitialData",electricalConsumeCtl.initialData);
app.get("/api/v1/electrical-consume/:country",electricalConsumeCtl.getElectricalConsume);
app.get("/api/v1/electrical-consume/:country/:year",electricalConsumeCtl.getCountryYear);
app.post("/api/v1/electrical-consume/:country/:year", (req,res)=>{
  console.log("POST not allowed");
  res.sendStatus(405);
});
app.put("/api/v1/electrical-consume/:country/:year",electricalConsumeCtl.update);
app.delete("/api/v1/electrical-consume/:country/:year", electricalConsumeCtl.deleteElectricalConsume);




    app.listen(port,()=>{
      console.log("Listening on port: " + port);
    });
