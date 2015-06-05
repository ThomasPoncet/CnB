/**
 * Created by Tanguy on 01/06/15.
 */

/**
 * Created by Tanguy on 27/05/15.
 */

var DAOWidget = require('../../../models/DAOWidget.js');
var widgetVisitor = require('../../../controllers/widgetVisitor.js');

//getWidgetList = function(connection, callback) {
//
//    DAOWidget.getWidgetList(connection, function(list) {
//        callback(list)
//    });
//
//};
//
//getContentList = function(connection, callback) {
//
//    DAOWidget.getContentList(connection, function(list) {
//        callback(list)
//    });
//
//};
//
//getVoteVisitorList = function(connection, callback) {
//
//    // TODO idWidget
//    DAOWidget.getVoteVisitorList(1, connection, function(list) {
//        callback(list)
//    });
//
//};

exports.run = function (req, res, connection) {
    // TODO idWidget
    widgetVisitor.run(connection, {idWidget: 1}, function(data){
        res.render("musicVisitor", {context: {sessionId: req.visitorSession.idSession, idWidget: 1},
                                    data: data});
    });


    //getContentList(connection, function(list) {
    //    getVoteVisitorList(connection, function(list2) {
    //        // We pass also the visitor's idSession to the view
    //        res.render("musicVisitor", {listContent: list, listVoteVisitor: list2,
    //                                    sessionId: req.visitorSession.idSession});
    //    });
    //});

};

exports.refreshVoteMusic = function(connection, socket) {
    getContentList(connection, function(list) {

            getVoteVisitorList(connection, function(list2) {
                // Refresh for the user who voted
                socket.emit("voteMusicDone", {listContent: list, listVoteVisitor: list2});

                // Refresh for the others
                socket.broadcast.emit("voteMusicDone", {listContent: list, listVoteVisitor: list2});
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
