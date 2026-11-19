---
name: haak3 UI-Werkstatt
description: Gemeinsame helle Designsprache für einen lokalen Bedienkonzeptvergleich
colors:
  app-bg: "#f4f2ef"
  surface: "#fff"
  surface-subtle: "#f8f6f3"
  text: "#24211e"
  text-muted: "#645c53"
  border: "#dfdad4"
  control-border: "#887b6b"
  brand: "#ff9000"
  on-brand: "#24211e"
  primary: "#b84a00"
  primary-hover: "#943900"
  primary-soft: "#fff0df"
  danger: "#b42318"
  danger-soft: "#fef3f2"
  success: "#176b3a"
  success-soft: "#edfbf2"
typography:
  headline:
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.02em"
  title:
    fontSize: "1.35rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-.02em"
  body:
    fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'
    fontSize: "16px"
    lineHeight: 1.5
  label:
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  button-text:
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "12px"
  strategy-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "16px"
  post-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
---

# Design System: haak3 UI-Werkstatt

## Overview

Die gemeinsame Sprache besteht aus orangefarbenen Handlungen, hellen Arbeitsflächen und lokalen Systemschriften. Sie unterstützt schulische Arbeit auf Tablet und Smartphone mit lesbaren Texten, sichtbaren Zuständen und ausreichend großen Bedienelementen.

Die drei Kompositionen verwenden dieselben visuellen Bausteine. Christian hat B – Direkter Editor gewählt. A und C bleiben Vergleichsalternativen. Die gewählte Orientierung wird in isolierten StoryboardCreator- und AgentOS-Prototypen erprobt; die räumliche Anordnung folgt der jeweiligen Aufgabe. Das ist keine Produktionsfreigabe.

**Key Characteristics:**
- Helle, durch Rahmen gegliederte Panels.
- Orange für primäre Handlungen und Inhaltsvorschau; neutrale Auswahl- und Hinweisflächen.
- Lokale Systemschrift und sichtbare Tastaturfokusse.
- Unterschiedliche Kompositionen mit gemeinsamer Bausteinsprache.

## Colors

Die Akzentfamilie folgt dem Markenorange von haak3.de; leicht warme Neutraltöne tragen die Arbeitsflächen. Die Werte im Frontmatter folgen `src/tokens.css`; ungenutzte Variablen sind hier nicht als Gestaltungsvorgabe aufgenommen.

### Primary
- **Markenorange** (`brand`): #ff9000, auf haak3.de verifiziert. Die Inhaltsvorschau nutzt darauf dunklen Text (`on-brand`) mit 7,05:1; weiße Schrift wäre mit 2,27:1 unzureichend.
- **Dunkles Orange** (`primary`): primäre Schaltflächen, aktive Schritte, ausgewählte Szenennummer und Links. Weiß auf dieser Farbe erreicht 5,23:1.
- **Vertieftes Orange** (`primary-hover`): primärer Hoverzustand und laufende Prozessbeobachtung; derselbe Farbwert dient im CSS dem Fokusrahmen.
- **Helles Akzentorange** (`primary-soft`): Avatar und laufende Prozessbeobachtung. Gewöhnliche Navigation und temporäre Hinweise verwenden neutrale Flächen.

### Neutral
- **Kühler Seitenhintergrund** (`app-bg`): Raum außerhalb des Arbeitsbereichs und inaktive Schrittnummern.
- **Weiße Arbeitsfläche** (`surface`): Kopfzeile, Editor, Eingaben und Beitragskarte; zugleich Textfarbe auf der blauen Primärfläche.
- **Zurückgesetzte Vorschaufläche** (`surface-subtle`): Hintergrund der Vorschau und Canvas-Arbeitsfläche.
- **Dunkler Inhaltstext** (`text`): Überschriften, Eingaben und Beitragstext.
- **Gedämpfter Hinweistext** (`text-muted`): Hilfen, Metadaten und sekundäre Orientierung.
- **Leiser Rahmen** (`border`): Panelgrenzen, Trenner und sekundäre Schaltflächen.
- **Deutlicher Eingaberahmen** (`control-border`): Abgrenzung editierbarer Textfelder gegenüber der weißen Arbeitsfläche.

Das Fehlerrot (`danger`) kennzeichnet ungültige Eingaben und Fehlermeldungen. Der Papierhintergrund ist eine lokale Beitragsoption, keine zweite globale Markenfarbe.

AgentOS nutzt `danger`/`danger-soft` für fehlgeschlagene Beobachtungen und `success`/`success-soft` für erfolgreiche Beobachtungen. Status wird zusätzlich mit Text und Symbol vermittelt; historische Demowerte sind keine Live-Aussagen.

