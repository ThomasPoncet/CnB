/**
 * Created by Tanguy on 02/06/15.
 */

var DAOWidget = require('../models/DAOWidget.js');

getWidgetList = function(connection, callback) {

    DAOWidget.getWidgetList(connection, function(list) {
        callback(list)
    });

};

getZoneWidgetList = function(connection, callback) {

    DAOWidget.getZoneWidgetList(connection, function(list) {
        callback(list)
    });

};

exports.actionSuggest = function(idZoneWidget, connection, callback)
{
    DAOWidget.changeEndVote(idZoneWidget, connection, function() {
        callback();
    });
};

getVoteVisitorWidgetList = function(connection, callback) {

    // TODO idWidget
    DAOWidget.getVoteVisitorWidgetList(connection, function(list) {
        callback(list)
    });

};

exports.refreshListWidgets = function(connection, socket) {
    getWidgetList(connection, function(list) {
        getZoneWidgetList(connection, function(list2) {
            getVoteVisitorWidgetList(connection, function(list3) {
                socket.emit("refreshListWidgets", {listWidget: list, listZoneWidget: list2, listVoteVisitorWidget: list3});
                socket.broadcast.emit("refreshListWidgets", {listWidget: list, listZoneWidget: list2, listVoteVisitorWidget: list3});
            });
        });
    });
};

// very similar to actionVoteMusic
exports.actionVoteWidget = function(idSession, idWidget, idWidgetZone, connection, callback) {
    DAOWidget.visitorExists(connection, idSession, function(result) {

        // visitor not registered -> we add him in database

        if(!result) {
            DAOWidget.addVisitor(connection, idSession);
        }


        // How much time visitor vote for this zone widget ?
        DAOWidget.nbVoteWidgetVisitor(idSession, idWidgetZone, connection, function(oldVote, nbVote) {

            // Visitor didn't vote yet -> we add vote
            if(nbVote == 0) {
                DAOWidget.addVoteWidget(idSession, idWidget, connection, function() {
                    callback();
                });
            }
            // Visitor already voted -> we update vote
            else {
                DAOWidget.updateVoteWidget(idSession, idWidget, oldVote, connection, function() {
                    callback();
                });
            }

        });

    });
};

exports.updateWidgets = function(idZoneWidget, connection, socket, callback) {

    DAOWidget.resetTimer(idZoneWidget, connection, function() {
        DAOWidget.maxVoteWidget(idZoneWidget, connection, function(idWidgetMax) {
            DAOWidget.changeActivatedWidget(idZoneWidget, idWidgetMax, connection, function() {
                DAOWidget.resetVoteWidget(idZoneWidget, connection, function() {
                    callback();
                })
            })
        })
    })
};

exports.run = function(req, res, connection) {
    getWidgetList(connection, function(list) {
        getZoneWidgetList(connection, function(list2) {
            getVoteVisitorWidgetList(connection, function(list3) {
                res.render("visitorWidgets", {
                    listWidget: list, listZoneWidget: list2
                    , sessionId: req.visitorSession.idSession
                    , listVoteVisitorWidget: list3
                });
            });
        });
    });
};