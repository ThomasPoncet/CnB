/**
 * Created by Tanguy on 27/05/15.
 */

var DAOWidget = require('../models/DAOWidget.js');

// Simple function to generate random sessionId
exports.makeId = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

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
    res.render("visiteur");
};