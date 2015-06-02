/**
 * Created by Tanguy on 29/05/15.
 */

// if sessionId doesn't exist
if(typeof sessionId == undefined)
    var sessionId = '';

var socket = io.connect(document.domain+':8080');

socket.on('voteMusicDone', function (data) {
    updateVoteMusic(data.listContent, data.listWidget, data.listVoteVisitor);
});

socket.on('refreshContent', function(info){
    updateList(info.data.listContent, votes);
});

var votes = [];

function updateVoteMusic(listContent, listWidget, listVoteVisitor) {

    votes = listVoteVisitor;

    updateList(listContent, votes);
}

function updateList(listContent, listVoteVisitor){
    var string = '';
    var idWidget = 1; // TODO : idWidget music

    for(var i=0; i<listContent.length; i++) {
        if (listContent[i].active) {
            string += '<a href="#" id=' + listContent[i].idContent + ' class="list-group-item';

            if (listVoteVisitor.hasOwnProperty(sessionId)) {
                if (listVoteVisitor[sessionId] == listContent[i].idContent)
                    string += ' active';
            }

            string += '" Onclick="active(this.id, ' + idWidget + ');">' +
                '<span class="badge">' + listContent[i].nbVote + '</span>' +
                listContent[i].nomContent + '</a>';
        }
    }

    document.getElementById('music-list').innerHTML = string;

}

function voteMusic(idContent, idWidget) {
    socket.emit('voteMusic', {context: {idWidget: idWidget}, data: {id: sessionId, idContent: idContent}});
}


// When visitor vote
function active(idContent, idWidget) {

    voteMusic(idContent, idWidget);

    // change color list
    var musics = document.getElementById('music-list').children;
    for(var k = 0; k < musics.length; k++) {
        musics[k].className = "list-group-item";
    }

}