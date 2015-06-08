/**
 * Created by Tanguy on 27/05/15.
 */

var express = require("express");
var multer  = require('multer');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var io = require('socket.io')(http);
var mysql = require("mysql");
var sessions = require('client-sessions');
var uuid = require('uuid');
var basicAuth = require('basic-auth');
var adminAuth = {
    'admin': {password: '21232f297a57a5a743894a0e4a801fc3'}
};
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
var diff= require('./controllers/diff');

var visitorWidgets = require('./controllers/visitorWidgets');

var adminZWSound = require('./zonesWidgets/controllers/adminZWSound');
var adminZWScreen = require('./zonesWidgets/controllers/adminZWScreen');

var adminMusic = require('./widgets/music/controllers/admin');
var diffMusic = require('./widgets/music/controllers/diff');
var visitorMusic = require('./widgets/music/controllers/visitor');

var adminYoutubevideo = require('./widgets/youtubevideo/controllers/admin');
var diffYoutubevideo = require('./widgets/youtubevideo/controllers/diff');
var visitorYoutubevideo = require('./widgets/youtubevideo/controllers/visitor');

var hash = require('./public/js/md5');

var auth = function(req, res, next){
    var user = basicAuth(req);

    if (!user || !adminAuth[user.name] || adminAuth[user.name].password !== hash.calcMD5(user.pass)){


        res.set('WWW-Authenticate', 'Basic realm="admin"');
        return res.status(401).send();
    }
    return next();
};

var ipAddr = "127.0.0.1";

//Server's IP address
app.set("ipaddr", ipAddr);

////Server's port number
app.set("port", 8080);

var arrayViews = [__dirname + "/views", __dirname + "/widgets/music/views", __dirname + "/widgets/youtubevideo/views", __dirname + "/zonesWidgets/views"];
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

app.use(sessions({
    cookieName: 'visitorSession',
    secret: 'T4MFNkeL0Wx014mtK8Cr', // random string for security
    duration: 5 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

app.use(function(req, res, next){
    if (!req.visitorSession.idSession) {
        req.visitorSession.idSession = uuid.v4();
    }
    next();
});

//Specify routes
app.get('/', function(req, res) {
    visitor.run(req, res, connection);
});

app.get('/admin', auth, function(req, res) {
    admin.run(req, res, connection);
});

app.get('/adminZWSound', auth, function(req, res) {
    adminZWSound.run(req, res, connection);
});

app.get('/adminZWScreen', auth, function(req, res) {
    adminZWScreen.run(req, res, connection);
});

app.get('/diff', function(req, res) {
    diff.run(req, res, connection);
});

app.get('/widgets', function(req, res) {
    visitorWidgets.run(req, res, connection);
});

app.get('/widgets/music/visitor', function(req, res) {
    visitorMusic.run(req, res, connection);
});

app.get('/widgets/music/admin', auth, function (req, res) {
    adminMusic.run(req, res, connection);
});

app.post('/widgets/music/admin/addContent', auth, function (req, res) {
    adminMusic.addContent(req, res, connection, io);
});

app.get('/widgets/music/diff', function (req, res) {
    diffMusic.run(req, res, connection);
});

app.get('/widgets/music/diff/stream/:timestamp', function (req, res) {
    diffMusic.nextContent(req, res, connection, io);
});


app.get('/widgets/youtubevideo/visitor', function(req, res) {
    visitorYoutubevideo.run(req, res, connection);
});

app.get('/widgets/youtubevideo/admin', auth, function (req, res) {
    adminYoutubevideo.run(req, res, connection);
});

app.post('/widgets/youtubevideo/admin/addContent', auth, function (req, res) {
    adminYoutubevideo.addContent(req, res, connection, io);
});

app.get('/widgets/youtubevideo/diff', function(req, res) {
    diffYoutubevideo.run(req, res, connection);
});

app.get('/widgets/youtubevideo/diff/stream/:timestamp', function (req, res) {
    diffYoutubevideo.nextContent(req, res, connection, io);
});


app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('ERREUR 404 : PAGE INTROUVABLE !');
});

/* Socket.IO events */
io.on('connection', function(socket) {

    visitor.refreshMenu(connection, socket);

    // When a visitor vote for a content
    socket.on('voteContent', function (info) {
        // TODO idWidget
        if (info.context.idWidget == 1){
            visitorMusic.voteContent(connection, info, io);
        }
        else if (info.context.idWidget == 2){
            visitorYoutubevideo.voteContent(connection, info, io);
        }
        diff.refreshNotificationVoteContent(info, connection, io);
    });

    socket.on('voteWidget', function (info) {

        visitorWidgets.actionVoteWidget(info.data.id, info.data.idWidget, info.context.idWidgetZone, connection, function () {
            visitorWidgets.refreshListWidgets(connection, socket);

            diff.refreshNotificationVoteWidget(info, connection, io);
        });
    });

    socket.on('updateVisibility', function (data) {
        adminZWSound.updateVisibility(connection, data);
    });

    // When a visitor suggest a vote for a widget zone
    socket.on('suggest', function (info) {
        diff.refreshNotificationSuggest(info, connection, io);

        // When vote is finished, we activate/deactivate widgets
        setTimeout(function () {
            visitorWidgets.updateWidgets(info.idZoneWidget, connection, socket, function () {

                visitorWidgets.refreshListWidgets(connection, socket);
            });
        }, 60000);

        visitorWidgets.actionSuggest(info.idZoneWidget, connection, function () {
            visitorWidgets.refreshListWidgets(connection, socket);
        });
    });



    /*
     When the status of a content of a widget
     is updated by the administrator (the contents can be
     active or inactive
     */
    socket.on('updateContentStatus', function(info){
        if (info.context.idWidget == 1){
            adminMusic.updateContentStatus(connection, info, io);
        }
        else if (info.context.idWidget == 2){
            adminYoutubevideo.updateContentStatus(connection, info, io);
        }
    });

    socket.on('deleteContent', function(info){
        if (info.context.idWidget == 1){
            adminMusic.deleteContent(connection, info, io);
        }
        else if (info.context.idWidget == 2){
            adminYoutubevideo.deleteContent(connection, info, io);
        }
    });

    // TODO : on disconnect, maybe deletes some infos
});

http.listen(app.get("port"), app.get("ipaddr"), function () {
    console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});


