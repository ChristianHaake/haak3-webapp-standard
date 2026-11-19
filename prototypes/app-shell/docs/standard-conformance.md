# haak3-Standard: Abgleich der UI-Werkstatt

Standardversion: **1.0.0-draft**. Gelesener Commit: `883b12a0a6395c3f0367509b82db42fdb4ce352b`. Prüftag: 13.11.2026. Quelle: `/Users/christianhaake/Git-Repos/haak3-webapp-standard/docs/`.

Status: **isolierter Prototyp, keine vollständige Standardkonformität und keine Releasefreigabe**. Diese Datei macht den Standard zur Prüfbasis der weiteren Übernahme. Sie verändert dessen normative Dokumente nicht.

## Autorität und Rollen

1. Der zentrale Standard beschreibt die appübergreifenden Produkt-, Datenschutz-, Interaktions- und Abnahmeregeln.
2. Explizite Nutzerentscheidungen bestimmen gewünschte Abweichungen. B und Orange sind bestätigt; Abweichungen müssen trotzdem nachvollziehbar dokumentiert sein.
3. Die Werkstatt erprobt Regeln und Gestaltungsvarianten. Ihre drei Prototypen sind weder drei produktive Übernahmen noch Grundlage für die automatische Extraktion eines Shared Package.
4. Appbezogene Konformitätsdokumente halten Version, genaue Regel, Grund, Geltungsbereich, Dauer und Prüftermin fest. Eine erfolgreiche visuelle Review ersetzt diese Prüfung nicht.

## Geltungsbereiche

- **Bildungsapps:** Standard für lokale, kontofreie Erstellung; gemeinsames visuelles Fundament, eigene Aufgabenstruktur.
- **EduNewsletter-Webapp:** Redaktion und Serverentwürfe sind ein anderer Nutzungskontext. UI-/A11y-Regeln teilen; accountfreie/lokal-only Erstellung nicht ohne Prüfung als erfüllte Eigenschaft zusagen. Bestehende Server-/Freigabearchitektur erhalten und anwendbare Ausnahmen ausdrücklich dokumentieren.
- **AgentOS:** Private lesende Betriebsoberfläche. Die Werkstatt verwendet nur Fixtures. Gemeinsame UI-Regeln übernehmen; Produktiv-API, Zugriffsschutz und Collector nicht durch Bildungsapp-Defaults ersetzen.
- **KnowledgeVault:** ausgeschlossen.

## Befundmatrix

„Geprüft“ bedeutet hier nur die genannte begrenzte Evidenz, nicht vollständige Konformität.

