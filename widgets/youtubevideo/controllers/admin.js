/**
 * Created by Tanguy on 08/06/15.
 */

/**
 * Created by thomas on 29/05/15.
 */

var widgetAdmin = require('../../../controllers/widgetAdmin.js');

exports.run = function (req, res, connection) {
    // TODO : idWidget
    widgetAdmin.run(connection, {context: {idWidget: 2}}, function(data){
        res.render("youtubevideoAdmin", {context: {idWidget: 2}, data: data})
    });
};

exports.addContent = function(req, res, connection, io){
    var newContentList = new Array();
        newContentList[0] = {
            name: req.body.name,
            link: req.body.link,
            idWidget: 2,    // TODO : idWidget
            active: true
        };

    widgetAdmin.addContent(connection, {context: {idWidget: 2},
        data: {newContentList: newContentList}}, 0, io, function(){
        res.redirect('/widgets/youtubevideo/admin');
    });
};

exports.updateContentStatus = function(connection, info, io){
    widgetAdmin.updateContentStatus(connection, info, io, function(){});
};

exports.deleteContent = function(connection, info, io){
    widgetAdmin.deleteContent(connection, info, io, function(){
    });
};