/**
 * Created by thomas on 07/06/15.
 * admin music client side
 */

var socket = io.connect(document.domain+':8080');
//TODO : useless ?
var sessionId = '';

socket.on('refreshContent', function(info){
    if (info.context.idWidget == 1){ //TODO idWidget
        refreshList(info.data.contentList, info.context.idWidget, socket);
    }
});

socket.on('refreshContentVotes', function(info){
    if (info.context.idWidget == 1){ //TODO idWidget
        refreshList(info.data.contentList, info.context.idWidget, socket);
    }
});

function createList(contentList){
    refreshList(contentList, 1, socket); // TODO idWidget
}