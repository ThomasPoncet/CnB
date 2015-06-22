/**
 * Created by thomas on 22/06/15.
 */

// To get the id of the audio sended by the stream
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

DZ.init({
    appId  : '160131',
    channelUrl : 'github.com/tponcet/CnB',
    player : {
        container: 'deezer-player',
        width : 800,
        height : 300,
        onload : onPlayerReady
    }
});

function onPlayerReady(playerState) {
    DZ.player.playTracks([httpGet("/widgets/deezer/diff/stream/"+new Date().getTime())]);
}

DZ.Event.subscribe('track_end', function(evt_name){
    DZ.player.playTracks([httpGet("/widgets/deezer/diff/stream/"+new Date().getTime())]);
});