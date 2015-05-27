/**
 * Created by Tanguy on 27/05/15.
 */

var express = require("express");
var app = express();
var http = require("http").createServer(app);
var bodyParser = require("body-parser");
var io = require("socket.io").listen(http);
var mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : ""
});

//Example SQL Query
//connection.query("SELECT * FROM ...");

//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number
app.set("port", 8080);

//Specify the views folder
app.set("views", __dirname + "/views");

//View engine is Jade
app.set("view engine", "ejs");

//Specify where the static content is
app.use(express.static("public", __dirname + "/public"));

app.get('/', function(req, res) {
    res.render("visiteur");
    //res.setHeader('Content-Type', 'text/plain');
    //res.end('Hello World');
});

app.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
