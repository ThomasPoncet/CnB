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
        res.send(firstContent.link);
    });
};