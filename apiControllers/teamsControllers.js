var teams = [];

module.exports.getTeams = function(req,res){
  console.log("New GET of resource teams");
  res.send(JSON.stringify(teams));
};

module.exports.addTeam = function(req,res){
  var team = req.body;
  teams.push(team);
  console.log("New team POST");
  console.log("Object recived: "+JSON.stringify(req.body));
  res.sendStatus(200);
});

module.exports.delete = function(req,res){
  console.log("New team DELETE");
  teams = [];
  res.sendStatus(200);
});

//app.put("/api/sandbox/teams", (req,res)=>{
//  console.log("PUT not allowed");
//  res.send("Method Not Allowed")
//});


module.exports.initialData = function (req,res){
  console.log("New initial teams data charge");
  teams = [{name : "SevillaFC",
           year : "1905",
           city: "Sevilla"},
          {name: "FCBarcelona",
           year : "1889",
           city : "Barcelona"}];
  res.sendStatus(200);
});

module.exports.getTeam = function (req,res){
  var name = req.params.name;
  var team = [];
  console.log("New GET of resource team of "+name);
  for(i=0;i<teams.length;i++){
    if(teams[i].name == name){
      team.push(teams[i]);
    }
  }
  if(team.length==0)
    res.sendStatus(404);
  else{
    res.send(JSON.stringify(team));
  }
});

//app.post("/api/sandbox/teams/:name", (req,res)=>{
//  console.log("POST not allowed");
//  res.send("Method Not Allowed")
//});

module.exports.update = function (req,res){
  var name = req.params.name;
  var updated = 0;
  console.log("New POST of resource teams of "+name);
  for(i=0;i<teams.length;i++){
    if(teams[i].name == name){
      teams[i]=req.body;
      updated = 1;
      break;
    }
  }
  if(updated==0)
    res.sendStatus(404);
  else
    res.sendStatus(200);
});


module.exports.deleteTeam = function (req,res){
  var name = req.params.name;
  var removed = 0;
  console.log("New team DELETE "+name);
  for(i=0;i<teams.length;i++){
    if(teams[i].name == name){
      teams.splice(i);
      removed =1;
      break;
    }
  }
  if(removed==0)
    res.sendStatus(404);
  else
    res.sendStatus(200);
});
