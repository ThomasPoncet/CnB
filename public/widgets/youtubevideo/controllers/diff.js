/**
 * Created by Tanguy on 08/06/15.
 */
//
// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// To get the id of the video sended by the stream
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// This function creates an <iframe> (and YouTube musicPlayer)
// after the API code downloads.
var youtubevideoPlayer;
function onYouTubeIframeAPIReady() {
    youtubevideoPlayer = new YT.Player('youtubevideo-player', {
        height: '100%',
        width: '100%',
        videoId: httpGet("/widgets/youtubevideo/diff/stream/"+new Date().getTime()),
        playerVars: { 'autoplay': 1, 'autohide': 1, 'iv_load_policy': 3 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the video musicPlayer is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    youtubevideoPlayer.mute();
}

function onPlayerStateChange(event) {
    // When video is finished
    if (event.data == 0) {
        youtubevideoPlayer.loadVideoById(httpGet("/widgets/youtubevideo/diff/stream/"+new Date().getTime()));
    }
}