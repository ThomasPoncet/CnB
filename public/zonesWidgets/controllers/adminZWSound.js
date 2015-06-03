/**
 * Created by Lucas on 03/06/15.
 */

var socket = io.connect(document.domain+':8080');

updateVisibleZones = function(idWidget, active) {
    socket.emit('updateVisibility', {context: {idWidget: idWidget}, data: {active: active}});
};