var express = require("express");

  var app = express();
  var port = process.env.PORT || 8081;

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
    console.log("New request to TIME arrived!!")
  });


//Esto no sirve para nada, borradlo cuando hagais el html
/*
      app.get("/about/oil", (req, res) => {

          res.write("thematic: oil\n");
          res.write("===============================\n");

          res.write("author: \n");
          res.write("===============================\n");
          res.write("Francisco Javier Fernandez Rodriguez \n");

          res.end();
        });

          app.get("/about/electrical-consume", (req, res) => {

              res.write("thematic: electrical consume\n");
              res.write("===============================\n");

              res.write("author: \n");
              res.write("===============================\n");
              res.write("Angel Suarez Mora \n");

              res.end();
            });
*/

    app.listen(port,()=>{
      console.log("Listening on port: " + port);
    });
