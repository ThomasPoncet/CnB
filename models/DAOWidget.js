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

    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, IFNULL(v.count,0) AS nbVote ' +
        '    FROM cnb.content AS c ' +
        '    LEFT JOIN ( ' +
        '        SELECT idContent, COUNT(idVisitor) AS count ' +
        '    FROM cnb.vote_content ' +
        '    GROUP BY idContent ' +
        '    ) AS v ' +
        '    ON c.idContent = v.idContent ' +
        '   ORDER BY nbVote desc', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });

};

exports.addContent = function(connection, data, callback) {
    connection.query('INSERT INTO cnb.content (nomContent, link, idWidget)' +
        '   VALUES ("'+data.originalname+'", "'+data.name+'", 1);', // TODO : idWidget
        function(err, rows, fields) {
            if (err)
                console.log('Error while performing Query.');

            callback(rows);
        });
};

exports.getFirstContent = function(connection, callback) {

    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, IFNULL(v.count,0) AS nbVote ' +
        '    FROM cnb.content AS c ' +
        '    LEFT JOIN ( ' +
        '        SELECT idContent, COUNT(idVisitor) AS count ' +
        '    FROM cnb.vote_content ' +
        '    GROUP BY idContent ' +
        '    ) AS v ' +
        '    ON c.idContent = v.idContent ', function(err, rows, fields) {

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
