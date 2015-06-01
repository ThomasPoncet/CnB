/**
 * Created by Tanguy on 27/05/15.
 */

var DAOWidget = require('../models/DAOWidget.js');

getWidgetList = function(connection, callback) {

    DAOWidget.getWidgetList(connection, function(list) {
       callback(list)
    });

};

getContentList = function(connection, callback) {

    DAOWidget.getContentList(connection, function(list) {
        callback(list)
    });

};

getVoteVisitorList = function(connection, callback) {

    // TODO idWidget
    DAOWidget.getVoteVisitorList(1, connection, function(list) {
        callback(list)
    });

};

exports.run = function (req, res, connection) {

    getWidgetList(connection, function(list) {

        getContentList(connection, function(list2) {

            res.render("visiteur", {listWidget: list, listContent: list2});
        });

    });

};

exports.refreshVoteMusic = function(connection, socket) {
    getWidgetList(connection, function(list) {

        getContentList(connection, function(list2) {
            console.log('liste contenu : ',list2);
            getVoteVisitorList(connection, function(list3) {
                // Refresh for the user who voted
                socket.emit("voteMusicDone", {listWidget: list, listContent: list2, listVoteVisitor: list3});

                // Refresh for the others
                socket.broadcast.emit("voteMusicDone", {listWidget: list, listContent: list2, listVoteVisitor: list3});
            });
        });

    });
}

exports.actionVoteMusic = function(idVisitor, idContent, idWidget, connection, callback) {

    connection.query('SELECT COUNT(*) AS visitorExist ' +
        'FROM cnb.visitor ' +
        'WHERE idVisitor = "' + idVisitor + '"', function(err, rows, fields) {

        // visitor not registered -> we add him in database
        if(rows[0].visitorExist == 0) {
            connection.query('INSERT INTO cnb.visitor(idVisitor) ' +
                'VALUES("' + idVisitor + '")', function (err, rows, fields) {
// TODO : raise err ?
            });
        }

        // How much time visitor vote for this widget ?
        connection.query('SELECT c.idContent, COUNT(*) AS nbVoteVisitor ' +
            'FROM cnb.content c, cnb.vote_content v ' +
            'WHERE c.idContent = v.idContent AND idVisitor ="' + idVisitor + '" AND idWidget=' + idWidget +
            ' GROUP BY c.idContent', function(err, rows, fields) {

            // Visitor didn't vote yet -> we add vote
            if(rows.length == 0) {
                connection.query('INSERT INTO cnb.vote_content(idVisitor,idContent) ' +
                    'VALUES("' + idVisitor + '",' + idContent + ')', function (err, rows, fields) {

                    if (err)
                        console.log('Error while performing Query. ', idVisitor, idContent);

                    callback();
                });
            }
            // Visitor already voted -> we update vote
            else {
                connection.query('UPDATE cnb.vote_content SET ' +
                    'idContent = '+ idContent +' WHERE idVisitor="' + idVisitor + '" AND idContent =' + rows[0].idContent, function (err, rows, fields) {

                    if (err)
                        console.log('Error while performing Query. ', idVisitor, idContent);

                    callback();

                });
            }

        });

    });

};
