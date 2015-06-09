/**
 * Created by Tanguy on 27/05/15.
 */

var DAOWidget = require('../models/DAOWidget.js');

exports.refreshMenu = function(connection, io) {
    DAOWidget.getActiveWidgetList(connection, function(activeWidgetsList) {
        io.emit("refreshMenu", {activeWidgetsList: activeWidgetsList});
    });
};

exports.run = function(req, res, connection) {
    DAOWidget.getActiveWidgetList(connection, function(activeWidgetsList){
        res.render("visiteur", {context: {activeWidgetsList: activeWidgetsList}});
    });
};