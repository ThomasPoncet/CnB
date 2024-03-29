/**
 * Created by Tanguy on 27/05/15.
 */

exports.getWidgetList = function(connection, callback) {

    connection.query('SELECT w.idWidget, w.nomWidget, w.idWidgetZone, w.active, IFNULL(v.count,0) AS nbVote, IFNULL(z.idWidgetZone!=0, false) AS selectioned ' +
    'FROM cnb.widget w LEFT JOIN (  ' +
    '   SELECT idWidget, COUNT(idVisitor) AS count ' +
    '   FROM cnb.vote_widget GROUP BY idWidget) AS v ON w.idWidget = v.idWidget '+
    'LEFT JOIN ( ' +
    '   SELECT idWidgetZone, currentWidget ' +
    '   FROM cnb.widgetzone) AS z ON w.idWidget = z.currentWidget ' +
    'ORDER BY w.idWidget', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [0]');

        callback(rows);
    });


};

exports.getZoneWidgetList = function(connection, callback) {

    connection.query('SELECT idWidgetZone, nomWidgetZone, currentWidget, endVote FROM cnb.widgetzone', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [0]');

        callback(rows);
    });


};

exports.changeEndVote = function(idZoneWidget, connection, callback)
{
    // The vote finish into "actual time + 5 minutes"
    connection.query('UPDATE cnb.widgetzone SET endVote = DATE_ADD(NOW(), INTERVAL 20 SECOND) ' +
                     'WHERE idWidgetZone=' + idZoneWidget, function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [0]', idZoneWidget);

        callback();
    });
};

exports.getActiveWidgetList = function(connection, callback) {

    connection.query('SELECT w.idWidget, w.nomWidget, w.idWidgetZone, w.active ' +
    'FROM cnb.widget w, cnb.widgetzone z ' +
    'WHERE w.idWidget = z.currentWidget AND w.active = true', function(err, rows, fields) {

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

exports.getContentList = function(connection, data, callback) {

    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, c.active, IFNULL(v.count,0) AS nbVote ' +
        '    FROM cnb.content AS c ' +
        '    LEFT JOIN ( ' +
        '        SELECT idContent, COUNT(idVisitor) AS count ' +
        '    FROM cnb.vote_content ' +
        '    GROUP BY idContent ' +
        '    ) AS v ' +
        '    ON c.idContent = v.idContent ' +
        '   WHERE c.idWidget = '+data.idWidget +
        '   ORDER BY nbVote desc', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query getContentList. [3] - '+err);

        callback(rows);
    });

};

exports.addContent = function(connection, data, callback) {
    connection.query('INSERT INTO cnb.content (nomContent, link, idWidget, active)' +
        '   VALUES ("'+data.name+'", "'+data.link+'", '+data.idWidget+', '+data.active+');',
        function(err) {
            if (err) {
                console.log('Error while performing Query addContent. [4]');
            }
            callback();
        });
};

exports.deleteVote = function(connection, idContent, callback) {
    connection.query('DELETE FROM cnb.vote_content WHERE idContent = ' + idContent, function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query. [5]');

        callback();
    });
};


exports.getFirstContent = function(connection, info, callback) {

    var idWidget = info.context.idWidget;

    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, c.active, IFNULL(v.count,0) AS nbVote ' +
        '    FROM cnb.content AS c ' +
        '    LEFT JOIN ( ' +
        '        SELECT idContent, COUNT(idVisitor) AS count ' +
        '    FROM cnb.vote_content ' +
        '    GROUP BY idContent ' +
        '    ) AS v ' +
        '    ON c.idContent = v.idContent ' +
        '   WHERE active = true AND idWidget='+ idWidget +
        '   ORDER BY nbVote desc' +
        '   LIMIT 1', function(err, rows, fields) {
        // TODO : If there is no content !
        if (err)
            console.log('Error while performing Query. [6]');

        callback(rows);
    });

};

