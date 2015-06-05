/**
 * Created by Tanguy on 27/05/15.
 */
exports.refreshNotificationSuggest = function(name, connection, socket) {
    var message = 'New suggest : ' + name;
    var color = 'red';
    var thumb = false;

    refreshNotification(message, color, thumb, connection, socket);
};

exports.refreshNotificationVoteContent = function(name, connection, socket) {
    var message = 'New vote : ' + name;
    var color = 'blue';
    var thumb = true;

    refreshNotification(message, color, thumb, connection, socket);
};

exports.refreshNotificationVoteWidget = function(name, connection, socket) {
    var message = 'New vote : ' + name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    var color = 'orange';
    var thumb = true;

    refreshNotification(message, color, thumb, connection, socket);
};

refreshNotification = function(message, color, thumb, connection, socket) {
    socket.emit('notification', {message:message, color:color, thumb:thumb});
    socket.broadcast.emit('notification', {message:message, color:color, thumb:thumb});
};

exports.run = function(req, res, connection) {
    res.render("diff");
};