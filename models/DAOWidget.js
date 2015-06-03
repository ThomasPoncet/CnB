/**
 * Created by Tanguy on 27/05/15.
 */

exports.getWidgetList = function(connection, callback) {

    connection.query('SELECT w.idWidget, w.nomWidget, w.idWidgetZone, w.active, IFNULL(v.count,0) AS nbVote ' +
        'FROM cnb.widget AS w ' +
        'LEFT JOIN ( ' +
        '    SELECT idWidget, COUNT(idVisitor) AS count ' +
        'FROM cnb.vote_widget ' +
        'GROUP BY idWidget ' +
        ') AS v ' +
        'ON w.idWidget = v.idWidget', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [0]');

        callback(rows);
    });


};

exports.getZoneWidgetList = function(connection, callback) {

    connection.query('SELECT idWidgetZone, nomWidgetZone, endVote FROM cnb.widgetzone', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [0]');

        callback(rows);
    });


};

exports.changeEndVote = function(idZoneWidget, connection, callback)
{
    // The vote finish into "actual time + 5 minutes"
    connection.query('UPDATE cnb.widgetzone SET endVote = DATE_ADD(NOW(), INTERVAL 5 MINUTE) ' +
                     'WHERE idWidgetZone=' + idZoneWidget, function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [0]', idZoneWidget);

        callback();
    });
};

exports.getActiveWidgetList = function(connection, callback) {

    connection.query('SELECT idWidget, nomWidget, idWidgetZone, active FROM cnb.widget ' +
        'WHERE active=true', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [1]');

        callback(rows);
    });


};

exports.getActiveContentList = function(connection, callback) {

    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, c.active, IFNULL(v.count,0) AS nbVote ' +
        '    FROM cnb.content AS c ' +
        '    LEFT JOIN ( ' +
        '        SELECT idContent, COUNT(idVisitor) AS count ' +
        '    FROM cnb.vote_content ' +
        '    GROUP BY idContent ' +
        '    ) AS v ' +
        '    ON c.idContent = v.idContent ' +
        '    WHERE active = true ' +
        '    ORDER BY nbVote desc', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [2]');

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
            console.log('Error while performing Query. [3]');

        callback(rows);
    });

};

exports.addContent = function(connection, data, callback) {
    connection.query('INSERT INTO cnb.content (nomContent, link, idWidget, active)' +
        '   VALUES ("'+data.originalname+'", "'+data.name+'", 1, true);', // TODO : idWidget
        function(err, rows, fields) {
            if (err)
                console.log('Error while performing Query. [4]');

            callback(rows);
        });
};

exports.deleteVote = function(connection, idContent, callback) {
    connection.query('DELETE FROM cnb.vote_content WHERE idContent = ' + idContent, function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query. [5]');

        callback();
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
        '   WHERE active = true ' +
        '   ORDER BY nbVote desc' +
        '   LIMIT 1', function(err, rows, fields) {
        // TODO : If there is no content !
        if (err)
            console.log('Error while performing Query. [6]');

        callback(rows);
    });

};

exports.getVoteVisitorList = function(idWidget, connection, callback) {

    // vote of each visitor for the widget "idWidget"

    connection.query('SELECT v.idVisitor, c.idContent ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent AND c.idWidget=1', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [7]');

        var listVoteVisitor = new Object();

        for(var i=0; i<rows.length; i++) {
            listVoteVisitor[rows[i].idVisitor] = rows[i].idContent;
        }

        callback(listVoteVisitor);
    });

};

exports.getVoteVisitorWidgetList = function(connection, callback) {

    connection.query('SELECT v.idVisitor, w.idWidget ' +
    'FROM cnb.widget w, cnb.vote_widget v ' +
    'WHERE w.idWidget = v.idWidget', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [7]');

        var listVoteVisitorWidget = new Object();

        for(var i=0; i<rows.length; i++) {
            listVoteVisitorWidget[rows[i].idVisitor] = [];
        }

        for(var i=0; i<rows.length; i++) {
            listVoteVisitorWidget[rows[i].idVisitor].push(rows[i].idWidget);
        }

        callback(listVoteVisitorWidget);
    });

};

