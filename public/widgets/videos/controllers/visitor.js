/**
 * Created by Lucas on 08/06/15.
 */

socket.on('refreshContentVotes', function(info){
    if(info.context.idWidget == 3){ //TODO idWidget
        refreshListAndVotes(info.data.contentList, info.data.votesList, info.context.idWidget);
    }
});

socket.on('refreshContent', function(info){
    if(info.context.idWidget == 3) { //TODO idWidget
        refreshList(info.data.contentList, votes, info.context.idWidget);
    }
});

function createList(contentList, votesList, session){
    sessionId = session;
    refreshList(contentList, votesList, 3); // TODO idWidget
}