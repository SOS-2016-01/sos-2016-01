var express = require("express");

var app = express();

app.get("/", (req, res) => {

    res.write("Hello world");

    res.end();
  });

  app.get("/about", (req, res) => {

      res.write("Tematica: co2, diesel & gasoil y electrical consume\n");
      res.write("===============================\n");

      res.write("Autores \n");
      res.write("Francisco Javier Fernandez Rodriguez \n");
      res.write("Gonzalo Romero Castillo \n");
      res.write("Angel Suares Mora \n");

      res.end();
    });

  app.listen(process.env.PORT);
