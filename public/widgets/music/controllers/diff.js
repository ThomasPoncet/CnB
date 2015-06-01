/**
 * Created by thomas on 01/06/15.
 */

// To play the next song given by diff/stream
var player = document.getElementById("player");
player.addEventListener("ended", function(){
    player.src = "diff/stream";
    player.currentTime = 0;
    player.play();
}, false);