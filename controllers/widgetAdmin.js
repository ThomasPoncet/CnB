/**
 * Created by thomas on 04/06/15.
 */
var DAO = require('../models/DAOWidget.js');
var widgetContent = require('./widgetContent.js');


exports.run = function (connection, info, callback) {
    DAO.getContentList(connection, {idWidget: info.context.idWidget}, function(contentList) {
        callback({contentList: contentList});
    });
};

exports.addContent = function addContent(connection, info, startIndex, io, callback){
    DAO.addContent(connection, info.data.newContentList[startIndex], function(){
        if (startIndex == info.data.newContentList.length-1){
            widgetContent.refreshContent(connection, info, io, callback);
        } else {
            addContent(connection, info, startIndex+1, io, callback);
        }
    });
};

exports.updateContentStatus = function(connection, info, io, callback){
    DAO.updateContentStatus(connection, info.data.idContent, info.data.active, function(){
        widgetContent.refreshContent(connection, info, io, callback);
    });
};

exports.deleteContent = function(connection, info, io, callback){
    DAO.deleteContent(connection, info.data.idContent, function(){
        widgetContent.refreshContentVotes(connection, info, io, callback);
    });
};