/**
 * Created by Tanguy on 27/05/15.
 */
//var DAO = require('../models/DAOZoneWidget.js');

exports.run=function(req, res, connexion) {

    res.render("admin", {'listZonesWidget' : getZonesWidgets() })
}

function getZonesWidgets(){
    var listZonesWidgets = new Array();

    listZonesWidgets[0] = "Sound";
    listZonesWidgets[1] = "Screen";

    return listZonesWidgets;
}

/*

function getWidgetsScreen() {
    var listWidgetsScreen = new Array();
    listWidgetsScreen[0] = "Youtube";
    listWidgetsScreen[1] = "Next Trams";
    listWidgetsScreen[2] = "Meteo";

    return listWidgetsScreen;
}
ANCIENNE VERSION ! A mettre dans le controleur Zone-Widget
*/