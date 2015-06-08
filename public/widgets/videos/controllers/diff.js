/**
 * Created by Lucas on 08/06/15.
 */


var playerVideo = document.getElementById("video-player");
playerVideo.addEventListener("ended", function(){
    console.log("bla !!!");
    playerVideo.src = "/widgets/videos/diff/stream/"+new Date().getTime();
    playerVideo.currentTime = 0;
    playerVideo.play();
}, false);