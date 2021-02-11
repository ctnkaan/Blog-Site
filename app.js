var mysql = require('mysql');
var express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config()

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const contactContent = "Feel free to contact me !";

//-------------------------------------------------------

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  password : process.env.PASSWORD,
  database : 'mydb'   // the name of your db
});

con.connect();
console.log("conntected")

//--------------------------------------------------------
var msg
var msg1
var msg2
var msg3
var msg4
 
app.get("/", function(req, res){
    con.query("SELECT postName, postConent, postLikes, Administrator_idAdministor FROM post", function (err, result, fields) {    if (err) throw err;
        JSON.stringify(result)
        console.log(result)
        
        res.render("home", {result});
    });
});


app.get("/about", function(req, res){

    con.query('SELECT COUNT(*) as count FROM user', function (error, results, fields) {         if (error) throw error;
        msg = "We have " + results[0].count + " users";
        console.log(msg)
    });

    con.query('SELECT COUNT(*) as count FROM administrator', function (error, results, fields) {         if (error) throw error;
        msg1 = "We have " + results[0].count + " admins";
    });

    con.query('SELECT COUNT(*) as count FROM post', function (error, results, fields) {         if (error) throw error;
        msg2 = "We have " + results[0].count + " posts";
    });

    con.query('SELECT COUNT(*) as count FROM categories', function (error, results, fields) {         if (error) throw error;
        msg3 = "We have " + results[0].count + " categories";
    });

    con.query('SELECT COUNT(*) as count FROM comment', function (error, results, fields) {         if (error) throw error;
        msg4 = "We have " + results[0].count + " comments written";
    });

    console.log(msg)
    console.log(msg1)
    console.log(msg2)
    console.log(msg3)
    console.log(msg4)

    res.render("about", {msg,msg1,msg2,msg3,msg4});
});


app.get("/contact", function(req, res){
    res.render("contact", {contactContent: contactContent});
});

app.get("/post", function(req, res){

    con.query('SELECT * FROM comment', function (error, results, fields) {         if (error) throw error;
        console.log(results)
        res.render("post", {results});
    });
});
  
  
app.listen(8080, function() {
    console.log("Server started on port 8080");
});