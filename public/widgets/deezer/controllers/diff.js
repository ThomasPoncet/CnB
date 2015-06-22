/**
 * Created by thomas on 22/06/15.
 */


// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// To get the id of the audio sended by the stream
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// This function creates an <iframe> (and YouTube musicPlayer)
// after the API code downloads.
var youtubeaudioPlayer;
function onYouTubeIframeAPIReady() {
    console.log("audio");
    youtubeaudioPlayer = new YT.Player('youtubeaudio-player', {
        height: '100%',
        width: '100%',
        videoId: httpGet("/widgets/youtubeaudio/diff/stream/"+new Date().getTime()),
        playerVars: { 'autoplay': 1, 'autohide': 1, 'iv_load_policy': 3 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the audio musicPlayer is ready.
function onPlayerReady(event) {
    youtubeaudioPlayer.setVolume(100);
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // When audio is finished
    if (event.data == 0) {
        youtubeaudioPlayer.setVolume(100);
        youtubeaudioPlayer.loadVideoById(httpGet("/widgets/youtubeaudio/diff/stream/"+new Date().getTime()));
    }
}