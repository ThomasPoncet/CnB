/**
 * Created by Tanguy on 27/05/15.
 */

exports.getWidgetList = function(connection, callback) {

    connection.query('SELECT idWidget, nomWidget, idWidgetZone FROM cnb.widget', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [0]');

        callback(rows);
    });


};

exports.getActiveWidgetList = function(connection, callback) {

    connection.query('SELECT idWidget, nomWidget, idWidgetZone FROM cnb.widget ' +
        'WHERE active=1', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [1]');

        callback(rows);
    });


};

exports.getContentList = function(connection, callback) {

    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, c.active, IFNULL(v.count,0) AS nbVote ' +
        '    FROM cnb.content AS c ' +
        '    LEFT JOIN ( ' +
        '        SELECT idContent, COUNT(idVisitor) AS count ' +
        '    FROM cnb.vote_content ' +
        '    GROUP BY idContent ' +
        '    ) AS v ' +
        '    ON c.idContent = v.idContent ' +
        '   ORDER BY nbVote desc', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [2]');

        callback(rows);
    });

};

exports.addContent = function(connection, data, callback) {
    connection.query('INSERT INTO cnb.content (nomContent, link, idWidget, active)' +
        '   VALUES ("'+data.originalname+'", "'+data.name+'", 1, true);', // TODO : idWidget
        function(err, rows, fields) {
            if (err)
                console.log('Error while performing Query. [3]');

            callback(rows);
        });
};

exports.getFirstContent = function(connection, callback) {

    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, c.active, IFNULL(v.count,0) AS nbVote ' +
        '    FROM cnb.content AS c ' +
        '    LEFT JOIN ( ' +
        '        SELECT idContent, COUNT(idVisitor) AS count ' +
        '    FROM cnb.vote_content ' +
        '    GROUP BY idContent ' +
        '    ) AS v ' +
        '    ON c.idContent = v.idContent ' +
        '   ORDER BY nbVote desc' +
        '   LIMIT 1', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [4]');

        callback(rows);
    });

};
exports.getVoteVisitorList = function(idWidget, connection, callback) {

    // vote of each visitor for the widget "idWidget"

    connection.query('SELECT v.idVisitor, c.idContent ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent AND c.idWidget=1', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [5]');

        var listVoteVisitor = new Object();

        for(var i=0; i<rows.length; i++) {
            listVoteVisitor[rows[i].idVisitor] = rows[i].idContent;
        }

        callback(listVoteVisitor);
    });

};

exports.visitorExists = function(connection, idVisitor, callback) {
    connection.query('SELECT COUNT(*) AS visitorExist ' +
                     'FROM cnb.visitor ' +
                     'WHERE idVisitor = "' + idVisitor + '"', function(err, rows, fields) {

        callback((rows[0].visitorExist != 0));
        });
};

exports.addVisitor = function(connection, idVisitor) {
    connection.query('INSERT INTO cnb.visitor(idVisitor) ' +
        'VALUES("' + idVisitor + '")', function (err, rows, fields) {

    });
};

exports.nbVote = function(idVisitor, idWidget, connection, callback) {
    connection.query('SELECT c.idContent, COUNT(*) AS nbVoteVisitor ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent AND idVisitor ="' + idVisitor + '" AND idWidget=' + idWidget +
        ' GROUP BY c.idContent', function(err, rows, fields) {

        var nbVote = rows.length;
        var oldContent = 0;

        if(nbVote != 0) {
            oldContent = rows[0].idContent;
        }

        callback(oldContent, nbVote)
    })

};

exports.addVote = function(idVisitor, idContent, connection, callback) {
    connection.query('INSERT INTO cnb.vote_content(idVisitor,idContent) ' +
        'VALUES("' + idVisitor + '",' + idContent + ')', function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [6]', idVisitor, idContent);

        callback();
    })
};


exports.updateVote = function(idVisitor, idContent, oldVote, connection, callback) {
    connection.query('UPDATE cnb.vote_content SET ' +
        'idContent = '+ idContent +' WHERE idVisitor="' + idVisitor + '" AND idContent =' + oldVote, function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [7]', idVisitor, idContent);

        callback();
    })
};

exports.updateContentStatus = function(connection, idContent, active, callback){
    connection.query('UPDATE cnb.content SET ' +
        'acitve = '+ active +' WHERE idContent="' + idContent, function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query updateContentStatus.');

        callback();
    })
};
