/**
 * Created by Lucas on 08/06/15.
 */
var widgetVisitor = require('../../../controllers/widgetVisitor.js');

exports.run = function (req, res, connection) {
    // TODO idWidget
    widgetVisitor.run(connection, {idWidget: 3}, function(data){
        res.render("videosVisitor", {context: {sessionId: req.visitorSession.idSession, idWidget: 3},
                                    data: data});
    });
};

exports.voteContent = function(connection, info, io){
    widgetVisitor.voteContent(connection, info, io, function(){});
};
