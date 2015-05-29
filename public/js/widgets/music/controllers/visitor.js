/**
 * Created by Tanguy on 29/05/15.
 */
var originalConsole = console;
originalConsole.log(console.log);

console.log("bonjour")
var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl);

var sessionId = '';

socket.on('connect', function () {
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
});

function vote(idContent, idWidget) {
    //socket.emit('vote', {context: {idWidget: idWidget}, data: {id: sessionId, idContent: idContent}});
    socket.emit("vote");
}