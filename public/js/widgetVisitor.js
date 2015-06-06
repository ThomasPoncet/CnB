/**
 * Created by thomas on 05/06/15.
 */

// GENERAL !!!

// sessionId originaly passed by script in ejs (var sessionId = ..)
// if sessionId doesn't exist
if(typeof sessionId == undefined)
    var sessionId = '';

var socket = io.connect(document.domain+':8080');
socket.on('connect', function () {
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
});

//socket.on('voteMusicDone', function (info) {
//    refreshVote(info.data.listVote);
//    refreshList(info.data.listContent, votes, info.context.idWidget);
//});

socket.on('refreshContentVotes', function(info){
    if(info.context.idWidget == 1){ //TODO idWidget
        refreshListAndVotes(info.data.contentList, info.data.votesList, info.context.idWidget);
    }
});


socket.on('refreshContent', function(info){
    refreshList(info.data.listContent, votes);
});

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

function voteMusic(idContent, idWidget) {
    socket.emit('voteMusic', {context: {idWidget: idWidget}, data: {id: sessionId, idContent: idContent}});
}

function voteContent(idContent, idWidget) {

    console.log(sessionId);
    socket.emit('voteContent', {context: {idWidget: idWidget}, data: {id: sessionId, idContent: idContent}});
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