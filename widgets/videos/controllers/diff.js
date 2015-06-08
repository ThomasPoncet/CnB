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

exports.nextContent = function(req, res, connection, io){
    widgetDiff.nextContent(connection, {context: {idWidget: 3}}, io, function(firstContent){
        var filePath = './uploads/'+firstContent.link;
        var stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'video/mp4',
            'Content-Length': stat.size
        });
        var readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    });
};