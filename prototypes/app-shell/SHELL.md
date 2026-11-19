# Gemeinsame App-Shell

Stand: 19.11.2026. Umsetzung der bestätigten Marken-, Sprach- und Footerentscheidungen, isoliert von den Produktivapps. Der ergänzende Standardentwurf liegt in `docs/family-shell-standard-1.1.md`.

## Vertrag

- Eigenes App-Logo plus Appname im Header; Link zurück zur jeweiligen Arbeitsfläche. Logos bleiben unverändert.
- haak3 als zurückhaltender Footerabsender mit Link zu haak3.de.
- Hilfe, Beispiele, Über die App, Unterstützen, AGB, Datenschutz und Impressum bleiben sichtbar, auch bei 320 px.
- Ein einzelner Footer-Link „Weitere Tools für Schule“ verweist auf haak3.de/apps-fur-die-schule/.
- Kaffee-Icon plus „Unterstützen“ steht als gefüllte orange Schaltfläche im Footer und öffnet intern. Erst dort führt ein einfacher externer Link zu Buy Me a Coffee; keine Widgets oder Tracking-Skripte.
- GitHub als Icon mit zugänglichem Namen, Fokus-/Hoverhinweis und mindestens 44×44 px. Nur bei bestätigtem öffentlichem Repository.
- Natives Sprachmenü mit ausgeschriebenen Namen; nur tatsächliche Übersetzungen. Bei einer Sprache entfällt es.

## Assets und Repositoryprüfung

SocialMediaCreator verwendet unverändert die rechteckige Variante `public/brand/smc-logo-blue-wide.png` seiner Quellapp, lokal kopiert als `public/brand/social-wide.png`. Da der Appname im Logo enthalten ist, wird er daneben nicht doppelt angezeigt; der Link behält seinen zugänglichen Namen. StoryboardCreator verwendet unverändert `packages/haak3-ui/assets/logo-default.png`, hier `public/brand/storyboard.png`: Dessen verfügbare breite Datei fügt vor allem Weißraum hinzu und verbessert die Headerdarstellung nicht. Für AgentOS wurde kein verwendbares Logo gefunden; der Appname dient vorerst als Wortmarke.

Am 13.11.2026 per GitHub-Repositorymetadaten als öffentlich bestätigt: [SocialMediaCreator](https://github.com/ChristianHaake/SocialMediaCreator), [StoryboardDesigner](https://github.com/ChristianHaake/StoryboardDesigner). Für AgentOS ist kein öffentlicher Repositorylink bestätigt; deshalb kein Icon. Keine Laufzeitabfrage externer Dienste.

## Verhalten

`AppShell.tsx` und `shell.module.css` teilen Header, Footer und Inhaltsseiten. `?page=help|examples|about|support|terms|privacy|imprint` bietet Direktlinks und Browserhistory. Die Arbeitsfläche bleibt beim Seitenwechsel montiert und ist währenddessen verborgen. Zurück zur App erhält Bearbeitungen und stellt den Fokus wieder her. Die parameterlose Startseite zeigt den direkten Editor; `?mode=review` schaltet Vergleich und Transfer frei. `?surface=standard` ist die versionierte, produktdatenfreie Shell-Prüffläche; ihr lokales Beispiel überschreibt keine eigene Notiz.

`Locale.tsx` bietet SocialMediaCreator Deutsch/English, die beiden Transfers nur Deutsch und die Shell-Prüffläche Deutsch, English, Français, Español sowie Nederlands. Die Browserpräferenz bestimmt den ersten unterstützten Startwert; unbekannte Browser-Sprachen starten auf Deutsch. Eine Auswahl wird unter `haak3-ui-workshop:<surface>:locale` gespeichert. Blockierter Speicher verhindert die Bedienung nicht. Der Sprachwechsel übersetzt Oberfläche, Fehler und Status, niemals die bearbeiteten Inhalte. Die Dokumentensprache folgt der Oberfläche.

## Prüfung und Grenzen

`npm test` umfasst elf Kontrastpaare, 15 Social- und zwölf Transferdatensätze sowie Shell-Ergebnisdatensätze. Shellprüfungen: drei Oberflächen und die zentrale Prüffläche bei 320/360/768/1440 px ohne horizontalen Seitenüberlauf, Footerziele ab 44 px Höhe, Logo-/Repositoryregeln, Direktlinks, History, Fokus, erhaltene Inhalte, Sprachfallback, gespeicherte Präferenz und blockierter Speicher. Für einen Server auf einem anderen Port: `PILOT_URL=http://127.0.0.1:4311/ node tests/shell.mjs`.

Die unabhängige [Review](SHELL-REVIEW.md) fand keinen blockierenden Quellcodebefund. Anschließend wurde die gesamte Suite erfolgreich erneut ausgeführt. Die fehlerhafte AgentOS-Supportaufnahme wurde neu erfasst und visuell geprüft; auch Social bei 320 px und Storyboard bei 768 px wurden nach der Neuerfassung betrachtet. Der zuvor fokussierte GitHub-Hinweis erscheint nicht mehr in den Einstiegsaufnahmen.

Datenschutz und Impressum beschreiben den lokalen Prototyp und kennzeichnen unvollständige Betreiberangaben. Sie sind keine freigegebenen Rechtstexte. Keine Originalapp und kein normatives Dokument im zentralen Standard wurden geändert. Reale Geräte, Screenreader, vollständige Tastaturabnahme und echter Browserzoom bleiben offen.
