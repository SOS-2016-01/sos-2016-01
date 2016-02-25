var express = require("express");

var app = express();

app.get("/",(req,res) =>{
  res.write("Hello world");
  res.write("How are you?");
  res.end();

});
  app.listen(8888);
