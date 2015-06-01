/**
 * Created by thomas on 01/06/15.
 */

var DAO = require('../../../models/DAOWidget.js');

exports.run = function(req, res, connection){

};

exports.nextMusic = function(req, res, connection){
    DAO.getFirstContent(connection, function(rows){
        console.log(rows);
    });
    //var filePath = 'upload';
    //var stat = fileSystem.statSync(filePath);
    //res.writeHead(200, {
    //    'Content-Type': 'audio/mpeg',
    //    'Content-Length': stat.size
    //});
    //
    //var readStream = fileSystem.createReadStream(filePath);
    //readStream.pipe(res);
};