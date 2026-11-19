# Wiederverwendungsinventar – 19.11.2026

## Entscheidung

Keine umfassende Bibliothek auf Verdacht bauen. Die unten belegten Wiederholungen werden nacheinander als kleine, konfigurierbare Module extrahiert und zuerst in zwei Originalapps verwendet.

## Reihenfolge

1. `AppShell`: Logo, Sprachmenü, Footer, Hilfe-/Rechtsrouten, Kontaktkonfiguration.
2. `LocalePreference`: unterstützte Sprachen, Browser-Fallback, gespeicherte Auswahl und sichere Speicherfehlerbehandlung.
3. `ContentPage`: lokale Hilfs- und Beispielseiten.
4. `ConfirmDialog`: nur nach Vergleich der bestehenden Bestätigungs- und Fokuslogik.
5. `ProjectFileFlow`: gemeinsame Anforderungen und Tests; Datenformate bleiben app-spezifisch.

## Nicht extrahieren

- PDF- und Bildexport: bestehende Formate und Browserrisiken sind zu unterschiedlich.
- Projektmodelle, Persistenzschlüssel und Importvalidierung: Datenverlust wäre wahrscheinlicher als Wartungsgewinn.
- Rechtstexte: zentrale Struktur, aber je App geprüfter Inhalt.

## Erstes Paar

SocialMediaCreator und StoryboardCreator sind das erste Zielpaar für `AppShell` und `LocalePreference`: beide React/TypeScript, beide lokale Inhaltsseiten und beide im UI-Pilot geprüft. Der Transfer startet erst nach Abnahme des App-Shell-Piloten.
