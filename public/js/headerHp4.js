/**
 * Created by thomas on 27/06/15.
 */
var socket = io.connect(document.domain+':8080');

socket.on('refreshContentVotes', function (info) {
    console.log("hi");
    if (info.context.idWidget == 6){
        refreshThreeNextSongs(info.data);
    }
});

socket.on('refreshContent', function (info) {
    console.log("hi");
    if (info.context.idWidget == 6){
        refreshThreeNextSongs(info.data);
    }
});

function refreshThreeNextSongs(data){
    $('#three-next-songs-table').empty();
    $('#three-next-songs-table').append(
        '<tr>' +
        '   <th>Titre</th>' +
        '   <th>Artiste</th>' +
        '</tr>'
    );
    console.log("hi2");
    for (var i = 0; i < 3 && i < data.contentList.length; i++){
        console.log(data.contentList[i].nomContent);
        songInfo = JSON.parse(data.contentList[i].nomContent);
        console.log(songInfo);
        $('#three-next-songs-table').append(
            '<tr>' +
            '   <td>'+songInfo.title+'</td>' +
            '   <td>'+songInfo.artist+'</td>' +
            '</tr>'
        );
        console.log(songInfo);
    }
}