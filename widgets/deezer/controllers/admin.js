/**
 * Created by thomas on 22/06/15.
 */

var widgetAdmin = require('../../../controllers/widgetAdmin.js');

exports.run = function (req, res, connection) {
    // TODO : idWidget
    widgetAdmin.run(connection, {context: {idWidget: 6}}, function(data){
        res.render("deezerAdmin", {context: {idWidget: 6}, data: data})
    });
};

exports.addContent = function(req, res, connection, io){
    var newContentList = new Array();
        newContentList[0] = {
            name: req.body.name,
            link: req.body.link,
            idWidget: 6,    // TODO : idWidget
            active: true
        };

    widgetAdmin.addContent(connection, {context: {idWidget: 6},
        data: {newContentList: newContentList}}, 0, io, function(){
        res.redirect('/widgets/deezer/admin');
    });
};

exports.updateContentStatus = function(connection, info, io){
    widgetAdmin.updateContentStatus(connection, info, io, function(){});
};

exports.deleteContent = function(connection, info, io){
    widgetAdmin.deleteContent(connection, info, io, function(){
    });
};