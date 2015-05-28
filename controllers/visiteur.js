/**
 * Created by Tanguy on 27/05/15.
 */

var DAOWidget = require('../models/DAOWidget.js');

getWidgetList = function(connection) {

    connection.query('SELECT idWidget, nomWidget FROM cnb.widget', function(err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');

        return rows;
    });


}

exports.run = function (req, res, connection) {

    var test = getWidgetList(connection);

    console.log('aaa : ', test);
    res.render("visiteur", {name: 'Tanguy'});


};