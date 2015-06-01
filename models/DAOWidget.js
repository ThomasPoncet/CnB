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

    // Content list with the number of vote
    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, COUNT(*) AS nbVote ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent ' +
        'GROUP BY idContent', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });

};

exports.getVoteVisitorList = function(idWidget, connection, callback) {

    // vote of each visitor for the widget "idWidget"

    connection.query('SELECT v.idVisitor, c.idContent ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent AND c.idWidget=1', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        var listVoteVisitor = new Object();

        for(var i=0; i<rows.length; i++) {
            listVoteVisitor[rows[i].idVisitor] = rows[i].idContent;
        }

        callback(listVoteVisitor);
    });

};
