/**
 * Created by thomas on 09/06/15.
 */

var widgetAdmin = require('../../../controllers/widgetAdmin.js');

exports.run = function (req, res, connection) {
    // TODO : idWidget
    widgetAdmin.run(connection, {context: {idWidget: 4}}, function(data){
        res.render("youtubeaudioAdmin", {context: {idWidget: 4}, data: data})
    });
};

exports.addContent = function(req, res, connection, io){
    var newContentList = new Array();
        newContentList[0] = {
            name: req.body.name,
            link: req.body.link,
            idWidget: 4,    // TODO : idWidget
            active: true
        };

    widgetAdmin.addContent(connection, {context: {idWidget: 4},
        data: {newContentList: newContentList}}, 0, io, function(){
        res.redirect('/widgets/youtubeaudio/admin');
    });
};

exports.updateContentStatus = function(connection, info, io){
    widgetAdmin.updateContentStatus(connection, info, io, function(){});
};

exports.deleteContent = function(connection, info, io){
    widgetAdmin.deleteContent(connection, info, io, function(){
    });
};