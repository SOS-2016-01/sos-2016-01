var express = require("express");

  var app = express();

  app.get("/", (req, res) => {

    res.write("Thematic: oil\n");
    res.write("===============================\n");

    res.write("Author: \n");
    res.write("===============================\n");
    res.write("Francisco Javier Fernandez Rodriguez \n");

    res.write("===============================\n");


    res.write("This section discusses the price per liter of gasoline and"+
    " diesel during 2006 and 2011  \n");



    res.end();
    });


      app.listen(process.env.PORT);
