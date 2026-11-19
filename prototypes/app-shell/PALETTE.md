# Orange Akzentpalette

Auf Nutzerwunsch ersetzt diese Palette die zuvor festgelegte blaue Akzentfamilie. B, Layout und Funktionen bleiben bestehen. Sie gilt für den SocialMediaCreator-Vergleich sowie beide Transfers.

## Verifizierte Referenzen

Am 13.11.2026 direkt im Browser über CSS-Variablen und berechnete Stile geprüft:

- [haak3.de](https://haak3.de/): `--brand-color` und `--ghost-accent-color` sind **#ff9000**. Die Website verwendet warme graue Hintergründe (#d6d3d0/#e1dedb).
- [NOREA.schule](https://norea.schule/): globale Primärfarbe **#d82c2c**, Sekundärfarbe **#0033a0**, weiße/hellgraue Flächen. Der Unterstützen-Button verwendet **#b84a00** mit weißem Text. NOREA wird ausdrücklich nicht als durchgehend orange Website beschrieben.

Übernommen wird die orange Farbfamilie, nicht das jeweilige komplette Website-Layout oder dessen Typografie. Die Prototypen behalten lokale Systemschriften.

## Rollen und Kontrast

| Rolle | Farbe | Einsatz |
|---|---|---|
| Markenorange | #ff9000 | Große Inhaltsakzente/Farbmuster; dunkler Text #24211e, 7,05:1 |
| Aktionsorange | #b84a00 | Hauptbuttons und Links; weißer Buttontext 5,23:1 |
| Hover/Fokus | #943900 | Hover und sichtbarer Tastaturfokus; weißer Text 7,38:1 |
| Akzentfläche | #fff0df | Kleine fachliche Akzentflächen; dunkles Orange darauf 4,67:1 |
| Hintergrund | #f4f2ef | Ruhige, leicht warme Arbeitsumgebung |
| Zurückgesetzte Fläche | #f8f6f3 | Vorschau und neutrale Hinweise |
| Text / Nebeninformation | #24211e / #645c53 | Inhalt und sekundäre Beschriftung |
| Kontrollrahmen | #887b6b | Eingabeabgrenzung; 4,12:1 auf Weiß |

Weiß auf dem hellen Markenorange erreicht nur **2,27:1**. Deshalb ist nicht jeder orange Bereich ein weiß beschrifteter Button. Diese Trennung ist bewusst und zentral in `src/tokens.css` definiert. Gewöhnliche Auswahlflächen bleiben gemäß Unslop neutral. Fehlerrot und Erfolgsgrün bleiben mit Text/Symbol erhalten; Orange ersetzt sie nicht.

## Umfang und Verträge

Änderung über gemeinsame Tokens, Beitragsdarstellung und deren sichtbares Farbwahl-Label „Orange“. Der bisherige interne Themebezeichner `blue` bleibt als Legacy-ID im synthetischen Beispiel-JSON erhalten, damit eine reine Farbänderung kein weiteres Format erzeugt. Die Bildschirmfarbe folgt nun der Akzentpalette; es gibt weiterhin keinen Import dieses Formats in Produktivapps.

Kein Framework-, Layout-, Datenmodell- oder Speicherwechsel. Keine zusätzliche Bibliothek. Historische Unslop-/Transferberichte bleiben unveränderte Belege ihres früheren Farbstands; aktuelle Tokens und DESIGN.md beschreiben Orange.

## Reproduzierbare Prüfung

`node tests/palette.mjs` prüft elf Kontrastpaare direkt aus den CSS-Tokens, darunter Buttontext, Akzenttext, Fokus, Rahmen sowie Fehler-/Erfolgszustände. Der Check läuft auch vor beiden Browsersuiten über `npm test`.

Diese mathematischen Paarprüfungen sind kein vollständiger WCAG-Audit. Physische Geräte und vollständige Screenreader-Bedienung bleiben ungeprüft. Bestehende produktive Apps wurden nicht verändert.

Build und `npm test` auf dem orangefarbenen Stand bestanden: elf Kontrastpaare, 15 Vergleichs- und zwölf Transfer-Ergebnisdatensätze. Aufnahmen für 320/360/768/1440 px aktualisiert. [Unabhängige Farbprüfung](PALETTE-REVIEW.md): **ship** im geprüften Prototypenumfang; keine wesentlichen Farbregressionen, Fokus und semantische Statusdarstellung erhalten. Der Reviewer hat die elf Kontrastpaare zusätzlich selbst ausgeführt, aber keine physischen Geräte oder vollständige Barrierefreiheit geprüft.
