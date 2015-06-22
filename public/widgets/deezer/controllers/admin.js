/**
 * Created by thomas on 22/06/15.
 */


socket.on('refreshContent', function(info){
    if (info.context.idWidget == 6){ //TODO idWidget
        refreshList(info.data.contentList, info.context.idWidget);
    }
});

socket.on('refreshContentVotes', function(info){
    if (info.context.idWidget == 6){ //TODO idWidget
        refreshList(info.data.contentList, info.context.idWidget);
    }
});

function createList(contentList){
    refreshList(contentList, 6); // TODO idWidget
}