/**
 * Created by thomas on 05/06/15.
 */

if(typeof sessionId == undefined)
    var sessionId = '';

//var sessionId = context.sessionId;
var socket = io.connect(document.domain+':8080');
var votes = new Object();

function refreshVotes(votesList) {
    votes = votesList;
}

function refreshList(contentList, votesList, idWidget){
    var string = '';
    for(var i=0; i<contentList.length; i++) {
        if (contentList[i].active) {
            string += '<a href="#" id=' + contentList[i].idContent + ' class="list-group-item';

            if (votesList.hasOwnProperty(sessionId)) {
                if (votesList[sessionId] == contentList[i].idContent)
                    string += ' active';
            }

            string += '" Onclick="active(this.id, ' + idWidget + ');">' +
                '<span class="badge">' + contentList[i].nbVote + '</span>' +
                contentList[i].nomContent + '</a>';
        }
    }

    document.getElementById('content-list').innerHTML = string;

}

function refreshListAndVotes(contentList, votesList, idWidget){
    refreshVotes(votesList);
    refreshList(contentList, votesList, idWidget);
}

function voteContent(idContent, idWidget) {
    socket.emit('voteContent', {context: {idWidget: idWidget}, data: {idVisitor: sessionId, idContent: idContent}});
}


// When visitor vote
function active(idContent, idWidget) {

    voteContent(idContent, idWidget);

    // TODO Really necessary ?!
    // change color list
    var musics = document.getElementById('content-list').children;
    for(var k = 0; k < musics.length; k++) {
        musics[k].className = "list-group-item";
    }

}