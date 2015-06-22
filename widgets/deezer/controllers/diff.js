/**
 * Created by thomas on 22/06/15.
 */


var widgetDiff = require('../../../controllers/widgetDiff.js');

exports.run = function(req, res, connection){
    // TODO : idWidget
    widgetDiff.run(connection, {context: {idWidget: 4}}, function(data){
        res.render("youtubeaudioDiff", {context: {idWidget: 4}, data: data});
    });
};

exports.nextContent = function(req, res, connection, io){
    widgetDiff.nextContent(connection, {context: {idWidget: 4}}, io, function(firstContent){
        res.send(firstContent.link);
    });
};