var express = require("express");

  var app = express();

  app.get("/", (req, res) => {

    res.write("Thematic: electrical consume\n");
    res.write("===============================\n");

    res.write("Author: \n");
    res.write("===============================\n");
    res.write("Angel Suarez Mora \n");

    res.write("This section analyzes electricity consumption (kwh per capita)"+
    "energy use (kg of oil equivalent per capita) and the urban population in"+
    "a number of countries during the years 2006 to 2011  \n");



    res.end();
    });


      app.listen(process.env.PORT);
