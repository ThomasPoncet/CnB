/**
 * Created by Tanguy on 01/06/15.
 */

/**
 * Created by Tanguy on 27/05/15.
 */

var widgetVisitor = require('../../../controllers/widgetVisitor.js');

exports.run = function (req, res, connection) {
    // TODO idWidget
    widgetVisitor.run(connection, {idWidget: 1}, function(data){
        res.render("musicVisitor", {context: {sessionId: req.visitorSession.idSession, idWidget: 1},
                                    data: data});
    });
};

exports.voteContent = function(connection, info, io){
    widgetVisitor.voteContent(connection, info, io, function(){});
};
