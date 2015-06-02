/**
 * Created by Tanguy on 02/06/15.
 */

var socket = io.connect('http://localhost:8080');

socket.on('refreshListWidgets', function (data) {
    updateListWidgets(data.listWidget);
});

function updateListWidgets(listWidgets) {

    var string = '';

    for(var i=0; i<listWidgets.length; i++) {
        var name = listWidgets[i].nomWidget;
        string += '<a href="#" id=' + listWidgets[i].idWidget + ' class="list-group-item">' +
            name.charAt(0).toUpperCase() + name.substring(1).toLowerCase() + '</a>';
    }



    document.getElementById('widgetList').innerHTML = string;

}