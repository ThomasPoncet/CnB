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

var visiteur = require('./controllers/visiteur');
var admin = require('./controllers/admin');
var diffusion = require('./controllers/diffusion');
var adminZWSound = require('./controllers/adminZWSound');
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
    visiteur.run(req, res, connection);
});

app.get('/admin', function(req, res) {
    admin.run(req, res, connection);
});

app.get('/adminZWSound', function(req, res) {
    adminZWSound.run(req, res, connection);
});

app.get('/diffusion', function(req, res) {
    diffusion.run(req, res, connection);
});

app.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

io.on("connection", function(socket) {
    console.log("a voté !")
    socket.on("vote", function (data) {

        visiteur.actionvote(data.context, data.data);
        //_.findWhere(participants, {id: socket.id}).name = data.name;
        //io.sockets.emit("nameChanged", {id: data.id, name: data.name});
    });
});