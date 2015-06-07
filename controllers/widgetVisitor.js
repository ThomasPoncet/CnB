/**
 * Created by thomas on 05/06/15.
 */

var DAOWidget = require('../models/DAOWidget.js');
var widgetContent = require('./widgetContent.js');

exports.run = function (connection, info, callback) {
    // TODO : idWidget
    DAOWidget.getContentList(connection, {idWidget: info.idWidget}, function(contentList) {
        DAOWidget.getVoteVisitorList(connection, {idWidget: info.idWidget}, function(listVotes){
            callback({contentList: contentList, listVotes: listVotes});
        });
    });
};

exports.voteContent = function(connection, info, io, callback){
    DAOWidget.visitorExists(connection, info.data.idVisitor, function(result) {
        // visitor not registered -> we add him in database
        if(!result) {
            DAOWidget.addVisitor(connection, info.data.idVisitor);
        }
        // How much time visitor vote for this widget ?
        DAOWidget.nbVote(info.data.idVisitor, info.context.idWidget, connection, function(oldVote, nbVote) {
            // Visitor didn't vote yet -> we add vote
            if(nbVote == 0) {
                DAOWidget.addVote(info.data.idVisitor, info.data.idContent, connection, function() {
                    widgetContent.refreshContentVotes(connection, info, io, callback);
                });
            }
            // Visitor already voted -> we update vote
            else {
                DAOWidget.updateVote(info.data.idVisitor, info.data.idContent, oldVote, connection, function() {
                    widgetContent.refreshContentVotes(connection, info, io, callback);
                });
            }
        })
    });
};
