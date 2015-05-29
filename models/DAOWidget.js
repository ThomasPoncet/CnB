/**
 * Created by Tanguy on 27/05/15.
 */

exports.getWidgetList = function(connection, callback) {

    connection.query('SELECT idWidget, nomWidget FROM cnb.widget', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });


};

exports.getContentList = function(connection, callback) {

    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, COUNT(*) AS nbVote ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent ' +
        'GROUP BY idContent', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });

};