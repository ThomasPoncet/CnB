/**
 * Created by Lucas on 08/06/15.
 */

// if sessionId doesn't exist
if(typeof sessionId == undefined)
    var sessionId = '';

var socket = io.connect(document.domain+':8080');

socket.on('refreshContentVotes', function(info){
    if(info.context.idWidget == 5){ //TODO idWidget
        refreshListAndVotes(info.data.contentList, info.data.votesList, info.context.idWidget);
    }
});

socket.on('refreshContent', function(info){
    if(info.context.idWidget == 5) { //TODO idWidget
        refreshList(info.data.contentList, votes, info.context.idWidget);
    }
});

function createList(contentList, votesList){
    refreshList(contentList, votesList, 5); // TODO idWidget
}