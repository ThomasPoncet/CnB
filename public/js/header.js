/**
 * Created by thomas on 08/06/15.
 */

var socket = io.connect(document.domain+':8080');

socket.on('refreshActiveWidgetsList', function (data) {
    refreshMenu(data.activeWidgetsList);
});

var localSelected = '';

function initHeader(selected, activeWidgetsList){
    localSelected = selected;
    refreshMenu(activeWidgetsList);
}

function refreshMenu(activeWidgetsList) {
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
    for(var i=0; i<activeWidgetsList.length; i++) {
        if(activeWidgetsList[i].selectioned){
            var name = activeWidgetsList[i].nomWidget;
            htmlString += '<li role="presentation"';
            if(name == localSelected)
                htmlString += ' class="active" ';
            // First letter in upperCase
            htmlString += '><a href="/widgets/' + name + '/visitor">' + name.charAt(0).toUpperCase() + name.substring(1).toLowerCase() + '</a></li>';
        }
    }
    document.getElementById('menu').innerHTML = htmlString;
}