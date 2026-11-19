# haak3 App-Shell-Standard 1.1 – Entwurf

Stand: 19.11.2026. Geltung: lokale Bildungsapps und ihre Hilfs- und Rechtsseiten. Der Entwurf ist erst nach Pilotabnahme verbindlich.

## Gemeinsame Shell

- Header: eigenes rechteckiges App-Logo oder Wortmarke, Appname und kompakte Sprachauswahl.
- Footer: zurückhaltender haak3-Absender, ein Link zu weiteren Tools für Schule, Hilfe, Beispiele, Über die App, AGB, Datenschutz, Impressum, sichtbare Unterstützung und GitHub nur bei bestätigtem öffentlichem Repository.
- Zentraler Kontakt: `apps@haak3.de` für Impressum sowie Fehlermeldungen und Funktionsideen.
- Alle zentralen Aktionen und Footer-Links haben mindestens 44 × 44 CSS-Pixel.

## Sprache

Referenz ist die Funktion des Feedbackbogen-Generators:

1. unterstützte Sprachen: Deutsch, English, Français, Español, Nederlands;
2. Browser-Sprache bestimmt nur den ersten Startwert;
3. eine gültige manuelle Auswahl wird lokal gespeichert und hat Vorrang;
4. Sprachwechsel übersetzt Oberfläche, Hilfe, Status, Fehler und Exporttexte, niemals Projektinhalte;
5. eine Sprache gilt nur dann als verfügbar, wenn ihre gesamte Nutzeroberfläche und zugehörige Inhalte übersetzt sind.

Die sichtbare Darstellung ist ein kompaktes Menü mit ausgeschriebenen Namen, nicht die horizontale Fünfergruppe des Feedbackbogen-Generators. Apps mit fehlenden Sprachen oder Teilübersetzungen erhalten ein Migrations-Issue; sie dürfen die fehlende Sprache bis zur vollständigen Übersetzung nicht anbieten.

## Hilfe, Beispiele und Rückmeldung

- Jede App hat eine interne Hilfeseite mit Kernablauf, Speichern/Export und lokalem Datenverhalten.
- Die Hilfeseite nennt sichtbar `apps@haak3.de` für Fehler und Ideen; die Nachricht soll App, Gerät und letzten Schritt enthalten.
- Beispiele sind lokal, klar als Beispiel markiert und enthalten keine Produktiv- oder personenbezogenen Daten.
- Hilfe und Beispiele dürfen einen aktuellen Arbeitsstand nicht verwerfen.

## Rechtliche Seiten

AGB, Datenschutz und Impressum bleiben über den Footer erreichbar, auch bei 320 CSS-Pixel Breite. Der App-Shell-Standard liefert Struktur und Navigation, keine generischen Rechtstexte. Vor jeder Veröffentlichung prüft die jeweilige App vollständige Betreiberangaben, Hosting, technische Verbindungen und Inhalte.

## Kandidaten für zentrale Module

| Modul | Beleg in bestehenden Apps | Ziel |
|---|---|---|
| App-Shell und Footer | SocialMediaCreator, StoryboardCreator, SeriesCreator, InterviewCreator, UnterrichtsDashboard | Header/Footer-Konfiguration und Inhaltsrouten |
| i18n-Präferenz | Feedbackbogen-Generator, SocialMediaCreator, StoryboardCreator, UnterrichtsDashboard, SeriesCreator, InterviewCreator, PitchTimer | Sprachregister, Browser-Fallback, sichere lokale Präferenz |
| Content-Seiten | SocialMediaCreator, StoryboardCreator, SeriesCreator, InterviewCreator, UnterrichtsDashboard | Markdown-/Inhaltsseiten mit gemeinsamer Navigation |
| Bestätigungsdialog | StoryboardCreator, SeriesCreator, InterviewCreator | zugänglicher Dialogvertrag |
| lokale Projektdatei | SocialMediaCreator, StoryboardCreator, UnterrichtsDashboard, InterviewCreator | gemeinsamer Ablaufvertrag, keine gemeinsame Datenschema-Implementierung |

`@haak3/ui` existiert derzeit nur im StoryboardCreator-Workspace. Es wird erst nach Übernahme eines konkreten Moduls in mindestens zwei Originalapps als Paketquelle ausgebaut.

## Pilotabnahme

Prüfroute: parameterlose Startseite; `?mode=review` zeigt Vergleich und Transfer nur zur Evaluation.

1. Deutsch/English im SocialMediaCreator wählen; Auswahl muss nach Neuladen erhalten bleiben.
2. Hilfe, Beispiele, AGB, Datenschutz und Impressum über den Footer erreichen und den Mail-Link zu `apps@haak3.de` prüfen.
3. Unterstützung öffnen: Informationen, Mail-Link und erst dort den externen Buy-me-a-coffee-Link prüfen.
4. Den Link „Weitere Tools für Schule“ prüfen.
5. Bei 320, 390, 768 und 1440 CSS-Pixeln prüfen: kein horizontaler Überlauf; primäre Ziele mindestens 44 Pixel.

## Offene Migrations-Issues

- StoryboardCreator: Niederländisch fehlt.
- SocialMediaCreator: nur Deutsch/English; Französisch, Spanisch und Niederländisch fehlen.
- Alle Apps: vollständige Übersetzungsabdeckung für Hilfe, Rechtstexte und Exporte gegen den jeweiligen Quellstand prüfen.
- Rechtliche Inhalte bleiben bis zur Betreiberprüfung Entwurf.
