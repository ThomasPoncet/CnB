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
        socket.emit("refresh", {listActiveWidget: list});
        socket.broadcast.emit("refresh", {listActiveWidget: list});
    });
};

exports.run=function(req, res, connection) {
    res.render("visiteur");
};