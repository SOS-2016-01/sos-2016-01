var express = require("express");

var app = express();

app.get("/",(req,res) =>{
  res.write("<html><body><h1>Hello world</h1>");
  res.write("<h2>How are you?</h2></body></html>");
  res.end();

});
  app.listen(process.env.PORT);
