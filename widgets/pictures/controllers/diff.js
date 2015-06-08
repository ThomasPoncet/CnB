/**
 * Created by Lucas on 08/06/15.
 */

// To access local files
var fs = require('fs');
var widgetDiff = require('../../../controllers/widgetDiff.js');

// Maybe useless in the future [TODO]
exports.run = function(req, res, connection){
    // TODO : idWidget
    widgetDiff.run(connection, {context: {idWidget: 5}}, function(data){
        res.render("picturesDiff", {context: {idWidget: 5}, data: data});
    });
};



exports.nextContent = function(req, res, connection, io){
    widgetDiff.nextContent(connection, {context: {idWidget: 5}}, io, function(firstContent){
        if (firstContent != undefined) {
            var filePath = './uploads/' + firstContent.link;
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'img/jpg',
                'Content-Length': stat.size
            });
            var readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        }
    });
};