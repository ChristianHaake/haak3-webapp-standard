# haak3 UI-Werkstatt

Drei klickbare SocialMediaCreator-Bedienkonzepte mit gleichen synthetischen Beispieldaten. **B – Direkter Editor ist ausgewählt** und Grundlage der isolierten StoryboardCreator-/AgentOS-Transfers. React/TypeScript, Vite, CSS Modules und vorhandenes Lucide. Keine neue Bibliothek für UI-Abstraktionen.

- [A: Geführter Ablauf](http://127.0.0.1:4310/?strategy=guided)
- [B: Direkter Editor](http://127.0.0.1:4310/?strategy=direct)
- [C: Vorschau als Arbeitsfläche](http://127.0.0.1:4310/?strategy=canvas)
- [StoryboardCreator: Transfer von B](http://127.0.0.1:4310/?surface=storyboard)
- [AgentOS: Transfer der gemeinsamen Designsprache](http://127.0.0.1:4310/?surface=agentos)
- [Zentrale Shell-Prüffläche](http://127.0.0.1:4310/?surface=standard)

## Lokal starten

```sh
cd prototypes/app-shell
npm ci
npx playwright install chromium
npm run build
npm run preview
```

`package-lock.json` ist Teil des Piloten. Node 22.12 bis 22.x verwenden. Der
Pilot teilt weder `node_modules` noch Build-Artefakte mit einer Produktiv-App.

## Funktionen und Grenzen

Die gemeinsame [App-Shell](SHELL.md) verwendet das eigene App-Logo im Header und haak3 im Footer. Hilfe, Über die App, Unterstützen, Datenschutz und Impressum öffnen intern und erhalten den Arbeitsstand. SocialMediaCreator bietet Deutsch/English mit gespeicherter Sprachpräferenz; die beiden Transfers bieten derzeit Deutsch. GitHub erscheint nur bei den zwei überprüften öffentlichen Repositories. AgentOS verwendet vorerst seinen Namen ohne erfundenes Logo.

Die Shellprüfung umfasst die drei Appflächen und die zentrale Prüffläche unter `?surface=standard`: Layout bei 320/360/768/1440 px, interne Seiten, History, Fokusrückgabe, erhaltene Bearbeitungen, Sprachfallback, Sprachwechsel und blockierten Browserspeicher. [Gemeinsamer Shellvertrag](SHELL.md). Die Rechtsseiten sind ausdrücklich lokale Entwürfe und nicht zur Veröffentlichung freigegeben.

Anlegen ersetzt den temporären Beispielbeitrag; Profil/Text bearbeiten, Hintergrund wählen, Themenfläche ausblenden, Vorschau prüfen, validierten JSON-Beispielexport herunterladen, Ausgangsbeispiel zurücksetzen. Anlegen, Reset, Reload und Variantenwechsel verwerfen Arbeit ausschließlich im gekennzeichneten temporären Prototyp. Keine Speicherintegration, kein Upload, keine produktive Veröffentlichung.

Das Exportformat `haak3.ui-prototype/1` enthält `synthetic: true` und den Beispielbeitrag. Es ist **nicht** in die bestehende App importierbar. Originale Bild-/Projektformate gehören zur späteren Migration, nicht zum Vergleichsexperiment.

Die Strategie- und Vergleichsnavigation ist Testumgebung, kein vorgeschlagener Produktheader. Die Themenfläche ist eine lokale CSS-Grafik; die Bildwahl ist nicht implementiert und wird nicht als Upload angeboten.

## Transfers von B

**StoryboardCreator:** drei synthetische Szenen auswählen, Titel/Handlung/Dialog direkt bearbeiten, Kamera-/Zeitangaben aufklappen, Szene hinzufügen und mit Auf-/Ab-Schaltflächen umordnen. Vorschau aktualisiert sich unmittelbar. Ein fehlender Szenentitel blockiert Export und führt zum Feld. Der Download ist Beispiel-JSON mit `haak3.storyboard-prototype/1`, keine importierbare `.storyboard`-Datei. Dauer ist eine zusätzliche Prototypangabe. Bild-Upload und Filmwiedergabe fehlen bewusst; der Szenenrahmen ist als Platzhalter bezeichnet.

**AgentOS:** vier synthetische Prozesse suchen/filtern, Inline-Details öffnen/schließen und die Szenarien Normal, Quelle veraltet, Keine Daten und Verbindungsfehler vergleichen. Quelle und Demo-Beobachtungszeit sind sichtbar; fehlende/veraltete Werte werden nicht als aktueller Erfolg ausgegeben. Keine produktive API, keine Prozesse starten/pausieren, kein dauerhaftes Speichern.

Gemeinsam sind Tokens, Bedienelemente, Feedback und interne CSS-Module. Die Aufgabenstruktur bleibt verschieden. Beide Transfers sind isoliert; Reload verwirft Änderungen. Kein Shared Package und keine Migration der ursprünglichen Anwendungen sind damit erfolgt.

## Prüfen

Bei laufendem Previewserver und installiertem Google Chrome:

```sh
npm test
```

`tests/browser.mjs` prüft die drei vollständigen Abläufe mit leerer Eingabe, Bearbeitung, Gestaltung, Vorschau, tatsächlichem Download samt JSON-Inhalt und Reset. Vier Viewports je Variante (320/360/768/1440), keine horizontale Seite, sichtbare Buttons mindestens 44 px hoch, Skiplink und Fokus des folgenden Controls sowie Canvas-Fokusrückgabe. 720 px Layoutbreite bildet den Reflow eines 1440-px-Fensters bei 200% Zoom ab; das ist kein echter Browserzoom-Test. Reduzierte Bewegung wird emuliert. Ergebnisse (15 Datensätze) und 30 Aufnahmen (Einstieg, Validierung, Bearbeitung und finale Vorschau) liegen unter `test-results/`. [Unabhängige Abschlussprüfung](REVIEW.md): für den Prototypenvergleich freigegeben, alle drei gemeldeten Punkte behoben.

Nicht vollständig abgedeckt: Screenreader, reale Touchgeräte, andere Browserengines, echte Browserzoom-Steuerung, alle Kontrastpaare, Offline/PWA, Dateiformate bestehender Apps oder Nutzervergleich. Keine Behauptung vollständiger WCAG-Konformität.

Die Ergebnisse unter `test-results/` und `REVIEW.md` betreffen den SocialMediaCreator-Vergleich. Die gesonderte Transferprüfung `npm run test:transfers` ist ebenfalls bestanden: zwölf Ergebnisdatensätze und 14 Screenshots unter `transfer-results/`. Geprüft wurden Szenenbearbeitung/-wechsel, Vorschau, Umordnung, Anlage, leere Titel, JSON-Download samt Inhalt und Reihenfolge; bei AgentOS Suche/Filter/Details/Fokusrückgabe und Normal-/Veraltet-/Leer-/Fehlerzustände. Beide Transfers passen in 320/360/768/1440 px ohne horizontale Seite; sichtbare Buttons messen mindestens 44×44 px. Reduzierte Bewegung, ausgewählte Tastaturpfade und 720-CSS-Pixel-Reflow wurden emuliert; keine externen Browserrequests oder Seitenfehler beobachtet. [Gesonderte unabhängige Transferprüfung](TRANSFER-REVIEW.md): **ship as an isolated prototype**, keine blockierenden Befunde im geprüften Umfang. Build einschließlich TypeScript bestanden.

## Dokumentation und Auswahl

[Abgleich mit haak3-webapp-standard](docs/standard-conformance.md): konkrete Baseline, Befunde, Ausnahmen und offene Releaseanforderungen. Die Werkstatt ist kein vollständig konformes Appgerüst. Der bisher vorgeschlagene React-Wechsel bei Feedbackbogen steht im Konflikt mit dessen ausdrücklicher Standard-Migrationsnotiz und muss separat begründet werden.

Aktuelle Farbentscheidung: [orange Akzentpalette mit Referenzen und Kontrastwerten](PALETTE.md). Die zuvor blaue Familie wurde auf Nutzerwunsch durch haak3-Markenorange, dunkles Aktionsorange und leicht warme Grautöne ersetzt. `tests/palette.mjs` prüft elf Kontrastpaare vor den Browserabläufen. Build und beide Browsersuiten bestanden; [unabhängige Farbprüfung](PALETTE-REVIEW.md) freigegeben im Prototypenumfang. Historische Screenshots/Reviews dokumentieren frühere Gestaltungsstände.

Der aktuelle Gestaltungsstand enthält einen gezielten Unslop-Pass. [Audit, neun Durchgänge und Vorher/Nachher](UNSLOP.md) dokumentieren ruhigere Auswahlflächen, leichtere Typografie, vereinheitlichte Icons/Abstände und konkretere Aufgabentexte; B und alle Abläufe bleiben erhalten. [Unslop-Abschlussprüfung](UNSLOP-REVIEW.md) ist die aktuelle begrenzte visuelle Review; ältere Reviewberichte bleiben historische Belege. Build und beide Browsersuiten wurden auf diesem Stand erneut erfolgreich ausgeführt.

[Audit, Backlog und Komponentenverträge](/Users/christianhaake/.codex/worktrees/b396/DEV-Memory/inbox/ui-overhaul/README.md). [Auswahlentscheidung B](/Users/christianhaake/.codex/worktrees/b396/DEV-Memory/inbox/ui-overhaul/AUSWAHL-B.md) ersetzt den offenen Auswahlstand in älteren Inbox-Dokumenten. Die Auswahl ist keine Freigabe für eine produktive Migration; bestehende Apps, APIs und Speicherformate bleiben unverändert.
