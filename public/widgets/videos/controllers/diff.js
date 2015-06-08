/**
 * Created by Lucas on 08/06/15.
 */


var playerVideo = document.getElementById("playerVideos");
playerVideo.addEventListener("ended", function(){
    playerVideo.src = "/widgets/videos/diff/stream/"+new Date().getTime();
    playerVideo.currentTime = 0;
    playerVideo.play();
}, false);
// TODO : Fix the issue of cache (issue with firefox) > verify if it's ok