| Vorgabe | Prototypenstand | Konsequenz vor produktiver Übernahme |
|---|---|---|
| Semantische Tokens, lokale Schrift | Gemeinsame CSS-Variablen und Systemschrift vorhanden | Tokens in Originalapps mappen; keine drei abweichenden Kopien zum neuen Standard erklären |
| Primärfarbe darf begründet abweichen | Orange durch Nutzer bestätigt, Kontraste separat geprüft | Palette samt neutralen Änderungen als Familienvorschlag oder explizite Appabweichung übernehmen |
| Frameworkneutralität | React/TS in der Werkstatt | React als technische Empfehlung, nicht als universelles MUST in den Standard schreiben |
| Desktop Editor/Vorschau, mobile klare Ansicht | B und Storyboard mit direkter Vorschau/Ansichtswechsel | Entsprechende Originalabläufe einschließlich Assets und Formaten erhalten |
| Kernworkflow bei 320 und 390 px | Kernabläufe 320/360/768/1440; Shelllayout zusätzlich 390 geprüft | Vollständigen Kernablauf bei 390 px vor Produktivübernahme ergänzen; Shelllayout allein ersetzt ihn nicht |
| Controls mindestens 40×40, 44 bevorzugt | Transfers messen 44×44; Vergleich Höhe geprüft | Breitenprüfung für alle zentralen Vergleichscontrols und echte Touchgeräte ergänzen |
| Tastatur, Livefeedback und Fokus | Ausgewählte Pfade/Fokusrückgabe geprüft | Vollständigen Tastaturablauf, dynamische Ansagen und Screenreader prüfen |
| 200 Prozent Browserzoom | Nur 720-CSS-Pixel-Reflow als Näherung geprüft | Tatsächlichen Browserzoom prüfen; bisherigen Check nicht als gleichwertig verbuchen |
| Appearance bei langen Editoren SHOULD | Nur helle Oberfläche | Systemfarbschema oder explizit begründete Ausnahme je Langzeiteditor entscheiden |
| Footer und Pflichtinhalte | App-Shell mit Hilfe/Über/Support/Datenschutz/Impressum, Direktlinks und Rückweg geprüft; GitHub nur bei bestätigtem öffentlichem Repo | Betreiber-/Rechtstexte bleiben lokale Entwürfe; vor Veröffentlichung vollständig prüfen und ergänzen |
| Supportseite mit sicherem externem Link | Interne Seite mit Kaffee-Link, target/rel geprüft, keine Embeds | Betreiberangaben und endgültige Inhalte vor Veröffentlichung prüfen |
| Ersetzen nichtleerer Arbeit bestätigen | Beispielanlage, Reset und Variantenwechsel verwerfen temporären Zustand ohne Rückfrage | **Nicht als produktives Muster kopieren**; Bestätigung/Recovery aus Originalapps erhalten und testen |
| Imports validieren, Altprojekte erhalten | Kein Import und nur synthetische JSON-Downloads | Originale Importer, Schemas, Limits und Roundtrips prüfen; Beispiel-JSON nicht als Appformat verwenden |
| Speicher/Reset transparent | Inhaltsverlust bei Reload beschriftet; nur Sprachpräferenz lokal gespeichert, Ausfall des Speichers geprüft | Tatsächliches Projekt-localStorage/IndexedDB-Verhalten, Recovery und Löschung der Originalapp prüfen |
| Datenschutz und Netzverhalten | Transferbrowserprüfung ohne externe Requests, keine produktiven APIs | Produktionsnetz, CSP, Hosting-Ausnahmen und Datenschutzerklärung überprüfen; „Inhalte lokal“ ist nicht „keine technischen Verbindungsdaten“ |
| Build/Test/Lint/Typecheck/Verify/CI | Build/TypeScript und Browserchecks vorhanden | Lint, Verify, CI, Node-/Paketmanagerbindung und Lockfile für das echte Zielrepo sicherstellen |
| HTTPS, Headers und Caching | Lokaler Loopback-Preview | Deploymentheaders, Direktnavigation, Cache und noindex separat prüfen |
| Shared Package erst nach zwei Produktionsbelegen | Nur interne gemeinsame Module | Keine Paketextraktion allein aus diesen Prototypen ableiten |

## Dokumentierte Abweichungen

### Farbprofil – beabsichtigt

- **Regel:** Baselinewerte in `docs/design-system.md`; Primärton darf gemäß dortiger MAY-Regel produktbezogen geändert werden.
- **Grund:** Nutzer bevorzugt Orange und nennt haak3.de/NOREA als gestalterische Referenzen. Dunkles Aktionsorange erhält weiße Textkontraste; helles Markenorange verwendet dunkle Schrift.
- **Umfang:** Werkstatt und beide Transfers; `src/tokens.css`, Beitragsdarstellung, DESIGN und Palette. Enthält auch leicht warme neutrale Flächen/Textfarben sowie Radius-lg 16 statt Baseline 20 px. Die MAY-Regel für den Primärton allein wird nicht als pauschale Freigabe sämtlicher Baselineänderungen ausgelegt.
- **Dauer:** Im Entwurf beabsichtigt; endgültiges Familienprofil ist noch nicht in den zentralen Standard übernommen.
- **Prüftermin:** Vor erstem produktivem UI-Piloten; Abgleich mit Referenzapps und zentraler Reviewcheckliste.

### Werkstattumfang – vorübergehend

