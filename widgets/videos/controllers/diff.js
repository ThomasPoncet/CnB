/**
 * Created by Lucas on 08/06/15.
 */

// To access local files
var fs = require('fs');
var widgetDiff = require('../../../controllers/widgetDiff.js');

// TODO (but maybe useless in the future)
exports.run = function(req, res, connection){
    // TODO : idWidget
    widgetDiff.run(connection, {context: {idWidget: 3}}, function(data){
        res.render("videosDiff", {context: {idWidget: 3}, data: data});
    });
};



var currentContent;

function streamVideo(res, positions, start){
    fs.readFile('./uploads/'+currentContent.link, function (err, data) {
        if (err) {
            throw err;
        }
        var end = positions[1] ? parseInt(positions[1], 10) : data.length - 1;
        var chunksize = (end - start) + 1;

        res.writeHead(206, {
            "Content-Range": "bytes " + start + "-" + end + "/" + data.length,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
        });
        res.end(data.slice(start, end + 1), "binary");
    });
}

exports.nextContent = function(req, res, connection, io){
    var range = req.headers.range;
    var positions = range.replace(/bytes=/, "").split("-");
    var start = parseInt(positions[0], 10);
    // When we have to get a new video
    if (start==0){
        widgetDiff.nextContent(connection, {context: {idWidget: 3}}, io, function(firstContent) {
            currentContent = firstContent;
            streamVideo(res, positions, start);
        });
    // When this is a request for the current video
    } else {
        streamVideo(res, positions, start);
    }
};