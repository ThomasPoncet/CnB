/**
 * Created by thomas on 05/06/15.
 */

var DAO = require('../models/DAOWidget.js');

exports.run = function (connection, info, callback) {
    // TODO : idWidget
    DAO.getContentList(connection, {idWidget: info.idWidget}, function(listContent) {
        DAO.getVoteVisitorList(connection, {idWidget: info.idWidget}, function(listVotes){
            callback({listContent: listContent, listVotes: listVotes});
        });
    });
};