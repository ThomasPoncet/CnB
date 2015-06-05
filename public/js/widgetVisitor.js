/**
 * Created by thomas on 05/06/15.
 */

// GENERAL !!!

// sessionId originaly passed by script in ejs (var sessionId = ..)
// if sessionId doesn't exist
if(typeof sessionId == undefined)
    var sessionId = '';

var socket = io.connect(document.domain+':8080');

socket.on('voteMusicDone', function (info) {
    refreshVote(info.data.listVote);
    refreshList(info.data.listContent, votes, info.context.idWidget);
});

socket.on('refreshContent', function(info){
    refreshList(info.data.listContent, votes);
});

var votes = new Object();

function refreshVotes(listVote) {
    votes = listVote;
}

function refreshList(listContent, listVotes, idWidget){
    var string = '';
    for(var i=0; i<listContent.length; i++) {
        if (listContent[i].active) {
            string += '<a href="#" id=' + listContent[i].idContent + ' class="list-group-item';

            if (listVotes.hasOwnProperty(sessionId)) {
                if (listVotes[sessionId] == listContent[i].idContent)
                    string += ' active';
            }

            string += '" Onclick="active(this.id, ' + idWidget + ');">' +
                '<span class="badge">' + listContent[i].nbVote + '</span>' +
                listContent[i].nomContent + '</a>';
        }
    }

    document.getElementById('content-list').innerHTML = string;

}

function refreshListAndVotes(listContent, listVote, idWidget){
    refreshVotes(listVote);
    refreshList(listContent, listVote, idWidget);
}

function voteMusic(idContent, idWidget) {
    socket.emit('voteMusic', {context: {idWidget: idWidget}, data: {id: sessionId, idContent: idContent}});
}


// When visitor vote
function active(idContent, idWidget) {

    voteMusic(idContent, idWidget);

    // TODO Really necessary ?!
    // change color list
    var musics = document.getElementById('music-list').children;
    for(var k = 0; k < musics.length; k++) {
        musics[k].className = "list-group-item";
    }

}