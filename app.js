//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));




var homeStartingContent = "Welcome to my Blog.";
var aboutContent = "About content.";
var contactContent = "Contact Content.";

let array = [];



app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: array
  });
});


app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
})


app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
})


app.get("/compose", function(req, res) {
  res.render("compose");
})


app.post("/", function(req, res) {
  const txt = req.body.text;
  const title = req.body.title;

  var composeObject = {
    title: title,
    text: txt
  };
  array.push(composeObject);

  res.redirect("/");
});

app.get('/posts/:postID', function(req, res) {
  console.log("user entered : "+req.params.postID);

  array.forEach(function(element){

    if (req.params.postID.toLowerCase() === element.title.toLowerCase()){
      console.log("match found");

      res.render("post", {
        posts: array,
        Id: req.params.postID
      });

    }
  })
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server Started at port 3000");
});
