var express = require("express");

  var app = express();

  app.get("/", (req, res) => {

      res.write("Hello world");

      res.end();
    });

    app.get("/about", (req, res) => {

        res.write("thematic: co2, diesel & gasoil y electrical consume\n");
        res.write("===============================\n");

        res.write("authors: \n");
        res.write("===============================\n");
        res.write("Francisco Javier Fernandez Rodriguez \n");
        res.write("Gonzalo Romero Castillo \n");
        res.write("Angel Suarez Mora \n");

        res.write("===============================\n");
        res.write("We are the number one group. ¡¡¡¡¡Poner alguna descripcion del "+
        "grupo en inglés no se me ocurre na jaja\n");

        res.end();
      });

      app.get("/about/oil", (req, res) => {

          res.write("thematic: oil\n");
          res.write("===============================\n");

          res.write("author: \n");
          res.write("===============================\n");
          res.write("Francisco Javier Fernandez Rodriguez \n");

          res.end();
        });

        app.get("/about/co2", (req, res) => {

            res.write("thematic: co2\n");
            res.write("===============================\n");

            res.write("author: \n");
            res.write("===============================\n");
            res.write("Gonzalo Romero Castillo\n");

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

    app.listen(process.env.PORT);
