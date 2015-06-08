/**
 * Created by Tanguy on 08/06/15.
 */

var widgetVisitor = require('../../../controllers/widgetVisitor.js');

exports.run = function (req, res, connection) {
    // TODO idWidget
    widgetVisitor.run(connection, {idWidget: 2}, function(info){
        res.render("youtubevideoVisitor", {context: {sessionId: req.visitorSession.idSession, idWidget: 2,
                                                        activeWidgetsList: info.context.activeWidgetsList},
                                            data: info.data});
    });
};

exports.voteContent = function(connection, info, io){
    widgetVisitor.voteContent(connection, info, io, function(){});
};
