/**
 * Created by Tanguy on 02/06/15.
 */
// if sessionId doesn't exist
if(typeof sessionId == undefined)
    var sessionId = '';

// socket is define in header

socket.on('refreshActiveWidgetsList', function (data) {
    updateListWidgets(data.activeWidgetsList, data.listZoneWidget, data.listVoteVisitorWidget);
});

function suggest(id, idZoneWidget) {
    console.log(idZoneWidget);

    var suggest_buttons = document.getElementById(id);
    suggest_buttons.innerHTML = '<button type="button" class="btn btn-primary disabled">Vote in progress</button>';

    socket.emit('suggest', {idZoneWidget: idZoneWidget});
}

function voteWidget(id, idWidget, idWidgetZone, suggested) {

    if(suggested) {
        // change color list
        var widgets = document.getElementById("widgetzone"+idWidgetZone.toString()).children;
        for(var k = 0; k < widgets.length; k++) {
            widgets[k].className = "list-group-item";
        }

        socket.emit('voteWidget', {context: {idWidgetZone: idWidgetZone}, data: {id: sessionId, idWidget: idWidget}});
    }
}

function refreshTime(idZoneWidget, endTime){

    var time = Math.round((endTime - Date.now()) / 1000);
    if(time > 0) {
        var button = document.getElementById("buttonWidgetZone"+ idZoneWidget.toString());

        if(button != undefined)
            button.innerHTML = 'Vote in progress (' + time + 's left)';

        setTimeout("refreshTime("+idZoneWidget+", "+endTime+")",1000);
    }

}

function updateListWidgets(listWidgets, listZoneWidgets, listVoteVisitorWidget) {

    var string = '';

    // Widget zone list
    for (var i = 0; i < listZoneWidgets.length; i++) {

        var suggested = false;
        // calculation remaining time in second
        if (listZoneWidgets[i].endVote != null) {
            var date = new Date(listZoneWidgets[i].endVote);
            var time = Math.round((date.getTime() - Date.now()) / 1000);

            if (time > 0) {
                suggested = true;
            }

        }

        var nameZoneWidget = listZoneWidgets[i].nomWidgetZone.charAt(0).toUpperCase() +
            listZoneWidgets[i].nomWidgetZone.substring(1).toLowerCase();

        string += '<h3>' + nameZoneWidget +
            ' <div onclick="suggest(this.id, ' + listZoneWidgets[i].idWidgetZone + ');" style="display:inline;" id="suggest' + listZoneWidgets[i].idWidgetZone + '">';

        // Count active widget for this widgetzone
        var nbActiveWidget = 0;
        for (var j = 0; j < listWidgets.length; j++) {
            if(listWidgets[j].active && listWidgets[j].idWidgetZone == listZoneWidgets[i].idWidgetZone)
                nbActiveWidget++;
        }

        // If nobody suggested vote for this widget zone
        if(nbActiveWidget > 1) {
            if (!suggested) {
                string += '<button type="button" class="btn btn-primary">Suggest a change</button>';
            }
            else {
                string += '<button type="button" id="buttonWidgetZone' + listZoneWidgets[i].idWidgetZone + '" class="btn btn-primary disabled">Vote in progress (' + time + 's left)</button>';
            }
        }
        string += '</div></h3><div id="widgetzone' + listZoneWidgets[i].idWidgetZone + '" class="list-group">';


        // Widget list of current widget zone
        for (var j = 0; j < listWidgets.length; j++) {
            if(listWidgets[j].active) {

                if (listWidgets[j].idWidgetZone == listZoneWidgets[i].idWidgetZone) {
                    var nameWidget = listWidgets[j].nomWidget.charAt(0).toUpperCase() +
                        listWidgets[j].nomWidget.substring(1).toLowerCase();

                    string += '<a href="javascript:return false;" id="widget' + listWidgets[j].idWidget + '" class="list-group-item';


                if (listVoteVisitorWidget.hasOwnProperty(sessionId)) {
                    for (var k = 0; k < listVoteVisitorWidget[sessionId].length; k++) {
                        if (listVoteVisitorWidget[sessionId][k] == listWidgets[j].idWidget) {
                            string += ' active';
                            break;
                        }
                    }
                }

                    string += '" onclick="voteWidget(this.id,' + listWidgets[j].idWidget +
                        ', ' + listWidgets[j].idWidgetZone + ',' + suggested + ');">';

                    // To show active widgets
                    if (listWidgets[j].selectioned)
                        string += ' <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ';

                    string += nameWidget;

                    if (suggested) {
                        string += '<span class="badge">' + listWidgets[j].nbVote + '</span>';
                    }

                    string += '</a>';

                }
            }
        }

        string += '</div><br />';

        if(suggested)
            refreshTime(listZoneWidgets[i].idWidgetZone, date.getTime());

    }

    document.getElementById('widgetList').innerHTML = string;

}
