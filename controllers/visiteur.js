/**
 * Created by Tanguy on 27/05/15.
 */

var DAOWidget = require('../models/DAOWidget.js');

getWidgetList = function(connection, callback) {

    DAOWidget.getWidgetList(connection, function(list) {
       callback(list)
    });

};

getContentList = function(connection, callback) {

    DAOWidget.getContentList(connection, function(list) {
        callback(list)
    });

};

getVoteVisitorList = function(connection, callback) {

    // TODO idWidget
    DAOWidget.getVoteVisitorList(1, connection, function(list) {
        callback(list)
    });

};

exports.run = function (req, res, connection) {

    getWidgetList(connection, function(list) {

        getContentList(connection, function(list2) {

            res.render("visiteur", {listWidget: list, listContent: list2});
        });

    });

};

exports.refreshVoteMusic = function(connection, socket) {
    getWidgetList(connection, function(list) {

        getContentList(connection, function(list2) {
            
            getVoteVisitorList(connection, function(list3) {
                // Refresh for the user who voted
                socket.emit("voteMusicDone", {listWidget: list, listContent: list2, listVoteVisitor: list3});

                // Refresh for the others
                socket.broadcast.emit("voteMusicDone", {listWidget: list, listContent: list2, listVoteVisitor: list3});
            });
        });

    });
}

exports.actionVoteMusic = function(idVisitor, idContent, idWidget, connection, callback) {

    DAOWidget.visitorExists(connection, idVisitor, function(result) {

        // visitor not registered -> we add him in database
            if(!result) {
                DAOWidget.addVisitor(connection, idVisitor);
            }

        // How much time visitor vote for this widget ?
        DAOWidget.nbVote(idVisitor, idWidget, connection, function(oldVote, nbVote) {

            // Visitor didn't vote yet -> we add vote
            if(nbVote == 0) {
                DAOWidget.addVote(idVisitor, idContent, connection, function() {
                    callback();
                });
            }
            // Visitor already voted -> we update vote
            else {
                DAOWidget.updateVote(idVisitor, idContent, oldVote, connection, function() {
                    callback();
                });
            }

        });

    });

};
