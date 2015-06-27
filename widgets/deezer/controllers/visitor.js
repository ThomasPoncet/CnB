/**
 * Created by thomas on 22/06/15.
 */


var widgetVisitor = require('../../../controllers/widgetVisitor.js');
var widgetAdmin = require('../../../controllers/widgetAdmin.js');

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

exports.addContent = function(req, res, connection, io){
    var newContents = JSON.parse(req.body.newContents);
    var formatedNewContents = [];
    for (var i = 0; i < newContents.length; i++){
        formatedNewContents.push({
            //name: '{title:"'+newContents[i].title+'", artist:"'+newContents[i].artist+
            //    '", album:"'+newContents[i].album+'"}',
            name: JSON.stringify(newContents),
            link: newContents[i].link,
            idWidget: 6,    // TODO : idWidget
            active: true
        });
    }
    widgetAdmin.addContent(connection, {context: {idWidget: 6},
        data: {newContentList: formatedNewContents}}, 0, io, function(){
        //res.redirect('/widgets/deezer/admin');
    });
};
