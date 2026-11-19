# haak3 UI-Werkstatt

## Zweck und Status

Dieser isolierte, interaktive Prototyp vergleicht drei Bedienkonzepte für den SocialMediaCreator und erprobt die gewählte Richtung in weiteren App-Typen. Alle Vergleichsvarianten bearbeiten dieselbe Aufgabe und starten mit demselben synthetischen Beitrag. Christian hat **B – Direkter Editor** gewählt; A und C bleiben als Vergleichsalternativen verfügbar.

Die gemeinsame Designsprache verwendet auf Nutzerwunsch nun Orange statt Blau als Akzentfamilie, helle Panels und lokale Systemschriften. Grundlage sind das Markenorange von haak3.de und ein kontrastreiches dunkles Orange für UI-Aktionen. Sie soll unterschiedliche App-Layouts ermöglichen, ohne jede Anwendung in dieselbe Komposition zu zwingen. Die Umsetzung dokumentiert einen Entwurf, keine Freigabe für die bestehende Anwendung.

## Zielgruppe und Aufgabe

Schülerinnen und Schüler sollen den Editor auf Tablet und Smartphone bedienen können. Die Beispielaufgabe lautet: eine Idee für einen besseren Schulweg als fiktiven Fotobeitrag formulieren, die Vorschau prüfen und eine Beispieldatei exportieren.

## Vergleichbare Kompositionen

- **Geführter Ablauf** (`?strategy=guided`): Inhalt, Gestaltung und Vorschau mit Export als drei Schritte. Auf größeren Displays begleitet eine Vorschau die ersten beiden Schritte.
- **Direkter Editor** (`?strategy=direct`): Texteditor und Live-Vorschau nebeneinander; auf dem Smartphone wechseln Schaltflächen zwischen Bearbeitung und Vorschau. Gestaltung liegt in einem aufklappbaren Abschnitt.
- **Vorschau als Arbeitsfläche** (`?strategy=canvas`): Das Ergebnis steht zuerst im Mittelpunkt. Ein expliziter Bearbeitungsmodus öffnet Text und Gestaltung im Kontextbereich. Dies ist kein frei verschiebbarer Canvas und kein Drag-and-drop-Editor.

Der Vergleich prüft Orientierung, Kontrolle und Bedienbarkeit. Der Variantenwechsel lädt dieselben Ausgangsdaten neu; er überträgt keine Bearbeitungen zwischen Varianten.

## Tatsächlicher Funktionsumfang

Profilname und Beitragstext sind editierbar; sie haben Grenzen von 60 beziehungsweise 1200 Zeichen. Leere Pflichtfelder werden vor dem Weitergehen aus dem Inhaltsschritt beziehungsweise vor Abschluss und Export geprüft. Zwei Hintergrundvarianten und eine zuschaltbare Themenfläche verändern die Vorschau. „Beitrag anlegen“ ersetzt den aktuellen Beispielbeitrag durch einen leeren Text; „Beispiel zurücksetzen“ stellt die Ausgangsdaten wieder her. Es gibt keine Beitragsliste.

Der Export erzeugt einen echten Browserdownload namens `haak3-beispielbeitrag.json`. Das eigenständige Schema `haak3.ui-prototype/1` enthält `synthetic: true` und den aktuellen Beitrag. Die Datei ist kein Bildexport, kein Projektformat der bestehenden App und nicht für deren Import gedacht. Die Verwendung bleibt auf synthetische Beispieldaten beschränkt.

## Transfer auf weitere App-Typen

**StoryboardCreator** (`?surface=storyboard`) zeigt ein synthetisches Kurzfilmprojekt mit drei Szenen. Die Szenenübersicht bleibt vom ausgewählten Szeneneditor getrennt. Titel, Handlung und Dialog sind direkt editierbar; Einstellungsgröße und geplante Dauer liegen in einem aufklappbaren Abschnitt. Auswahl und Umordnen erhalten den jeweiligen Inhalt. Szenen lassen sich ergänzen und über benannte Auf-/Ab-Schaltflächen statt Drag-and-drop verschieben. Auf kleineren Displays wechseln Bearbeiten und Vorschau; auf größeren stehen sie nebeneinander.

