/**
 * Created by Tanguy on 08/06/15.
 */

var widgetDiff = require('../../../controllers/widgetDiff.js');

exports.run = function(req, res, connection){
    // TODO : idWidget
    widgetDiff.run(connection, {context: {idWidget: 2}}, function(data){
        res.render("youtubevideoDiff", {context: {idWidget: 2}, data: data});
    });
};

exports.nextContent = function(req, res, connection, io){
    widgetDiff.nextContent(connection, {context: {idWidget: 2}}, io, function(firstContent){
        //var filePath = './uploads/'+firstContent.link;
        //var stat = fs.statSync(filePath);
        //res.writeHead(200, {
        //    'Content-Type': 'audio/mpeg',
        //    'Content-Length': stat.size
        //});
        //var readStream = fs.createReadStream(filePath);
        //readStream.pipe(res);

        console.log("TODO nextContent youtubevideo")
    });
};