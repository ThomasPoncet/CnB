/**
 * Created by thomas on 22/06/15.
 */


var widgetVisitor = require('../../../controllers/widgetVisitor.js');

exports.run = function (req, res, connection) {
    // TODO idWidget
    widgetVisitor.run(connection, {idWidget: 6}, function(info){
        res.render("deezerVisitor", {context: {sessionId: req.visitorSession.idSession, idWidget: 6,
                                                        activeWidgetsList: info.context.activeWidgetsList},
                                            data: info.data});
    });
};

exports.voteContent = function(connection, info, io){
    widgetVisitor.voteContent(connection, info, io, function(){});
};
