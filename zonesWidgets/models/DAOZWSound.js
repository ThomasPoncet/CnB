/**
 * Created by Lucas on 01/06/15.
 */

exports.getWidgetList = function(connection, callback) {

    connection.query('SELECT widget.nomWidget, widget.idWidget, widget.active ' +
        'FROM cnb.widget INNER JOIN cnb.widgetzone ' +
        'ON widget.idWidgetZone = widgetzone.idWidgetZone ' +
        'WHERE widgetzone.nomWidgetZone = "Sound"', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });


};

exports.updateVisibleZones = function(connection, data) {

    var idWidget = data.context.idWidget;
    var visible = (data.data.active);
    connection.query('UPDATE cnb.widget SET ' +
        'active=' + visible + ' WHERE idWidget=' + idWidget, function(err, row, fields){
        if (err)
            console.log('Error while performing Query. [12]');

    });
};