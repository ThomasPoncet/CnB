/**
 * Created by Lucas on 02/06/15.
 */

/*function setCookie(req, res, connection, callback){
    app.use(function(req, res){
        if (typeof(req.session.admin == 'undefined') {
            req.session.todolist = [];
        }

    })

}
if (!req.session.admin) {*/
    var password = prompt("Veuillez entrer le mot de passe pour accéder à cette page", "");

    // compare it to what is expected in hex_md5 hash
    if (( calcMD5(password)) != "21232f297a57a5a743894a0e4a801fc3") {
        alert("Mot de passe incorrect!", "Erreur");
        //redirection to the home page
        document.location.href = "/..";
    } else {
        req.session.admin = true;
    }
//}