exports.visitorExists = function(connection, idVisitor, callback) {
    connection.query('SELECT COUNT(*) AS visitorExist ' +
                     'FROM cnb.visitor ' +
                     'WHERE idVisitor = "' + idVisitor + '"', function(err, rows, fields) {

            if (err)
                console.log('Error while performing Query. [8]');

            callback((rows[0].visitorExist != 0));
        });
};

exports.addVisitor = function(connection, idVisitor) {
    connection.query('INSERT INTO cnb.visitor(idVisitor) ' +
        'VALUES("' + idVisitor + '")', function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [9]');

    });
};

exports.nbVote = function(idVisitor, idWidget, connection, callback) {
    connection.query('SELECT c.idContent, COUNT(*) AS nbVoteVisitor ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent AND idVisitor ="' + idVisitor + '" AND idWidget=' + idWidget +
        ' GROUP BY c.idContent', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [10]');

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
            console.log('Error while performing Query. [11]', idVisitor, idContent);

        callback();
    })
};


exports.updateVote = function(idVisitor, idContent, oldVote, connection, callback) {
    connection.query('UPDATE cnb.vote_content SET ' +
        'idContent = '+ idContent +' WHERE idVisitor="' + idVisitor + '" AND idContent =' + oldVote, function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [12]', idVisitor, idContent);

        callback();
    })
};

exports.nbVoteWidget = function(idVisitor, idWidgetZone, connection, callback) {

    connection.query('SELECT w.idWidget, COUNT(*) AS nbVoteVisitor ' +
    'FROM cnb.widget w, cnb.vote_widget v ' +
    'WHERE w.idWidget = v.idWidget AND idVisitor ="'+ idVisitor +'" AND w.idWidgetZone='+ idWidgetZone + ' ' +
    'GROUP BY w.idWidget', function(err, rows, fields) {



        if (err)
            console.log('Error while performing Query. [10]');

        var nbVote = rows.length;
        var oldWidget = 0;

        if(nbVote != 0) {
            oldWidget = rows[0].idWidget;
        }

        callback(oldWidget, nbVote)
    })


};

exports.addVoteWidget = function(idVisitor, idWidget, connection, callback) {
    connection.query('INSERT INTO cnb.vote_widget(idWidget, idVisitor) ' +
        'VALUES(' + idWidget + ', "' + idVisitor + '")', function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [0]a', idVisitor, idWidget);

        callback();
    })
} ;

exports.updateVoteWidget = function(idVisitor, idWidget, oldVote, connection, callback) {
    connection.query('UPDATE cnb.vote_widget SET ' +
        'idWidget = '+ idWidget +' WHERE idVisitor="' + idVisitor + '" AND idWidget =' + oldVote, function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [0]b',idVisitor, idWidget, oldVote);

        callback();
    })
};


exports.updateContentStatus = function(connection, idContent, active, callback){
    connection.query('UPDATE cnb.content SET ' +
        'active = '+ active +' WHERE idContent=' + idContent, function (err) {

        if (err)
            console.log('Error while performing Query updateContentStatus. [13]');

        callback();
    })
};

exports.deleteContent = function(connection, idContent, callback){
    // TODO : transaction
    connection.query('DELETE FROM cnb.content ' +
        'WHERE idContent=' + idContent, function (err) {

        if (err)
            console.log('Error while performing Query deleteContent in content. [14-1]');

        connection.query('DELETE FROM cnb.vote_content ' +
            'WHERE idContent=' + idContent, function (err) {

            if (err)
                console.log('Error while performing Query deleteContent in vote-content. [14-2]');

            callback();
        });
    });
};
