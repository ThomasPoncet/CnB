/**
 * Created by thomas on 29/05/15.
 */

var DAO = require('../models/DAOAdmin.js');


getContentList = function(connection, callback) {

    DAO.getContentList(connection, function(list) {
        callback(list)
    });

};

exports.run = function (req, res, connection) {

        getContentList(connection, function(list) {
            res.render("musicAdmin", {listContent: list});
        });


};