# Unslop-Pass auf der haak3 UI-Werkstatt

Stand: 13.11.2026. Angewendet auf den SocialMediaCreator-Vergleich und die StoryboardCreator-/AgentOS-Transfers. B bleibt ausgewählt; Funktionen, Beispielinhalte, Abschnittsreihenfolge und Exportverträge bleiben erhalten. Bestehende produktive Appquellen wurden nicht geändert.

Methode: **unslop by Damir Sokolovsky** ([heydamir.design/unslop](https://heydamir.design/unslop), [@heydamir](https://x.com/heydamir)), CC BY 4.0. Diese Anwendung und die angepasste Gestaltungsdokumentation behalten die Urheberangabe; kein Skillcode wurde als neue Abhängigkeit übernommen.

## Audit vor der Änderung

Einstufung: **leichte Gestaltungsschwächen**, deshalb Polish innerhalb der bestehenden Identität statt neuer visueller Welt.

- `src/tokens.css`: Standardüberschriften und native Hervorhebungen zu schwer; feste UI-Hierarchie fehlte gegenüber lokalen Gewichten bis 800.
- `src/workshop.module.css`: starke blaue Strategierahmen, Hintergrundflächen, Aufgabenlabel und temporäre Statusbänder konkurrierten mit der eigentlichen Beitragsvorschau.
- `src/transfer.module.css`: aktive Navigation und temporäre Hinweise verwendeten dasselbe blaue Signal wie Hauptaktionen und fachlicher Status.
- `src/storyboard.module.css`: Rahmenauswahl und blauer Platzhalter betonten Container stärker als Handlung und Dialog.
- Alle vier Modulstylesheets: wiederkehrende Abstände wie 7, 10, 18 und 22 px ohne einheitlichen Rhythmus; Auswahlzustände mit kompensierenden Sonderpaddings.
- Die drei Oberflächen: Lucide-Symbole in unterschiedlichen Größen und Strichstärken; dekorative große Symbole ohne zusätzliche Information.
- `src/main.tsx` und `TransferShell.tsx`: generische Überschriften und Metaerklärungen zur Designsprache statt konkreter Aufgabenorientierung.
- `src/workshop.module.css`: kursive leere Vorschau als unnötige Hervorhebung; Meta teilweise 11 px.
- `src/tokens.css`: allgemeine Helligkeitsänderung beim Hover statt gezielter, konsistenter Zustandsfarben.

Keine erfundenen Befunde: Farbverläufe, Glows, Emojis, Fake-Kennzahlen und übertriebene Animationen waren bereits nicht vorhanden. Gleiche Strategiekarten sind wegen des ausdrücklich fairen Variantenvergleichs sinnvoll und bleiben erhalten. Der große AgentOS-Detailbereich gehört zum vorhandenen Desktopablauf; er wurde nicht in eine neue Dashboardarchitektur umgebaut.

## Richtung

- **Produkt:** Lernende bearbeiten Unterrichtsinhalte; Betreiber prüfen synthetische Prozessbeobachtungen.
- **Charakter:** ruhig, präzise, zugänglich.
- **Welt:** Arbeitsdokumente, Szenenfolgen und nachvollziehbare Beobachtungen.
- **Schwerpunkt:** der tatsächlich bearbeitete Beitrag, Handlung/Dialog einer Szene und semantischer Prozessstatus.
- **Signatur:** lesbare Reihenfolge, dauerhafte Auswahlmarkierung und Quellen-/Datenkontext statt dekorativer Container.

Die ursprüngliche blaue Identität, helle Oberflächen und lokale Systemschrift sind verbindlich erhalten. Die ausdrückliche Anweisung, den Skill auf die bestehende Entwicklung anzuwenden, wurde als Auftrag zum begrenzten Polish umgesetzt; keine zusätzliche Identitätsentscheidung war nötig.

## Neun Durchgänge

| Durchgang | Umsetzung |
|---|---|
| 1. Abstände | Wiederkehrende Layoutabstände und feste Kontrollhöhen auf Vier-Pixel-Schritte gebracht; gleiche Paddings in gewählten/ungewählten Zuständen. Schrittmarken und Farbmuster wieder quadratisch 24×24. Rahmen und gut sichtbare 3-px-Fokusse ausgenommen. |
| 2. Farbe | Bestehende Palette behalten; gewöhnliche Auswahl und temporäre Hinweise neutral. Blau bleibt in Hauptaktionen, Beitragsinhalt und sinnvollen Zuständen. Fehler-/Erfolgsfarben bleiben fachlich beschriftet. |
| 3. Icons | Vorhandenes Lucide auf 18 px und Strichstärke 1,5 vereinheitlicht. Dekorative große Symbole und Beitrags-Pfeil entfernt; Status-/Aktionssymbole bleiben. |
| 4. Text | Kontexttitel „Social-Media-Beiträge gestalten“, „Beitrag bearbeiten“ und konkrete Szenen-/Prozessaufgaben. Keine neuen Produktversprechen. Pflichtfeldfehler und Export-/Datengrenzen bleiben ausdrücklich. |
| 5. Typografie | Überschriften Gewicht 500, Hervorhebungen höchstens 600; kompakte Hinweise mindestens 12 px. Keine Kursivbetonung, kein negatives Tracking am kleinen Markenwort. Lokale Systemschrift erhalten. |
| 6. Layout | Gewählte Komposition B und Abschnittsreihenfolge erhalten. Keine neue Hero-, Sidebar- oder Kartenarchitektur. Die aufgabenbezogenen Titel passen in die vorhandenen Arbeitsflächen. |
| 7. Details | Zahlen/Metadaten tabellarisch, Konturradien und 44-px-Ziele erhalten. Die aktive Transferansicht erhält eine neutrale innere Unterkante von 2 px; keine Abmessungsänderung beim Wechsel. |
| 8. Visuals | Reale Vorschauinhalte tragen die Farbe; der Storyboard-Bildrahmen bleibt ein ehrlich beschrifteter Platzhalter in neutraler Fläche. Keine generierten Bilder oder neuen Dekoelemente. |
| 9. Bewegung | Benannte Farb-/Rahmenübergänge mit 160 ms und einer Ease-out-Kurve; kein allgemeiner Helligkeitsfilter, keine neuen Einflüge oder Schleifen. Reduced Motion bleibt wirksam. |

## Prüfung und Review

`npm run build` bestanden. `npm test` bestanden: 15 Ergebnisdatensätze und 30 Screenshots im Variantenvergleich, zwölf Ergebnisdatensätze und 14 Screenshots für beide Transfers. Vorhandene Abläufe einschließlich echter JSON-Downloads, Reihenfolge, Eingaben, Validierung, Fokus, mobile Grenzen und Demo-Szenarien erneut geprüft. Neue gezielte Assertions sichern die leichtere Hauptüberschrift und die dauerhafte aktive mobile Transfermarkierung.

Vier Viewports 320/360/768/1440 px; keine horizontale Seite in den erfassten Zuständen. Transfers prüfen mindestens 44×44 px für sichtbare Buttons. Reduzierte Bewegung und ausgewählte Tastaturpfade emuliert; Reflow bei 720 CSS-Pixeln bleibt eine Näherung für 200 Prozent, kein echter Browserzoom.

[Unabhängige Abschlussprüfung](UNSLOP-REVIEW.md): Prototyp freigegeben. Ein gefundener zu schwacher Auswahlzustand wurde in einer gemeinsamen Korrekturrunde behoben; anschließend nur die betroffenen Zustände nachgeprüft. Drei visuelle Runden einschließlich Bestandsansicht und finaler Korrektur, keine neue Schleife nach Freigabe.

## Vorher / nachher

| Oberfläche | Vorher | Nachher |
|---|---|---|
| SocialMediaCreator Desktop | [Aufnahme](unslop-before/direct-1440.png) | [Aufnahme](test-results/direct-1440.png) |
| SocialMediaCreator mobil | [Aufnahme](unslop-before/direct-360.png) | [Aufnahme](test-results/direct-360.png) |
| StoryboardCreator Desktop | [Aufnahme](unslop-before/storyboard-1440.png) | [Aufnahme](transfer-results/storyboard-1440.png) |
| StoryboardCreator mobil | [Aufnahme](unslop-before/storyboard-360.png) | [Aufnahme](transfer-results/storyboard-360.png) |
| AgentOS Desktop | [Aufnahme](unslop-before/agentos-1440.png) | [Aufnahme](transfer-results/agentos-1440.png) |
| AgentOS mobil | [Aufnahme](unslop-before/agentos-360.png) | [Aufnahme](transfer-results/agentos-360.png) |

## Bewusst ausgelassen und Grenzen

Kein Storyvideo angefordert, keines erstellt. Keine Bildgenerierung: Es sind Arbeitsoberflächen, keine Marketing-Heros. Spätere echte Szenenbilder gehören zu Nutzerdaten der ursprünglichen App, nicht zu einer generierten Dekoration in diesem Entwurf.

Nicht geprüft: physische Geräte, vollständiger Screenreader-/WCAG-Audit, Produktivspeicherung, Offline/PWA und ursprüngliche Projektformate. Prototypen bleiben temporär und verwenden synthetische Daten. Keine neue Paketextraktion, keine Veröffentlichung und keine Produktivmigration. KnowledgeVault bleibt ausgeschlossen.
