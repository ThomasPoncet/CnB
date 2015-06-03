/**
 * Created by thomas on 29/05/15.
 */

var DAO = require('../../../models/DAOWidget.js');


getContentList = function(connection, callback) {

    DAO.getContentList(connection, function(list) {
        callback(list)
    });

};

exports.run = function (req, res, connection) {

    getContentList(connection, function(list) {
        res.render("musicAdmin", {listContent: list});
    });


};

exports.upload = function(req, res, connection){
    DAO.addContent(connection, req.files.file, function () {
        getContentList(connection, function(list) {
            res.render("musicAdmin", {listContent: list});
        })
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