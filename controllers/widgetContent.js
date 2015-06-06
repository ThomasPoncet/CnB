/**
 * Created by thomas on 06/06/15.
 */

var DAO = require('../models/DAOWidget.js');


exports.refreshContentVotes = function(connection, info, io) {
    DAO.getContentList(connection, info.context, function(contentList){
        DAO.getVoteVisitorList(connection, info.context, function(votesList){
            io.emit('refreshContentVotes', {context: info.context, data: {contentList: contentList, votesList: votesList}});
        });
    });
    //getContentList(connection, function(list) {
    //
    //    getVoteVisitorList(connection, function(list2) {
    //        // Refresh for the user who voted
    //        socket.emit("voteMusicDone", {listContent: list, listVoteVisitor: list2});
    //
    //        // Refresh for the others
    //        socket.broadcast.emit("voteMusicDone", {listContent: list, listVoteVisitor: list2});
    //    });
    //});
};