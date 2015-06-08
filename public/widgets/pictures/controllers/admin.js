/**
 * Created by Lucas on 08/06/15.
 * admin client side
 */
var socket = io.connect(document.domain+':8080');
//TODO : useless ?
//var sessionId = '';

socket.on('refreshContent', function(info){
    if (info.context.idWidget == 5){ //TODO idWidget
        refreshList(info.data.contentList, info.context.idWidget);
    }
});

socket.on('refreshContentVotes', function(info){
    if (info.context.idWidget == 5){ //TODO idWidget
        refreshList(info.data.contentList, info.context.idWidget);
    }
});

function createList(contentList){
    refreshList(contentList, 5); // TODO idWidget
}