/**
 * Created by thomas on 01/06/15.
 */

// To access local files
var fileSystem = require('fs');

var DAO = require('../../../models/DAOWidget.js');

exports.run = function(req, res, connection){
    res.render("musicDiff", connection);
};

exports.nextMusic = function(req, res, connection){
    DAO.getFirstContent(connection, function(rows){
        var filePath = './uploads/'+rows[0].link;
        var stat = fileSystem.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        });

        var readStream = fileSystem.createReadStream(filePath);
        readStream.pipe(res);
    });
};