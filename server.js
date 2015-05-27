/**
 * Created by tanguy on 27/05/15.
 */

var express = require("express")
    , app = express()
    , http = require("http").createServer(app)
    , bodyParser = require("body-parser")
    , io = require("socket.io").listen(http);

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.listen(8080);
