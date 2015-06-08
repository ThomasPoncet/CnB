/**
 * Created by thomas on 01/06/15.
 */

// To play the next song given by diff/stream
var musicPlayer = document.getElementById("music-player");
musicPlayer.addEventListener("ended", function(){
    musicPlayer.src = "/widgets/music/diff/stream/"+new Date().getTime();
    musicPlayer.currentTime = 0;
    musicPlayer.play();
}, false);