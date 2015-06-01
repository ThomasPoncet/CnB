/**
 * Created by Tanguy on 27/05/15.
 */

var express = require("express");
var app = express();
var server = require('http').Server(app);
var bodyParser = require("body-parser");
var io = require('socket.io')(server);
var mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : ""
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected...");
    } else {
        console.log("Error connecting database !");
    }
});

var visiteur = require('./controllers/visiteur');
var admin = require('./controllers/admin');
var diffusion = require('./controllers/diffusion');

var adminZWSound = require('./controllers/adminZWSound');
var adminZWScreen = require('./controllers/adminZWScreen');

var adminMusic = require('./widgets/music/controllers/admin');


server.listen(8080);



//Server's IP address
app.set("ipaddr", "127.0.0.1");

////Server's port number
//app.set("port", 8080);

var arrayViews = [__dirname + "/views", __dirname + "/widgets/music/views"];
//Specify the views folder
//app.set("views", __dirname + "/views");
app.set("views", arrayViews);

//View engine is ejs
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

app.get('/adminZWScreen', function(req, res) {
    adminZWScreen.run(req, res, connection);
});

app.get('/diffusion', function(req, res) {
    diffusion.run(req, res, connection);
});

//Doesn't keep the css > why ?
app.get('/widgets/music/admin', function (req, res) {
    adminMusic.run(req, res, connection);
});

app.get('/adminMusic', function (req, res) {
    adminMusic.run(req, res, connection);
});

app.post('/widgets/music/admin/upload', function (req, res) {
    adminMusic.run(req, res, connection);
});

>>>>>>> Stashed changes

io.on('connection', function(socket) {
    visiteur.refreshVoteMusic(connection, socket);

    socket.on('voteMusic', function (data) {
        visiteur.actionVoteMusic(data.data.id, data.data.idContent, data.context.idWidget, connection, function () {
            visiteur.refreshVoteMusic(connection, socket);
        });


    });
});


app.listen(app.get("port"), app.get("ipaddr"), function () {
    console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));

});

