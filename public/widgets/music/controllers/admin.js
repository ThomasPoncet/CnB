/**
 * Created by thomas on 30/05/15.
 */

//var serverBaseUrl = document.domain;
var socket = io.connect(document.domain+':8080');
var sessionId = '';

socket.on('connect', function () {
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
});

socket.on('refreshContent', function(info){
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
        htmlString += '<li id=' + listContent[i].idContent + ' class="list-group-item">'
                   +  '<span class="badge">'+listContent[i].nbVote+'</span>'
                   +    listContent[i].nomContent
                   +    '<div class="btn-group" role="group" aria-label="...">'
                   +        '<div class="btn-group" role="group">'
                   +            '<button type="button" class="btn btn-default btn-sm ';
        if (listContent[i].active) {
            htmlString +=           'active"';
        } else {
            htmlString +=           '" onclick="updateContentStatus(' + idWidget + ',' + listContent[i].idContent
                                    + ',' + true + ')"';
        }
        htmlString +=           '>'
                   +                '<span class="glyphicon glyphicon-ok"></span>'
                   +            '</button>'
                   +        '</div>'
                   +        '<div class="btn-group" role="group">'
                   +            '<button type="button" class="btn btn-default btn-sm ';
        if (!listContent[i].active) {
            htmlString +=           'active"';
        } else {
            htmlString +=           '" onclick="updateContentStatus(' + idWidget + ',' + listContent[i].idContent
                                    + ',' + false + ')"';
        }
        htmlString +=           '>'
                   +                '<span class="glyphicon glyphicon-remove"></span>'
                   +            '</button>'
                   +        '</div>'
                   +    '</div>'
                   +  '</li>';
    } // TODO : add button delete
    document.getElementById('musicList').innerHTML = htmlString;
}

function updateContentStatus(idWidget, idContent, active){
    socket.emit('updateContentStatus', {context: {idWidget: idWidget}, data: {idContent: idContent, active: active}});
}

