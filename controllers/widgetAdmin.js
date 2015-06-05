/**
 * Created by thomas on 04/06/15.
 */
var DAO = require('../models/DAOWidget.js');


exports.run = function (req, res, connection, callback) {
    DAO.getContentList(connection, function(listContent) {
        callback({listContent: listContent});
    });
};

exports.addContent = function addContent(connection, newContentList, startIndex, callback, io){
    DAO.addContent(connection, newContentList[startIndex], function(){
        if (startIndex == newContentList.length-1){
            //TODO idWidget
            DAO.getContentList(connection, function(listContent){
                io.sockets.emit('refreshContent', {context: {idWidget: 1}, data: {listContent: listContent}});
                callback();
            });
        } else {
            addContent(connection, newContentList, startIndex+1, callback, io);
        }
    });
};

exports.updateContentStatus = function(connection, info, socket, callback){
    DAO.updateContentStatus(connection, info.data.idContent, info.data.active, function(){
        DAO.getContentList(connection, function(listContent){
            callback();
            socket.emit('refreshContent', {context: {idWidget: info.context.idWidget}, data: {listContent: listContent}});
            socket.broadcast.emit('refreshContent', {context: {idWidget: info.context.idWidget}, data: {listContent: listContent}});
        })
    })
};

exports.deleteContent = function(connection, info, socket, callback){
    DAO.deleteContent(connection, info.data.idContent, function(){
        DAO.getContentList(connection, function(listContent){
            callback();
            socket.emit('refreshContent', {context: {idWidget: info.context.idWidget}, data: {listContent: listContent}});
            socket.broadcast.emit('refreshContent', {context: {idWidget: info.context.idWidget}, data: {listContent: listContent}});
        })
    })
};