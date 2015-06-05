/**
 * Created by thomas on 29/05/15.
 */

var fs = require('fs');
var widgetAdmin = require('../../../controllers/widgetAdmin.js');

exports.run = function (req, res, connection) {
    widgetAdmin.run(req, res, connection, function(data){
        // TODO : idWidget
        res.render("musicAdmin", {context: {idWidget: 1}, data: data})
    });
};

exports.addContent = function(req, res, connection, io){
    var newContentList = new Array();
    if (Array.isArray(req.files.file)){
        for (var i = 0; i < req.files.file.length; i++){
            newContentList[i] = {
                name: req.files.file[i].originalname,
                link: req.files.file[i].name,
                idWidget: 1,    // TODO : idWidget
                active: true
            };
        }
    } else {
        newContentList[0] = {
            name: req.files.file.originalname,
            link: req.files.file.name,
            idWidget: 1,    // TODO : idWidget
            active: true
        };
    }
    widgetAdmin.addContent(connection, newContentList, 0, function(listContent){
        res.redirect('/widgets/music/admin');
    }, io);
};



exports.updateContentStatus = function(connection, info, socket){
    widgetAdmin.updateContentStatus(connection, info, socket, function(){});
};

exports.deleteContent = function(connection, info, socket){
    widgetAdmin.deleteContent(connection, info, socket, function(){
        fs.unlink('./uploads/'+info.data.link, function (err) {
            if (err) throw err;
        });
    });
};