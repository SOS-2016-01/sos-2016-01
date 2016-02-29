var express = require("express");

var app = express();

app.get("/about", (req, res) => {

    res.write("Hello world");

    res.end();
  });

  app.listen(process.env.PORT);
