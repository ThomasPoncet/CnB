/**
 * Created by Lucas on 27/05/15.
 */

var DAOZWidget = require('../models/DAOZWidget.js');
//var auth = require('../public/js/auth.js');

getZonesWidgets = function(connection, callback) {

    DAOZWidget.getZWidgetList(connection, function(list) {
        callback(list);
    });
};

/*authentification = function(req, res, connection, callback){
    auth.setBool(req, res, connection, callback);
}*/

exports.run=function(req, res, connection) {

    getZonesWidgets(connection, function(list) {
        res.render("admin", {listZonesWidget : list});
    });

};