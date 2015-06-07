/**
 * Created by thomas on 06/06/15.
 */

var DAO = require('../models/DAOWidget.js');


exports.refreshContentVotes = function(connection, info, io, callback) {
    DAO.getContentList(connection, info.context, function(contentList){
        DAO.getVoteVisitorList(connection, info.context, function(votesList){
            io.emit('refreshContentVotes', {context: info.context, data: {contentList: contentList, votesList: votesList}});
            callback();
        });
    });
};

exports.refreshContent = function(connection, info, io, callback) {
    DAO.getContentList(connection, info.context, function(contentList){
        io.emit('refreshContent', {context: info.context, data: {contentList: contentList}});
        callback();
    });
};