- **Regeln:** Vollständige Betreiber-/Rechtsinhalte, Datenerhalt bei Ersatz, vollständige A11y-/Release-/Produktionsprüfungen.
- **Grund:** Isolierter Vergleich mit synthetischen Daten, keine produktive Appvorlage.
- **Umfang:** Alle Werkstattflächen. Footer und interne Seiten sind inzwischen implementiert; rechtliche Vollständigkeit und übrige Lücken bleiben offene Anforderungen, keine dispensierte Produktivpflicht.
- **Dauer:** Nur Vergleichsphase. Keine produktive Veröffentlichung dieses Gerüsts als „standardkonform“.
- **Prüftermin:** Vor Übernahme in die erste Originalapp.

## Konflikt: gemeinsamer Zielstack versus Feedbackbogen

`docs/architecture.md` lässt Vanilla TypeScript ausdrücklich zu. `docs/app-adoption.md:67` fordert für Feedbackbogen „Keep Vanilla TypeScript; React migration is not justified.“ Der bisherige Flottenplan schlägt dort trotzdem eine React-Anbindung vor. Das ist ein echter Konflikt, keine bereits durch die Farbwahl erledigte Ausnahme.

Das Ziel eines gemeinsamen Stacks bleibt als Nutzerziel dokumentiert. Eine Feedbackbogen-Migration muss vor Implementierung mit Nutzen, Kosten und Erhalt von Speichern/Import/Export begründet und als bewusste Abweichung festgehalten werden. Ohne diese Begründung werden zunächst Tokens und Interaktionsmuster im vorhandenen Stack übernommen. Keine universelle React-Pflicht aus der Werkstatt ableiten; dasselbe Prinzip gilt für Prompter, während dort keine ausdrückliche appbezogene Gegenregel gefunden wurde.

## Redaktioneller Standardkonflikt

`docs/ui-patterns.md` untersagt das Verstecken essentieller Rechtslinks, nennt bei sehr schmalen Screens später aber den Datenschutzlink als ausblendbares Beispiel. Für den Entwurf gilt der strengere Weg: erforderliche Rechtslinks bleiben erreichbar und werden umgebrochen. Eine spätere Standardänderung sollte diesen Widerspruch ausdrücklich bereinigen, nicht kopieren.

Einige `app-adoption`-Migrationsnotizen sind historische Zustandsangaben, keine aktuelle Codeinventur. Beispielsweise besitzt Storyboard inzwischen Browsertests; die Aufforderung, solche erst hinzuzufügen, ist vor einer Übernahme gegen den jeweiligen aktuellen Checkout zu prüfen.

## Vorschlag zur kontrollierten Standardübernahme

Keine neue Pflicht wird durch dieses Dokument normativ. Vorgeschlagene Änderungen müssen gemeinsam in den zentralen Dokumenten geprüft werden:

- `docs/design-system.md`: orange Familienoption mit getrennten brand/on-brand/action/focus-Rollen, warmen Neutralwerten und belegten Kontrasten. Blau nicht kommentarlos aus bestehenden Apps entfernen.
- `docs/ui-patterns.md`: B als empfohlenes Editor-/Vorschaumuster konkretisieren, Produktshell von Werkstattnavigation trennen, Pflichtfooter und Datenverlustschutz erhalten; Datenschutzlink-Widerspruch bereinigen.
- `docs/app-adoption.md`: Anwendungsbereiche, bewusste Ausnahmen und aktuelle Migrationsbelege pflegen; Feedbackbogen-Stackentscheidung sichtbar machen.
- `docs/review-checklist.md`: jede tatsächlich neu beschlossene MUST-Regel aufnehmen; 390 px, echter Zoom, Schutz nichtleerer Arbeit und Farbkontraste nicht durch Prototypenscreenshots ersetzen.
- `concept.md`, README und Vorlagen gleichzeitig auf Widerspruchsfreiheit prüfen, insbesondere die bisher festgeschriebene blaue Referenz und frameworkneutrale Architektur. Bestehende Version nicht vorschnell „stable“ nennen.

Übernahmefolge bleibt die des Standards: Datenschutz/Recht/Netz → Datensicherheit → Zugänglichkeit/responsiver Ablauf → Shell/Tokens → Codeorganisation. Der UI-Pilot darf diese Reihenfolge nicht durch eine rein visuelle Abnahme ersetzen.
