/**
 * Created by Lucas on 29/05/15.
 */

var DAOZWSound = require('../models/DAOZWSound.js');


getSoundWidgets = function(connection, callback) {

    DAOZWSound.getWidgetList(connection, function(list) {
        callback(list);
    });

};

exports.run=function(req, res, connection) {

    getSoundWidgets(connection, function(list) {
        res.render("adminZWSound", {listWidgets : list});
    });

};
