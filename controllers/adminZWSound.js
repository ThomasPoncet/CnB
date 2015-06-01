/**
 * Created by Lucas on 29/05/15.
 */

var DAOZWSound = require('../models/DAOZWSound.js');


getWidgets = function(connection, callback) {

    DAOZWSound.getWidgetList(connection, function(list) {
        callback(list);
    });

};

exports.run=function(req, res, connection) {


    getWidgets(connection, function(list) {
        res.render("adminZWSound", {listWidgets : list});
    });

};

/*
function getListWidgets() {
    var listWidgetsSound = new Array();
    listWidgetsSound[0] = "Music";
    listWidgetsSound[1] = "Announcements";

    return listWidgetsSound;
}
*/