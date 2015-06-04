/**
 * Created by Tanguy on 27/05/15.
 */

var express = require("express");
var multer  = require('multer');
var app = express();
var server = require('http').Server(app);
var bodyParser = require("body-parser");
var io = require('socket.io')(server);
var mysql = require("mysql");
var session = require('client-sessions');

// To access local files
var fileSystem = require('fs');

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : ""
});

//connection.connect(function(err){
//    if(!err) {
//        console.log("Database is connected...");
//    } else {
//        console.log("Error connecting database !");
//    }
//});


var visitor = require('./controllers/visiteur');
var admin = require('./controllers/admin');
var diffusion = require('./controllers/diffusion');

var visitorWidgets = require('./controllers/visitorWidgets');

var adminZWSound = require('./zonesWidgets/controllers/adminZWSound');
var adminZWScreen = require('./zonesWidgets/controllers/adminZWScreen');

var adminMusic = require('./widgets/music/controllers/admin');
var diffMusic = require('./widgets/music/controllers/diff');
var visitorMusic = require('./widgets/music/controllers/visitor');

var ipAddr = "127.0.0.1";

//Server's IP address
app.set("ipaddr", ipAddr);

////Server's port number
app.set("port", 8080);

var arrayViews = [__dirname + "/views", __dirname + "/widgets/music/views", __dirname + "/zonesWidgets/views"];
//Specify the views folder
//app.set("views", __dirname + "/views");
app.set("views", arrayViews);

//View engine is ejs
app.set("view engine", "ejs");

//Specify where the static content is
app.use(express.static("public", __dirname + "/public"));

// to handle multipart/form-data
app.use(multer({ dest: './uploads/'}));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    cookieName: 'visitorSession',
    secret: 'T4MFNkeL0Wx014mtK8Cr', // random string for security
    duration: 5 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

//Specify routes
app.get('/', function(req, res) {

    // if session doesn't exist
    if (!req.visitorSession.idSession) {
        req.visitorSession.idSession = visitor.makeId();
    }

    visitor.run(req, res, connection);
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

app.get('/widgets', function(req, res) {
    visitorWidgets.run(req, res, connection);
});

app.get('/widgets/music/visitor', function(req, res) {
    visitorMusic.run(req, res, connection);
});

app.get('/widgets/music/admin', function (req, res) {
    adminMusic.run(req, res, connection);
});

app.post('/widgets/music/admin/upload', function (req, res) {
    adminMusic.upload(req, res, connection);
});

app.get('/widgets/music/diff', function (req, res) {
    diffMusic.run(req, res, connection);
});

app.get('/widgets/music/diff/stream', function (req, res) {
    diffMusic.nextMusic(req, res, connection, io);
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('ERREUR 404 : PAGE INTROUVABLE !');
});

/* Socket.IO events */
io.on('connection', function(socket) {

    visitor.refreshMenu(connection, socket);

    // When a visitor vote
    socket.on('voteMusic', function (data) {
        visitorMusic.actionVoteMusic(data.data.id, data.data.idContent, data.context.idWidget, connection, function () {
            visitorMusic.refreshVoteMusic(connection, socket);
        });
    });

    socket.on('voteWidget', function (data) {
        visitorWidgets.actionVoteWidget(data.data.id, data.data.idWidget, data.context.idWidgetZone, connection, function () {
            visitorWidgets.refreshListWidgets(connection, socket);
        });
    });

    socket.on('updateVisibility', function (data) {
        adminZWSound.updateVisibility(connection, data);
    });

    // When a visitor suggest a vote for a widget zone
    socket.on('suggest', function (data) {
        visitorWidgets.actionSuggest(data.idZoneWidget, connection, function () {
            visitorWidgets.refreshListWidgets(connection, socket);
        });


        /*
         When the status of a content of a widget
         is updated by the administrator (the contents can be
         active or inactive
         */
        socket.on('updateContentStatus', function (info) {
            if (info.context.idWidget == 1) {
                adminMusic.updateContentStatus(connection, info.data, socket);
            }
        });

        socket.on('deleteContent', function (info) {
            if (info.context.idWidget == 1) {
                adminMusic.deleteContent(connection, info.data, socket);
            }
        });
    });
});

server.listen(app.get("port"), app.get("ipaddr"), function () {
    console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));

});


