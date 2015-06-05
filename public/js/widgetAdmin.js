/**
 * Created by thomas on 04/06/15.
 */

var socket = io.connect(document.domain+':8080');
var sessionId = '';

socket.on('connect', function () {
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
});

socket.on('refreshContent', function(info){
    if (info.context.idWidget == 1){ //TODO idWidget
        refreshList(info.data.listContent);
    }
});

socket.on('voteMusicDone', function (data) {
    refreshList(data.listContent);
});

function refreshList(listContent) {
    var htmlString = '';
    var idWidget = 1; // TODO : idWidget

    for (var i=0; i<listContent.length; i++){
        htmlString += '<li id=' + listContent[i].idContent + ' class="list-group-item">'
            +    '<span class="badge">'+listContent[i].nbVote+'</span>'
            +    listContent[i].nomContent
            +    '<div style="float:right; margin: 0 10px">'
            +    '<div class="btn-group" role="group" aria-label="..." style="margin: 0 10px">'
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
            +    '<button type="button" class="btn btn-default btn-sm" onclick="deleteContent(1,'
            +    listContent[i].idContent+', \''+listContent[i].link+'\''
            +    ')">'
            +        '<span class="glyphicon glyphicon-trash"></span>'
            +    '</button>'
            +    '</div>'
            +  '</li>';
    }
    document.getElementById('content-list').innerHTML = htmlString;
}

function updateContentStatus(idWidget, idContent, active){
    socket.emit('updateContentStatus', {context: {idWidget: idWidget}, data: {idContent: idContent, active: active}});
}

function deleteContent(idWidget, idContent, link) {
    if (confirm("Are you sure you want to delete this content ?")) {
        socket.emit('deleteContent', {context: {idWidget: idWidget}, data: {idContent: idContent, link: link}});
    }
}

function verif_input(name, message){
    var val = document.getElementById(name);
    if (!val.value) {
        alert(message);
        return false;
    } else {
        return true;
    }
}