/**
 * Created by ensimag on 31/05/15.
 */
/**
 * Created by Lucas on 29/05/15.
 */

var DAOZWScreen = require('../models/DAOZWScreen.js');


getWidgets = function(connection, callback) {

    DAOZWScreen.getWidgetList(connection, function(list) {
        callback(list);
    });

};

exports.run=function(req, res, connection) {


    getWidgets(connection, function(list) {
        res.render("adminZWScreen", {listWidgets : list});
    });

};