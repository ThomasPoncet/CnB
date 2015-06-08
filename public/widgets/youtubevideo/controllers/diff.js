/**
 * Created by Tanguy on 08/06/15.
 */

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('playerYoutubevideo', {
        height: '90%',
        width: '90%',
        videoId: 'JeAtre3Bxg8',
        playerVars: { 'autoplay': 1, 'autohide': 1, 'iv_load_policy': 3 },
        events: {
            'onReady': onPlayerReady
            //'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    player.mute();
}

//function onPlayerStateChange(event) {
//    // When video is finished
//    if (event.data == 0) {
//        document.getElementById('playerYoutubevideo').src="/widgets/youtubevideo/diff/stream/"+new Date().getTime();
//    }
//}
document.getElementById('playerYoutubevideo').addEventListener('onStateChange', function(event){
    // When video is finished
    if (event.data == 0) {
        document.getElementById('playerYoutubevideo').src="/widgets/youtubevideo/diff/stream/"+new Date().getTime();
    }
});

