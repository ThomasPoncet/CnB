/**
 * Created by thomas on 05/06/15.
 */


var DAO = require('../models/DAOWidget.js');
var widgetContent = require('./widgetContent.js');

exports.run = function(connection, info, callback) {
    callback({});
};

exports.nextContent = function(connection, info, io, callback){
    DAO.getFirstContent(connection, info, function(rows){
        // To delete this content from the playlist
        DAO.deleteVote(connection, rows[0].idContent, function(){
            DAO.updateContentStatus(connection, rows[0].idContent, false, function(){
                widgetContent.refreshContentVotes(connection, info, io, function(){
                    callback(rows[0]);
                });
            });
        });
    });
};