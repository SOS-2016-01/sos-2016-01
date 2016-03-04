var express = require("express");

  var app = express();

  app.get("/", (req, res) => {

    res.write("Thematic: co2\n");
    res.write("===============================\n");

    res.write("Author: \n");
    res.write("===============================\n");
    res.write("Gonzalo Romero Castillo\n");


    res.write("This section co2 emissions is analyzed from different points of "+
    "view, metric tons per capita and GDP per unit of energy use \n");



    res.end();
    });


      app.listen(process.env.PORT);
