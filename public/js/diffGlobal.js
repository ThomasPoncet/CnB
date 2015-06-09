/**
 * Created by Tanguy on 05/06/15.
 */

// To get the html of diffused widgets
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// To load js files from widget views
function loadJS(file) {
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "application/javascript";
    // make the script element load file
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
}



var socket = io.connect(document.domain+':8080');

socket.on('diffNotification', function (data) {
    updateNotification(data.message, data.color, data.thumb);
});

socket.on('refreshWidgetsDiff', function (data) {
    refreshWidgets(data.widgetsList);
});

var timeOut;
var count = 0;

function appear(element) {
    op = 1;
    element.style.display = 'inline';
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
}

// make a fadeout on an element
function fadeout(element, currentCount) {
    var op = 1;  // initial opacity
    timer = setInterval(function () {
        if(currentCount != count) {
            // stop fadeout if there is a new notification
            clearInterval(timer);
            appear(element);
            return;
        }
        else if (op <= 0.1){

            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}
// change notification in view
// color = {green, blue}
function updateNotification(message, color, thumb) {

    count++;

    var className;
    var string = '';
    if(color == 'green')
        className = 'alert alert-success notification';
    else if(color == 'blue')
        className = 'alert alert-info notification';
    else if(color == 'orange')
        className = 'alert alert-warning notification';
    else if(color == 'red')
        className = 'alert alert-danger notification';

    var notificationDiv = document.getElementById("notification");

    string += '<h3>';

    if(thumb)
        string += '<span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> ';

    string += message +'</h3>';

    notificationDiv.className = className;
    notificationDiv.innerHTML = string;

    appear(notificationDiv);
    clearTimeout(timeOut);

    var currentCount = count;
    timeOut = setTimeout(function() {
        fadeout(notificationDiv, currentCount)
    }, 5000);
}



var currentSelectedWidgetList = [];

function changeWidget(newWidget){
    currentSelectedWidgetList[newWidget.idWidgetZone] = newWidget.idWidget;
    document.getElementById('zonewidget-' + newWidget.idWidgetZone).innerHTML
        = httpGet('/diff/' + newWidget.nomWidget);
    loadJS('/widgets/' + newWidget.nomWidget + '/controllers/diff.js');
}

function initWidgets(widgetList){
    for (var i=0; i< widgetList.length; i++) {
        if (widgetList[i].selectioned) {
            changeWidget(widgetList[i]);
        }
    }
}

function refreshWidgets(widgetList) {
    for (var i=0; i< widgetList.length; i++) {
        if (widgetList[i].selectioned){
            console.log(currentSelectedWidgetList[widgetList[i].idWidgetZone]);
            console.log(widgetList[i].idWidget);
            if (currentSelectedWidgetList[widgetList[i].idWidgetZone] != widgetList[i].idWidget){
                changeWidget(widgetList[i]);
            }
        }
    }
}