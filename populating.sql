INSERT INTO content (idContent, nomContent, link, idWidget)
VALUES (1, "bla", "lien", 2);


INSERT INTO vote_content (idVisitor, idContent)
VALUES (1, 1);

INSERT INTO widgetzone (idWidgetZone, nomWidgetZone)
VALUES (1, "Sound");

INSERT INTO widgetzone (idWidgetZone, nomWidgetZone)
VALUES (2, "Screen");

INSERT INTO widget (idWidget, nomWidget, idWidgetZone)
VALUES (1, "music", 1);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone)
VALUES (2, "announcements", 1);


INSERT INTO widget (idWidget, nomWidget, idWidgetZone)
VALUES (3, "youtube", 2);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone)
VALUES (4, "nexttrams", 2);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone)
VALUES (5, "advertisements", 2);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone)
VALUES (6, "meteo", 2);