/**
 * Created by Tanguy on 27/05/15.
 */
exports.refreshNotification = function(idContent, connection, socket) {
    socket.emit('notification', {message:idContent.toString(), color:'blue', thumb:true});
    socket.broadcast.emit('notification', {message:idContent.toString(), color:'blue', thumb:true});
};

exports.run = function(req, res, connection) {
    res.render("diff");
};