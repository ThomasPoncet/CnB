/**
 * Created by Lucas on 08/06/15.
 */

setInterval(function() {updatePicture()}, 5000);
function updatePicture() {
    var next = "/widgets/pictures/diff/stream/" + new Date().getTime();

    if (next != undefined) {
        var slideShowImages = document.getElementById("slideShowImages");
        slideShowImages.src = next;
    }
}