## Typography

**Body Font:** Lokaler Systemschriftstapel aus `typography.body`, durchgehend auch für Überschriften und Bedienelemente. Es werden keine Webfonts geladen.

Die Hierarchie entsteht vor allem durch Größe und Abstand. Überschriften verwenden Gewicht (500), hervorgehobene Texte und Schaltflächen höchstens (600). Die Hauptüberschrift nutzt `headline`, mobil (1.5rem); Abschnittsüberschriften grundsätzlich `title`. Fließtext und Eingaben behalten ausreichend Zeilenhöhe. Kleine Texte erhalten kein negatives Tracking.

Hilfetexte liegen überwiegend bei (12–14px), Eingaben bei (16px). Der Einleitungstext ist auf (65ch) begrenzt. Beitragsinhalt respektiert Zeilenumbrüche und bricht lange Wörter um.

## Layout

Der Seitenrahmen hat eine maximale Breite von (1280px) und auf großen Displays seitliche Innenabstände von (24px). Drei Strategielinks bilden zunächst eine gleich breite Reihe. Der Arbeitsbereich kapselt Kopf, Aufgabe, Bearbeitung, Status und Fußzeile.

Geführter Ablauf und direkter Editor verwenden auf breiten Displays zwei Spalten; der letzte geführte Schritt ist bei allen Breiten einspaltig und zentriert die Vorschau. Die Canvas-Komposition gewichtet die Vorschau stärker als den Kontexteditor. Die Beitragskarte bleibt maximal (440px) breit.

Bis (900px) werden Abstände kleiner und die Canvas-Komposition wird einspaltig. Bis (640px) stehen die Strategielinks untereinander, der geführte Ablauf zeigt seine begleitende Vorschau erst im Vorschau-Schritt und der direkte Editor bietet getrennte Ansichten für Bearbeiten und Vorschau. Die Canvas-Komposition stapelt Ergebnis und Kontexteditor. Die gemeinsame Sprache schreibt keine einheitliche App-Komposition vor.

Abstände und feste Kontrollhöhen folgen überwiegend dem Vier-Pixel-Raster; Rahmen und Fokusabstände bleiben davon ausgenommen. Die Werte stehen direkt in der CSS, nicht in einer zusätzlichen Abstandstokensammlung.

Die Transferflächen verwenden dieselben Tokens über `transfer.module.css` und einen gemeinsamen Werkstattrahmen. Der Storyboardtransfer trennt Szenennavigation, direkten Editor und Vorschau. Bis (900px) wechseln Schaltflächen zwischen Editor und Vorschau; ab (901px) stehen beide im zweispaltigen Arbeitsbereich. Die Szenenvorschau ist ein beschrifteter Platzhalter mit Textangaben, keine generierte Illustration.

AgentOS übernimmt die Grundsprache mit einer Prozessliste, Such-/Statusfiltern und Inline-Details. Das ist eine lesende Betriebsaufgabe, kein Szeneneditor. Die Quelle und die synthetischen Zustände bleiben auffindbar; fehlende oder veraltete Daten sind eigene Informationszustände. Die Prototypnavigation verbindet die Flächen, ist aber kein verpflichtender Produktheader aller Apps.

## Elevation & Depth

Tiefe entsteht durch Weiß gegenüber zurückgesetzten hellen Flächen, dünne Rahmen und klare Abschnittsgrenzen. Navigation markiert Auswahl mit einer neutralen Oberflächenstufe und dem deutlicheren ein Pixel starken Kontrollrahmen. Der aktive Editor-/Vorschau-Button im Transfer hat zusätzlich eine zwei Pixel starke innere Unterkante in der sekundären Textfarbe; sie verändert keine Abmessungen und dient nicht als Schatteneffekt. Fachliche Prozesszustände behalten ihre semantische Farbe.

## Shapes

Die drei vorhandenen Radien ordnen die Formen: kleine Rundungen für Eingaben und Schaltflächen, mittlere für Navigation und Beitragskarte, große für den gesamten Arbeitsbereich. Avatar und Schrittnummern sind kreisförmig. Der Arbeitsbereich schneidet seine Inhalte an der äußeren Kontur ab.

## Components

### Buttons

