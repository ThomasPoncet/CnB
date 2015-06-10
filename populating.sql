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
