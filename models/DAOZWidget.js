/**
 * Created by Lucas on 01/06/15.
 */


exports.getZWidgetList = function(connection, callback) {

    connection.query('SELECT nomWidgetZone FROM cnb.widgetzone', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });

};