/**
 * Created by Tanguy on 02/06/15.
 */

var DAOWidget = require('../models/DAOWidget.js');

getWidgetList = function(connection, callback) {

    DAOWidget.getWidgetList(connection, function(list) {
        callback(list)
    });

};

exports.refreshListWidgets = function(connection, socket) {
    getWidgetList(connection, function(list) {
        socket.emit("refreshListWidgets", {listWidget: list});
        socket.broadcast.emit("refreshListWidgets", {listWidget: list});
    });
};

exports.run=function(req, res, connection) {
    res.render("visitorWidgets");
};