Die Szenenvorschau zeigt einen ausdrücklich beschrifteten Bildplatzhalter, kein Szenenbild. Bild-Upload und Filmwiedergabe sind nicht implementiert. Der lokale JSON-Download verwendet `haak3.storyboard-prototype/1`, `synthetic: true` und eine geordnete Szenenliste. Fehlende Szenentitel blockieren den Export mit Feldfehler und Fokusführung. Die geplante Dauer ist eine zusätzliche Prototypangabe, kein als bestehend behauptetes Projektfeld. Die Datei ist keine `.storyboard`-Datei und nicht für den Import in die bestehende App gedacht.

**AgentOS** (`?surface=agentos`) ist eine lesende Betriebsübersicht mit vier synthetischen Prozessen. Suche nach Name oder Profil und ein Statusfilter begrenzen die Liste. Inline-Details halten die Übersicht verfügbar; Schließen stellt Fokus zum Auslöser wieder her. Auswahlzustände werden zusätzlich über ARIA mitgeteilt.

Der Szenariowechsel bietet Normal, Quelle veraltet, Keine Daten und Verbindungsfehler. Veraltete und fehlerhafte Szenarien kennzeichnen die sichtbaren Laufzustände als historische Demo-Beobachtungen; leere Daten werden nicht als gesunder Zustand ausgegeben. Die Beobachtungszeit gehört zum synthetischen Snapshot und nutzt Europe/Berlin. Kein Live-Abruf, keine Hermes-Verbindung und keine Start-/Pause-/Schreibaktionen sind vorhanden.

## Grenzen und technische Einordnung

Bearbeitete Inhalte liegen ausschließlich im Arbeitsspeicher der aktuellen Seite und gehen beim Neuladen verloren. Nur die Oberflächensprache wird als lokale Präferenz gespeichert; bei gesperrtem Speicher funktioniert der Wechsel für die Sitzung. Es gibt kein Backend, kein Konto, keine Veröffentlichung und keine Verbindung zu Social-Media-Diensten.

Die gemeinsame App-Shell erhält Bearbeitungen beim Öffnen interner Hilfe-, Über-, Support- und Rechtsseiten. SocialMediaCreator ist auf Deutsch und Englisch bedienbar; Inhalte werden nicht übersetzt. Die Transfers bieten nur Deutsch und deshalb kein Sprachmenü. Originale App-Logos bleiben unverändert, AgentOS verwendet vorerst eine Wortmarke. haak3 steht als Absender im Footer. Details und Quellen: [SHELL.md](SHELL.md).

Die bestehende Bibliothek `@haak3/ui` wurde betrachtet, jedoch nicht kopiert: Ihre Komponenten setzen Tailwind voraus. Der eigenständige Prototyp verwendet React, CSS-Module, gemeinsame CSS-Variablen und die bereits vorhandenen Lucide-Symbole. KnowledgeVault gehört vollständig nicht zu diesem Prototyp und seinem Vergleich.

Die Transfers teilen `TransferShell.tsx`, die Prototypnavigation und `transfer.module.css` innerhalb dieser einen Werkstatt. Sie sind kein veröffentlichtes Komponentenpaket und keine zweite produktive Übernahme. Die produktiven Quellapps, APIs, Speicherschlüssel und Dateiformate bleiben unverändert.

## Zugänglichkeit und Bewertung

Die Umsetzung enthält sichtbare Fokusmarkierungen, einen Sprunglink, beschriftete Eingaben, Fehlermeldungen mit Fokusführung, Statusansagen und eine Berücksichtigung reduzierter Bewegung. Diese Eigenschaften sind Bestandteil des Entwurfs, keine Behauptung einer vollständigen Barrierefreiheitszertifizierung. Die gewählte Richtung muss weiterhin auf den Zielgeräten und an den jeweiligen Aufgaben geprüft werden.
