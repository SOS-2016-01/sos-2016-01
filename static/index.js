var express = require("express");

  var app = express();

  app.get("/", (req, res) => {

    res.write("Group 1 - SOS 2016 - University of Seville\n");
    res.write("===============================\n");

    res.write("Thematic: co2, diesel & gasoil y electrical consume\n");
    res.write("===============================\n");

    res.write("Authors: \n");
    res.write("===============================\n");
    res.write("Francisco Javier Fernandez Rodriguez \n");
    res.write("Gonzalo Romero Castillo \n");
    res.write("Angel Suarez Mora \n");

    res.write("===============================\n");
    res.write("¡¡¡¡¡Poner alguna descripcion del "+
    "grupo en inglés no se me ocurre nada\n");

    res.end();
    });

    app.listen(process.env.PORT);
