-- INSERT INTO content (idContent, nomContent, link, idWidget, active)
-- VALUES (1, "Daft Punk - Aerodynamic", "lien1", 1, true);

-- INSERT INTO content (idContent, nomContent, link, idWidget, active)
-- VALUES (2, "Django Reinhardt - Nuages", "lien2", 1, true);

-- INSERT INTO content (idContent, nomContent, link, idWidget, active)
-- VALUES (3, "Pitt Poule - Tears", "lien3", 1, true);


INSERT INTO widgetzone (idWidgetZone, nomWidgetZone, currentWidget)
VALUES (1, "Sound", 1);

INSERT INTO widgetzone (idWidgetZone, nomWidgetZone, currentWidget)
VALUES (2, "Screen", 2);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone, active)
VALUES (1, "music", 1, true);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone, active)
VALUES (2, "youtubevideo", 2, true);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone, active)
VALUES (3, "videos", 2, true);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone, active)
VALUES (4, "youtubeaudio", 1, true);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone, active)
VALUES (5, "pictures", 2, false);

INSERT INTO widget (idWidget, nomWidget, idWidgetZone, active)
VALUES (6, "meteo", 2, false);

INSERT INTO content
(idContent, nomContent, link, idWidget,active)
VALUES(1,'GoPro: Tanner Hall Ski Diaries ','N2CWCJJilfk',2,true);

INSERT INTO content
(idContent, nomContent, link, idWidget,active)
VALUES(2,'Psychedelic visuals','uqvgRz5So-I',2,true);

INSERT INTO content
(idContent, nomContent, link, idWidget,active)
VALUES(3,'Best of Deadmau5 (Continuous Mix | High Quality)','Mn69LJ0239E',4,true);

INSERT INTO content
(idContent, nomContent, link, idWidget,active)
VALUES(4,'Symphony No. 9 ~ Beethoven','t3217H8JppI',4,true);

INSERT INTO vote_content (idVisitor, idContent)
VALUES ("1", 1);
INSERT INTO vote_content (idVisitor, idContent)
VALUES ("2", 1);
INSERT INTO vote_content (idVisitor, idContent)
VALUES ("3", 1);
INSERT INTO vote_content (idVisitor, idContent)
VALUES ("4", 2);

