/**
 * Created by thomas on 01/06/15.
 */

// To access local files
var fs = require('fs');

var DAO = require('../../../models/DAOWidget.js');

exports.run = function(req, res, connection){
    res.render("musicDiff", connection);
};

exports.nextMusic = function(req, res, connection, io){
    DAO.getFirstContent(connection, function(rows){
        var filePath = './uploads/'+rows[0].link;
        var stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        });

        var readStream = fs.createReadStream(filePath);
        readStream.pipe(res);

        // To delete this song from the playlist
        DAO.deleteVote(connection, rows[0].idContent, function(){
            DAO.updateContentStatus(connection, rows[0].idContent, false, function(){
                DAO.getContentList(connection, function(listContent) {
                    // TODO : idWidget
                    io.sockets.emit('refreshContent', {context: {idWidget: 1}, data: {listContent: listContent}});
                    // TODO : We have to refresh local variable vote (in client side musicVisitor) !!!
                });
            });
        });
    });
};