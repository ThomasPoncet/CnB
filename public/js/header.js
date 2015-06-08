/**
 * Created by thomas on 08/06/15.
 */

var socket = io.connect(document.domain+':8080');

socket.on('refreshMenu', function (data) {
    refreshMenu(data.listActiveWidget);
});

var localSelected = '';

function initHeader(listActiveWidget, selected){
    localSelected = selected;
    refreshMenu(listActiveWidget);
}

function refreshMenu(listActiveWidget) {
    var htmlString = '';
    htmlString += '<ul class="nav nav-tabs">';
    // Tab Home
    if(localSelected == 'home') {
        htmlString += '<li role="presentation" class="active"><a href="/">Home</a></li>';
    } else {
        htmlString += '<li role="presentation"><a href="/">Home</a></li>';
    }
    // Tab Widgets
    if(localSelected == 'widgets') {
        htmlString += '<li role="presentation" class="active"><a href="/widgets">Widgets</a></li>';
    } else {
        htmlString += '<li role="presentation"><a href="/widgets">Widgets</a></li>';
    }
    // Others tabs
    for(var i=0; i<listActiveWidget.length; i++) {
        var name = listActiveWidget[i].nomWidget;
        htmlString += '<li role="presentation"';
        if(name == localSelected)
            htmlString += ' class="active" ';
        // First letter in upperCase
        htmlString += '><a href="/widgets/' + name + '/visitor">' + name.charAt(0).toUpperCase() + name.substring(1).toLowerCase() + '</a></li>';
    }
    document.getElementById('menu').innerHTML = htmlString;
}