/**
 * Created by Tanguy on 02/06/15.
 */

var DAOWidget = require('../models/DAOWidget.js');

exports.run=function(req, res, connection) {
    res.render("visitorWidgets");
};