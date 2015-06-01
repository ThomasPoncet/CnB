/**
 * Created by Lucas on 01/06/15.
 */
exports.getWidgetList = function(connection, callback) {

    connection.query('SELECT widget.nomWidget ' +
        'FROM cnb.widget INNER JOIN cnb.widgetzone ' +
        'ON widget.idWidgetZone = widgetzone.idWidgetZone ' +
        'WHERE widgetzone.nomWidgetZone = "Screen"', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });


};