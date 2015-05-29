/**
 * Created by Lucas on 29/05/15.
 */

exports.run=function(req, res, connexion) {

    res.render("adminZWSound", {'listWidgets' : getListWidgets() })

}

function getListWidgets() {
    var listWidgetsSound = new Array();
    listWidgetsSound[0] = "Music";
    listWidgetsSound[1] = "Announcements";

    return listWidgetsSound;
}