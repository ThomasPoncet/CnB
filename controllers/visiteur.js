/**
 * Created by Tanguy on 27/05/15.
 */

var DAOWidget = require('../models/DAOWidget.js');

getActiveWidgetList = function(connection, callback) {

    DAOWidget.getActiveWidgetList(connection, function(list) {
        callback(list)
    });

};

exports.refreshMenu = function(connection, socket) {
    getActiveWidgetList(connection, function(list) {
        socket.emit("refreshMenu", {listActiveWidget: list});
        socket.broadcast.emit("refreshMenu", {listActiveWidget: list});
    });
};

exports.run = function(req, res, connection) {
    DAOWidget.getActiveWidgetList(connection, function(activeWidgetsList){
        res.render("visiteur", {context: {activeWidgetsList: activeWidgetsList}});
    });
};