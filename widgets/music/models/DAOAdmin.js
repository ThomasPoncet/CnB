/**
 * Created by thomas on 29/05/15.
 */

//exports.getContentList2 = function(connection, callback) {
//
//    // Content list with the number of vote
//    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, COUNT(*) AS nbVote ' +
//        'FROM cnb.content c, cnb.vote_content v ' +
//        'WHERE c.idContent = v.idContent ' +
//        'GROUP BY idContent', function(err, rows, fields) {
//
//        if (err)
//            console.log('Error while performing Query.');
//
//        callback(rows);
//    });
//
//};
