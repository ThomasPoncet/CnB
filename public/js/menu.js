/**
 * Created by Tanguy on 02/06/15.
 */

var socket = io.connect('http://localhost:8080');

socket.on('refresh', function (data) {
    updateMenu(data.listActiveWidget);
});

function updateMenu(listActiveWidget) {

    // get widget name with a URL
    // (Example : http://.../widgets/music/visitor -> music)

    var path = document.location.pathname;
    var widget;
    if(path == '/') {
        widget = 'home';
    } else {
        widget = path.substring(9 ,path.lastIndexOf( "/" ) );
    }


    var string = '';
    string += '<ul class="nav nav-tabs">';

    if(widget == 'home') {
        string += '<li role="presentation" class="active"><a href="/">Home</a></li>';
    }
    else {
        string += '<li role="presentation"><a href="/">Home</a></li>';
    }

    for(var i=0; i<listActiveWidget.length; i++) {
        var name = listActiveWidget[i].nomWidget;

        string += '<li role="presentation"';

        if(name == widget)
            string += ' class="active" ';

        // First letter in upperCase
        string += '><a href="/widgets/' + name + '/visitor">' + name.charAt(0).toUpperCase() + name.substring(1).toLowerCase() + '</a></li>';
    }

    document.getElementById('widget-list').innerHTML = string;

}