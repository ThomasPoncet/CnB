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

vote = function(idContent, idVisitor, connection, callback) {

    //DAOWidget.vote(idContent, idVisitor, connection, function(returnCode) {
    //    callback(returnCode)
    //});

    console.log("bonjour", idContent);

};

exports.run = function (req, res, connection) {
    //vote(1,2,connection, function(test) {
    //    console.log(test);
    //});
    getWidgetList(connection, function(list) {

        getContentList(connection, function(list2) {
            res.render("visiteur", {listWidget: list, listContent: list2});
        });

    });

};

exports.actionvote = function() {

    // met en base le vote
    connection.query('INSERT INTO cnb.vote_content(idVisitor,idContent) ' +
                     'VALUES(1,1)', function(err, rows, fields) {
        io.sockets.emit("vote", {id: data.id, name: data.name});
    });

}