exports.getVoteVisitorList = function(connection, data, callback) {

    // vote of each visitor for the widget "data.idWidget"

    connection.query('SELECT v.idVisitor, c.idContent ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent AND c.idWidget='+data.idWidget, function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. [7] getVoteVisitorList');

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
            console.log('Error while performing Query nbVote. [10]');

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

exports.nbVoteWidgetVisitor = function(idVisitor, idWidgetZone, connection, callback) {

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

exports.resetTimer = function(idZoneWidget, connection, callback) {
    connection.query('UPDATE cnb.widgetzone SET endVote = NULL ' +
                     'WHERE idWidgetZone=' + idZoneWidget, function (err, rows, fields) {

        if (err)
            console.log('Error while performing Query. resetTimer [15]',idVisitor, idWidget, oldVote);

        callback();
    })


};

exports.maxVoteWidget = function(idZoneWidget, connection, callback) {

    connection.query('SELECT w.idWidget, COUNT(*) AS nbVote ' +
                     'FROM cnb.widget w, cnb.vote_widget v ' +
                     'WHERE w.idWidget = v.idWidget AND w.idWidgetZone=' + idZoneWidget +
                     ' GROUP BY w.idWidget ORDER BY nbVote DESC LIMIT 1', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. maxVoteWidget [16-1]');

        // if there was at least one vote
        if (rows.length > 0) {
            callback(rows[0].idWidget);
        }
        else {
            connection.query('SELECT currentWidget FROM cnb.widgetzone ' +
                'WHERE idWidgetZone=' + idZoneWidget, function(err, rows, fields) {

                if (err)
                    console.log('Error while performing Query. maxVoteWidget [16-2]');

                callback(rows[0].currentWidget);
            })

        }
    })

};

//exports.maxVoteWidget = function(idZoneWidget, connection, callback) {
//
//    connection.query('SELECT w.idWidget, IFNULL(v.count,0) AS nbVote ' +
//        'FROM cnb.widget w LEFT JOIN ( ' +
//        '    SELECT idWidget, COUNT(idVisitor) AS count ' +
//        'FROM cnb.vote_widget GROUP BY idWidget) AS v ON w.idWidget = v.idWidget ' +
//        'LEFT JOIN ( ' +
//        '    SELECT idWidgetZone, currentWidget ' +
//        'FROM cnb.widgetzone) AS z ON w.idWidget = z.currentWidget ' +
//        'WHERE w.idWidgetZone=1 ' +
//        'ORDER BY nbVote DESC LIMIT 1', function(err, rows, fields) {
//
//        if (err)
//            console.log('Error while performing Query. maxVoteWidget [16]');
//
//        var max = 0;
//        if(rows != undefined)
//            max = rows[0].idWidget;
//
//        callback(max);
//    })
//
//};

exports.changeActivatedWidget = function(idZoneWidget, idWidgetMax, connection, callback) {

    connection.query('UPDATE cnb.widgetzone SET currentWidget = ' + idWidgetMax +
        ' WHERE idWidgetZone = ' + idZoneWidget, function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query. changeActivatedWidget [17]');

            callback();
    });
};

exports.resetVoteWidget = function(idZoneWidget, connection, callback) {
    connection.query('SELECT idWidget FROM cnb.widget ' +
        'WHERE idWidgetZone='+ idZoneWidget, function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. resetVoteWidget [18-1]');

        for(var i=0; i<rows.length; i++) {
            connection.query('DELETE FROM cnb.vote_widget WHERE idWidget='+rows[i].idWidget, function(err, rows, fields) {
                if (err)
                    console.log('Error while performing Query. resetVoteWidget [18-2]');
            })

        }
        callback();
    })
}

exports.getNameFromIdContent = function(idContent, connection, callback) {
    connection.query('SELECT nomContent FROM cnb.content ' +
        'WHERE idContent='+ idContent, function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. getNameFromIdContent [19]');

        callback(rows[0].nomContent);
    })
};

exports.getNameFromIdWidget = function(idWidget, connection, callback) {
    connection.query('SELECT nomWidget FROM cnb.widget ' +
        'WHERE idWidget='+ idWidget, function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. getNameFromIdWidget [20]', idWidget);

        callback(rows[0].nomWidget);
    })
}

exports.getNameFromIdWidgetZone = function(idZoneWidget, connection, callback) {
    connection.query('SELECT nomWidgetZone FROM cnb.widgetzone ' +
        'WHERE idWidgetZone='+ idZoneWidget, function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query. getNameFromIdWidgetZone [21]');

        callback(rows[0].nomWidgetZone);
    })
}

exports.reactivateContent = function(connection, info, callback) {

        connection.query('SELECT COUNT(*) as nbActiveContent FROM cnb.content c ' +
            'WHERE c.active=true AND c.idWidget=' + info.context.idWidget, function(err, rows, fields) {

            if (err)
                console.log('Error while performing Query. reactivateContent [22-1]');

            if(rows[0].nbActiveContent == 0) {
                connection.query('SELECT c.idContent FROM cnb.content c ' +
                    ' WHERE c.idWidget=' + info.context.idWidget, function (err, listContent, fields) {

                    if (err)
                        console.log('Error while performing Query. reactivateContent [22-2]');

                    for(var i=0; i<listContent.length; i++) {
                        connection.query('UPDATE cnb.content SET active = true ' +
                            'WHERE idContent ='+ listContent[i].idContent, function(err, rows, fields) {

                            if (err)
                                console.log('Error while performing Query. reactivateContent [22-for]');

                        });

                        if(i == listContent.length-1)
                            callback();

                    }

                })

            }
            else {
                callback();
            }
        })

}