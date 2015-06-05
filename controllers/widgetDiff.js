/**
 * Created by thomas on 05/06/15.
 */


var DAO = require('../models/DAOWidget.js');

exports.run = function(req, res, connection, callback) {
    // DAO.get
    callback({});
};

exports.nextContent = function(req, res, connection, io, callback){
    DAO.getFirstContent(connection, function(rows){
        callback(rows[0]);

        // To delete this song from the playlist
        DAO.deleteVote(connection, rows[0].idContent, function(){
            DAO.updateContentStatus(connection, rows[0].idContent, false, function(){
                DAO.getContentList(connection, function(listContent) {
                    // TODO : idWidget
                    io.sockets.emit('refreshContent', {context: {idWidget: 1}, data: {listContent: listContent}});
                    // TODO : We have to refresh local variable vote (in client side musicVisitor) !!!
                });
            });
        });
    });
};