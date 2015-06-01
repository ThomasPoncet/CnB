INSERT INTO content (idContent, nomContent, link, idWidget)
VALUES (1, "Daft Punk - Aerodynamic", "lien1", 1);

INSERT INTO content (idContent, nomContent, link, idWidget)
VALUES (2, "Django Reinhardt - Nuages", "lien2", 1);

INSERT INTO content (idContent, nomContent, link, idWidget)
VALUES (3, "Pitt Poule - Tears", "lien3", 1);


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

INSERT INTO vote_content (idVisitor, idContent)
VALUES ("1", 1);
INSERT INTO vote_content (idVisitor, idContent)
VALUES ("2", 1);
INSERT INTO vote_content (idVisitor, idContent)
VALUES ("3", 1);
INSERT INTO vote_content (idVisitor, idContent)
VALUES ("4", 2);

-- INSERT INTO widgetzone (idWidgetZone, nomWidgetZone)
-- VALUES (1, Sound);
-- 
-- INSERT INTO widgetzone (idWidgetZone, nomWidgetZone)
-- VALUES (2, Screen);
