/**
 * Created by thomas on 30/05/15.
 */

var socket = io.connect('http://localhost:8080');
var sessionId = '';

//socket.on('connect', function () {
//    sessionId = socket.io.engine.id;
//    console.log('Connected ' + sessionId);
//});

socket.on('updateContentStatus', function(info){
    if (info.context.idWidget == 1){ //TODO idWidget
        updateList(info.data.listContent);
    }
});

socket.on('voteMusicDone', function (data) {
    updateList(data.listContent);
});

function updateList(listContent) {
    var htmlString = '';
    var idWidget = 1; // TODO : idWidget

    for (var i=0; i<listContent.length; i++){
        htmlString += '<li id=' + listContent[i].idContent + ' class="list-group-item">';
        htmlString +=   '<span class="badge">'+listContent[i].nbVote+'</span>';
        htmlString +=   listContent[i].nomContent;
        htmlString +=   '<div class="btn-group" role="group" aria-label="...">';
        htmlString +=       '<div class="btn-group" role="group">';
        htmlString +=           '<button type="button" class="btn btn-default btn-sm ';
        if (listContent[i].active) {
            htmlString +=           'active';
        } else {
            htmlString +=           'onclick="updateContentStatus(' + idWidget + ',' + listContent[i].idContent
                                    + ',' + true + '"';
        }
        htmlString +=           '>';
        htmlString +=               '<span class="glyphicon glyphicon-ok"></span>';
        htmlString +=           '</button>';
        htmlString +=       '</div>';
        htmlString +=       '<div class="btn-group" role="group">';
        htmlString +=           '<button type="button" class="btn btn-default btn-sm ';
        if (!listContent[i].active) {
            htmlString +=           'active';
        } else {
            htmlString +=           'onclick="updateContentStatus(' + idWidget + ',' + !listContent[i].idContent
                                    + ',' + false + '"';
        }
        htmlString +=           '>';
        htmlString +=               '<span class="glyphicon glyphicon-remove"></span>';
        htmlString +=           '</button>';
        htmlString +=       '</div>';
        htmlString +=   '</div>';
        htmlString += '</li>';
    }
    document.getElementsByName('musicList');
}

function updateContentStatus(idWidget, idContent, active){
    socket.emit('updateContentStatus', {context: {idWidget: idWidget}, data: {idContent: idContent, active: active}});
}

