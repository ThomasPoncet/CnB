/**
 * Created by thomas on 09/06/15.
 */


var widgetDiff = require('../../../controllers/widgetDiff.js');

exports.run = function(req, res, connection){
    // TODO : idWidget
    widgetDiff.run(connection, {context: {idWidget: 6}}, function(data){
        res.render("deezerDiff", {context: {idWidget: 6}, data: data});
    });
};

exports.nextContent = function(req, res, connection, io){
    widgetDiff.nextContent(connection, {context: {idWidget: 6}}, io, function(firstContent){
        res.send(firstContent.link);
    });
};