Primäre Handlungen verwenden dunkles Orange mit weißer Schrift, sekundäre Handlungen Weiß mit Rahmen. Textschaltflächen tragen dunkles Orange ohne gefüllten Hintergrund. Die Standardhöhe beträgt mindestens (44px), die Standardfüllung folgt den Komponenten im Frontmatter. Primäre Schaltflächen vertiefen beim Hover ihre Farbe; sekundäre Handlungen erhalten eine neutrale Oberflächenstufe. Es gibt keinen zusätzlichen Helligkeitsfilter. Deaktivierte Schaltflächen haben reduzierte Deckkraft. Funktionale Lucide-Symbole verwenden einheitlich (18px) Größe und (1.5) Strichstärke; rein dekorative Symbole entfallen.

### Inputs / Fields

Beschriftete weiße Eingaben besitzen einen sichtbaren grauen Rahmen und den kleinen Radius. Textfelder sind vertikal vergrößerbar. Fehler verändern die Rahmenfarbe und erhalten eine konkrete Textmeldung. Der Fokusrahmen ist (3px) stark und hat (3px) Abstand. Pflichtfeldprüfung lenkt den Fokus auf das erste betroffene Feld.

### Navigation

Die gemeinsame App-Shell führt mit eigenem App-Logo und Appname. Originale Logos werden nicht automatisch umgefärbt. haak3 steht zurückhaltend im Footer. Ein natives Sprachmenü nennt verfügbare Sprachen ausgeschrieben; bei einer Sprache entfällt es. Footerlinks bleiben auch bei 320 px sichtbar und brechen um. Unterstützen trägt ein Kaffee-Icon und öffnet die interne Seite; erst dort führt ein einfacher Link zum Spendenanbieter. GitHub erscheint als benanntes Icon mit Fokus-/Hoverhinweis und 44×44-px-Ziel nur bei bestätigtem öffentlichem Repository.

Strategielinks sind gerahmte Karten; der aktuelle Link hat einen neutralen Kontrollrahmen und einen zurückgesetzten hellen Hintergrund. Geführte Schritte verwenden eine untere orange Auswahlmarkierung und eine gefüllte Schrittnummer. Auf Smartphones steuern beim direkten Editor zwei Schaltflächen die Arbeitsansicht mit neutraler Auswahlmarkierung. Auswahlzustände werden zusätzlich durch ARIA-Attribute beschrieben.

Die Transfernavigation verwendet umbruchfähige Links mit mindestens (44px) Höhe und `aria-current`. Storyboards Szenenauswahl ist eine benannte Liste von Schaltflächen; Auf-/Ab-Handlungen bieten eine Tastaturalternative zum Umordnen. AgentOS-Details öffnen inline und setzen beim Schließen Fokus zum gewählten Prozess zurück. Ein Modal ist für diese Abläufe nicht erforderlich.

### Chips / Auswahl

Der Prototyp-Hinweis ist eine passive neutrale Kennzeichnung. Die beiden Hintergrundoptionen sind echte Schaltflächen mit Farbmuster, Beschriftung, neutraler Auswahlfläche und Auswahlhäkchen. Sie sind keine universellen Filterchips. Temporäre Statusbänder bleiben neutral und verständlich beschriftet.

### Cards / Containers

Die Beitragskarte kombiniert Profilkopf, optionale Themenfläche, Text und Simulationshinweis. Sie nutzt Weiß, einen dünnen Rahmen und den mittleren Radius. Die größere Arbeitsfläche verwendet den großen Radius. Beide bleiben ohne Schatten.

### Motion and Focus

Schaltflächen wechseln ausschließlich Hintergrund-, Text- und Rahmenfarbe über (160ms) mit `cubic-bezier(.22,1,.36,1)`. Bei reduzierter Bewegung entfallen Animationen und Übergänge. Fokusmarkierungen bleiben sichtbar; Bewegung ist kein notwendiges Signal für einen Zustand. Nach erfolgreichem Abschluss der Canvas-Bearbeitung kehrt der Fokus zur Schaltfläche „Beitrag bearbeiten“ zurück.

## Do's and Don'ts

### Do:
- **Do** die orange Akzentfamilie, helle Panels und lokale Systemschriften als gemeinsame Sprache beibehalten.
- **Do** die Komposition an die Aufgabe und die verfügbare Breite anpassen.
- **Do** Auswahl, Fehler und Tastaturfokus sichtbar und textlich verständlich machen.
- **Do** den direkten Editor als gewählte Grundlage nutzen und den Betriebsablauf von AgentOS eigenständig halten.

### Don't:
- **Don't** die Auswahl von B als Produktionsfreigabe oder als gemessenen Nutzertestsieg behandeln.
- **Don't** externe Schriftdateien für diese Designsprache voraussetzen.
- **Don't** funktionale Zustände allein durch Bewegung vermitteln.
