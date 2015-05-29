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

exports.run = function (req, res, connection) {

    getWidgetList(connection, function(list) {

        getContentList(connection, function(list2) {
            res.render("visiteur", {listWidget: list, listContent: list2});
        });

    });

};

