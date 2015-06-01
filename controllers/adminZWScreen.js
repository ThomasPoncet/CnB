/**
 * Created by ensimag on 31/05/15.
 */
/**
 * Created by Lucas on 29/05/15.
 */

exports.run=function(req, res, connexion) {

    res.render("adminZWScreen", {'listWidgets' : getListWidgets() })

}

function getListWidgets() {
    var listWidgetsScreen = new Array();
    listWidgetsScreen[0] = "Youtube";
    listWidgetsScreen[1] = "Meteo";
    listWidgetsScreen[2] = "NextTrams";

    return listWidgetsScreen;
}