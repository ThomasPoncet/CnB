/**
 * Created by Lucas on 08/06/15.
 */

exports.getContentList = function(connection, callback) {

    // Content list with the number of vote
    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, COUNT(*) AS nbVote ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent or c.idcontent is not in v.idcontent' +
        'GROUP BY idContent', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });

};