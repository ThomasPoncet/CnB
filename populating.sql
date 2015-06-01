INSERT INTO content (idContent, nomContent, link, idWidget)
VALUES (1, "musique1", "lien", 2);

INSERT INTO content (idContent, nomContent, link, idWidget)
VALUES (2, "musique2", "lien", 2);


INSERT INTO vote_content (idVisitor, idContent)
VALUES (1, 1);

INSERT INTO widgetzone (idWidgetZone, nomWidgetZone)
VALUES (1, Sound);

INSERT INTO widgetzone (idWidgetZone, nomWidgetZone)
VALUES (2, Screen);
