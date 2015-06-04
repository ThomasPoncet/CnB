/**
 * Created by thomas on 04/06/15.
 */
var DAO = require('/models/DAOWidget.js');
var musicAdmin = require('/widgets/music/controllers/admin');
var fs = require('fs');


exports.run = function (req, res, connection) {
    //TODO idWidget
    //if (req.widget == 1){
        musicAdmin.run(req, res, connection);
    //}

    //DAO.getContentList(connection, function(list) {
    //    res.render("musicAdmin", {listContent: list});
    //});


};

exports.addContent = function (req, res, connection){

};

exports.upload = function(req, res, connection){
    var i = 0;
    for (i; i < req.files.file.length-1; i++){
        DAO.addContent(connection, req.files.file[i], function () {});
    }
    DAO.addContent(connection, req.files.file[i], function () {
        getContentList(connection, function(list) {
            res.render("musicAdmin", {listContent: list});
        });
    });
};

exports.updateContentStatus = function(connection, data, socket){
    DAO.updateContentStatus(connection, data.idContent, data.active, function(){
        DAO.getContentList(connection, function(listContent){
            //TODO idWidget
            socket.emit('refreshContent', {context: {idWidget: 1}, data: {listContent: listContent}});
            socket.broadcast.emit('refreshContent', {context: {idWidget: 1}, data: {listContent: listContent}});
        })
    })
};

exports.deleteContent = function(connection, data, socket){
    DAO.deleteContent(connection, data.idContent, function(){
        DAO.getContentList(connection, function(listContent){
            fs.unlink('./uploads/'+data.link, function (err) {
                if (err) throw err;
            });
            //TODO idWidget
            socket.emit('refreshContent', {context: {idWidget: 1}, data: {listContent: listContent}});
            socket.broadcast.emit('refreshContent', {context: {idWidget: 1}, data: {listContent: listContent}});
        })
    })
};