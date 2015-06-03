/**
 * Created by Lucas on 31/05/15.
 */

var DAOZWScreen = require('../models/DAOZWScreen.js');


getScreenWidgets = function(connection, callback) {

    DAOZWScreen.getWidgetList(connection, function(list) {
        callback(list);
    });

};

exports.run=function(req, res, connection) {


    getScreenWidgets(connection, function(list) {
        res.render("adminZWScreen", {listWidgets : list});
    });

};