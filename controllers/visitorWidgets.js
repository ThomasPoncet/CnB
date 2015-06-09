/**
 * Created by Tanguy on 02/06/15.
 */

var DAOWidget = require('../models/DAOWidget.js');


exports.actionSuggest = function(idZoneWidget, connection, callback) {
    DAOWidget.changeEndVote(idZoneWidget, connection, function() {
        callback();
    });
};

exports.refreshListWidgets = function(connection, io) {
    DAOWidget.getWidgetList(connection, function(widgetList) {
        DAOWidget.getZoneWidgetList(connection, function(zoneWidgetList) {
            DAOWidget.getVoteVisitorWidgetList(connection, function(votesWidgetList) {
                io.emit("refreshActiveWidgetsList", {activeWidgetsList: widgetList, listZoneWidget: zoneWidgetList, listVoteVisitorWidget: votesWidgetList});
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

exports.updateWidgets = function(idZoneWidget, connection, callback) {
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
    DAOWidget.getWidgetList(connection, function(widgetList) {
        DAOWidget.getZoneWidgetList(connection, function(zoneWidgetList) {
            DAOWidget.getVoteVisitorWidgetList(connection, function(votesWidgetList) {
                DAOWidget.getActiveWidgetList(connection, function(activeWidgetsList){
                    res.render("visitorWidgets", {context: {activeWidgetsList: activeWidgetsList},
                        data: {listWidget: widgetList, listZoneWidget: zoneWidgetList
                        , sessionId: req.visitorSession.idSession
                        , listVoteVisitorWidget: votesWidgetList}
                    });
                });
            });
        });
    });
};