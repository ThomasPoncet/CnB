/**
 * Created by Lucas on 27/05/15.
 */

var DAOZWidget = require('../models/DAOZWidget.js');
getZonesWidgets = function(connection, callback) {

    DAOZWidget.getZWidgetList(connection, function(list) {
        callback(list);
    });
};


exports.run=function(req, res, connection) {


    getZonesWidgets(connection, function(list) {
        res.render("admin", {listZonesWidget : list});
    });

};