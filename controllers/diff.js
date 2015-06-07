/**
 * Created by Tanguy on 27/05/15.
 */

var DAO = require('../models/DAOWidget.js');

exports.refreshNotificationSuggest = function(info, connection, io) {
    DAO.getNameFromIdWidgetZone(info.idZoneWidget, connection, function(name){
        var message = 'New suggest : ' + name;
        var color = 'red';
        var thumb = false;
        refreshNotification(message, color, thumb, io);
    });
};

exports.refreshNotificationVoteContent = function(info, connection, io) {
    DAO.getNameFromIdContent(info.data.idContent, connection, function(name){
        var message = 'New vote : ' + name;
        var color = 'blue';
        var thumb = true;
        refreshNotification(message, color, thumb, io);
    });
};

exports.refreshNotificationVoteWidget = function(info, connection, io) {
    DAO.getNameFromIdWidget(info.data.idWidget, connection, function(name){
        var message = 'New vote : ' + name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
        var color = 'orange';
        var thumb = true;
        refreshNotification(message, color, thumb, io);
    });
};

function refreshNotification(message, color, thumb, io) {
    io.emit('diffNotification', {message:message, color:color, thumb:thumb});
};

exports.run = function(req, res, connection) {
    DAO.getActiveWidgetList(connection, function(list) {
        res.render("diff", {listWidget: list});
    })

};