/**
 * Created by Tanguy on 27/05/15.
 */
var DAO = require('../models/DAOZoneWidget.js');

exports.run=function(req, res, connexion){
    res.render("admin", {zoneWidgetSon : 'ZoneSon', zoneWidgetEcran : 'Ecran'} )
}