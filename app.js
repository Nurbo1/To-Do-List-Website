const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workitems = [];

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){

  let day = date.getDay();
  res.render('list',{listTitle: day, newListItems: items});
});

app.post("/", function(req,res){
  let item = req.body.newItem;
  console.log(req.body.list);
  if(req.body.list === "Work List"){
    workitems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render('list',{listTitle: "Work List", newListItems: workitems});
});



app.listen(3000, function(){
  console.log("Server started on port 3000");
});
