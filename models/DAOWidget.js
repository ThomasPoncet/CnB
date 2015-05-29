/**
 * Created by Tanguy on 27/05/15.
 */

exports.getWidgetList = function(connection, callback) {

    connection.query('SELECT idWidget, nomWidget FROM cnb.widget', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });


};

exports.getContentList = function(connection, callback) {

    // Content list with the number of vote
    connection.query('SELECT c.idContent, c.nomContent, c.link, c.idWidget, COUNT(*) AS nbVote ' +
        'FROM cnb.content c, cnb.vote_content v ' +
        'WHERE c.idContent = v.idContent ' +
        'GROUP BY idContent', function(err, rows, fields) {

        if (err)
            console.log('Error while performing Query.');

        callback(rows);
    });

};

exports.vote = function(idContent, idVisitor, connection, callback) {

    //connection.query('SELECT COUNT(*) AS nbVoteVisitor ' +
    //    'FROM cnb.content c, cnb.vote_content v ' +
    //    'WHERE c.idContent = v.idContent AND idVisitor =' + idVisitor, function(err, rows, fields) {
    //
    //    if (err)
    //        console.log('Error while performing Query.');

        //connection.query('INSERT INTO cnb.vote_content(idVisitor,idContent) ' +
        //                 'VALUES('+ idVisitor + ',' + idContent + ')', function(err, rows, fields) {

            callback(1);
        //});



        //// Visitor already voted
        //if(row != 0) {
        //
        //    callback(0);
        //}
        //// Visitor didn't vote yet
        //else {
        //
        //    callback(1);
        //}

    //});

};