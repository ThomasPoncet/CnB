/**
 * Created by thomas on 01/06/15.
 */

// To access local files
var fs = require('fs');
var widgetDiff = require('../../../controllers/widgetDiff.js');

// Maybe useless in the future [TODO]
exports.run = function(req, res, connection){
    widgetDiff.run(req, res, connection, function(data){
        res.render("musicDiff", {context: {idWidget: 1}, data: data}); // TODO : idWidget
    });
};

exports.nextContent = function(req, res, connection, io){
    widgetDiff.nextContent(req, res, connection, io, function(firstContent){
        var filePath = './uploads/'+firstContent.link;
        var stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        });
        var readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    });
};