import React, {useRef, useState} from 'react';
import {Activity, AlertCircle, ArrowRight, CheckCircle2, CircleHelp, Clock3, Search, ShieldCheck, X} from 'lucide-react';
import ui from './transfer.module.css';
import s from './agentos.module.css';

type Run = 'running' | 'succeeded' | 'failed' | 'unknown';
type Scenario = 'normal' | 'stale' | 'empty' | 'error';
type Process = {id: string; name: string; profile: string; run: Run; paused: boolean; lastSuccess: string; cadence: string; reason: string};
const processes: Process[] = [
  {id:'demo-source', name:'Quellen-Synchronisation', profile:'connector', run:'failed', paused:false, lastSuccess:'Vor 2 Stunden', cadence:'Alle 15 Minuten', reason:'Die Beispielquelle hat nicht rechtzeitig geantwortet. Der letzte erfolgreiche Stand bleibt erhalten.'},
  {id:'demo-check', name:'Repository-Prüfung', profile:'coder', run:'unknown', paused:false, lastSuccess:'Nicht übermittelt', cadence:'Nicht übermittelt', reason:'Der Demo-Datensatz liefert keinen verlässlichen Laufstatus. Fehlende Daten sind kein erfolgreicher Lauf.'},
  {id:'demo-index', name:'Index aktualisieren', profile:'librarian', run:'running', paused:false, lastSuccess:'Vor 30 Minuten', cadence:'Alle 30 Minuten', reason:'Aktive Verarbeitung im Beispieldatensatz. Es werden keine tatsächlichen Prozesse ausgeführt.'},
  {id:'demo-export', name:'Hermes-State-Export', profile:'librarian', run:'succeeded', paused:true, lastSuccess:'Vor 2 Tagen', cadence:'Zeitplan pausiert', reason:'Der Beispielzeitplan ist bewusst pausiert. Deshalb ist kein nächster Lauf vorgesehen.'},
];
const labels: Record<Run, string> = {running:'Läuft', succeeded:'Erfolgreich', failed:'Fehlgeschlagen', unknown:'Unbekannt'};
const icons = {running:Activity, succeeded:CheckCircle2, failed:AlertCircle, unknown:CircleHelp};

export default function AgentOSTransfer(){
  const [scenario,setScenario] = useState<Scenario>('normal');
  const [query,setQuery] = useState('');
  const [filter,setFilter] = useState('all');
  const [selected,setSelected] = useState<Process|null>(null);
  const [openedAt] = useState(()=>new Date());
  const searchRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLHeadingElement>(null);
  const triggers = useRef(new Map<string,HTMLButtonElement>());
  const rows = scenario==='empty' ? [] : processes.filter(p=>
    `${p.name} ${p.profile}`.toLocaleLowerCase('de').includes(query.trim().toLocaleLowerCase('de')) &&
    (filter==='all' || (filter==='attention' && (p.run==='failed'||p.run==='unknown')) || (filter==='running'&&p.run==='running') || (filter==='paused'&&p.paused) || (filter==='unknown'&&p.run==='unknown')));
  const observedAt = new Date(openedAt.getTime()-(scenario==='stale'?600000:30000));
  const stamp = new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Berlin'}).format(observedAt);
  function select(process:Process){setSelected(process);setTimeout(()=>detailRef.current?.focus(),0);}
  function close(){const id=selected?.id;setSelected(null);setTimeout(()=>{const trigger=id?triggers.current.get(id):null;if(trigger)trigger.focus();else searchRef.current?.focus();},0);}
  return <div className={`${ui.panel} ${s.root}`}>
    <section className={s.source} aria-label="Datenquelle">
      <div><ShieldCheck size={18} strokeWidth={1.5}/><p><strong>Synthetische Demo · nur lesend</strong><span>Kein Live-Abruf, keine Verbindung zu Hermes und keine Steuerungsaktionen.</span></p></div>
      <label>Demo-Szenario<select aria-label="Demo-Szenario" value={scenario} onChange={e=>{setScenario(e.target.value as Scenario);setSelected(null);}}><option value="normal">Normal</option><option value="stale">Quelle veraltet</option><option value="empty">Keine Daten</option><option value="error">Verbindungsfehler</option></select></label>
    </section>
    {scenario==='stale'&&<p className={s.warning} role="status"><Clock3 size={18} strokeWidth={1.5}/><span><strong>Quelle veraltet.</strong> Die gezeigten Laufzustände sind historische Demo-Beobachtungen. Keine aktuellen Live-Aussagen.</span></p>}
    {scenario==='error'&&<p className={s.warning} role="alert"><AlertCircle size={18} strokeWidth={1.5}/><span><strong>Verbindungsfehler simuliert.</strong> Der letzte Demo-Stand bleibt sichtbar. Ob Prozesse noch laufen, ist unbekannt.</span></p>}
    <div className={s.workspace}>
      <section className={s.processPanel} aria-labelledby="process-list-title">
        <div className={s.panelHeading}><div><h2 id="process-list-title">Prozesse</h2><p>Fehler und fehlende Informationen zuerst prüfen.</p></div><span className={s.count}>{scenario==='empty'?0:processes.length} erfasst</span></div>
        <div className={s.filters}>
          <label><span>Prozesse suchen</span><div className={s.search}><Search size={18} strokeWidth={1.5}/><input ref={searchRef} value={query} placeholder="Name oder Profil" onChange={e=>{setQuery(e.target.value);setSelected(null);}}/></div></label>
          <label>Laufstatus filtern<select aria-label="Laufstatus filtern" value={filter} onChange={e=>{setFilter(e.target.value);setSelected(null);}}><option value="all">Alle Prozesse</option><option value="attention">Aufmerksamkeit</option><option value="running">Laufend</option><option value="paused">Zeitplan pausiert</option><option value="unknown">Unbekannt</option></select></label>
        </div>
        <p className={s.resultCount} role="status">{rows.length} {rows.length===1?'Prozess':'Prozesse'} angezeigt</p>
        {rows.length ? <ul className={s.processList}>{rows.map(p=>{const Icon=icons[p.run];return <li key={p.id} className={selected?.id===p.id?s.selected:''}>
          <div className={s.processTitle}><strong>{p.name}</strong><span>Profil: {p.profile}</span></div>
          <dl className={s.summary}><div><dt>Laufstatus</dt><dd><span className={`${s.run} ${s[p.run]}`}><Icon size={18} strokeWidth={1.5}/>{labels[p.run]}</span></dd></div><div><dt>Zeitplan</dt><dd>{p.paused?'Pausiert':'Aktiv'}</dd></div><div><dt>Letzter Erfolg im Beispiel</dt><dd>{p.lastSuccess}</dd></div></dl>
          <button ref={el=>{if(el)triggers.current.set(p.id,el);else triggers.current.delete(p.id);}} className={ui.secondary} aria-label={`${p.name}: Details anzeigen`} aria-expanded={selected?.id===p.id} aria-controls="process-detail" onClick={()=>select(p)}>Details<ArrowRight size={18} strokeWidth={1.5}/></button>
        </li>;})}</ul> : <div className={s.empty}><h3>{scenario==='empty'?'Noch keine Prozessdaten':'Keine passenden Prozesse'}</h3><p>{scenario==='empty'?'In diesem Szenario liegt kein erfolgreicher Snapshot vor. Keine Daten sind kein gesunder Zustand.':'Passe die Suche oder den Statusfilter an.'}</p>{scenario!=='empty'&&<button className={ui.secondary} onClick={()=>{setQuery('');setFilter('all');searchRef.current?.focus();}}>Filter zurücksetzen</button>}</div>}
        <footer className={s.observation}><Clock3 size={18} strokeWidth={1.5}/><span>{scenario==='empty'?'Keine Beobachtung vorhanden':`Demo-Momentaufnahme: ${stamp} · Europe/Berlin`}</span></footer>
      </section>
      <aside id="process-detail" className={s.detail} aria-label="Prozessdetails">
        {selected?<><div className={s.detailHeading}><h2 ref={detailRef} tabIndex={-1}>{selected.name}</h2><button className={ui.secondary} aria-label="Prozessdetails schließen" onClick={close}><X size={18} strokeWidth={1.5}/></button></div><span className={`${s.run} ${s[selected.run]}`}>{labels[selected.run]}</span><section className={s.reason}><h3>{selected.run==='failed'||selected.run==='unknown'?'Befund':'Beobachtung'}</h3><p>{selected.reason}</p></section><dl className={s.detailData}><div><dt>Profil</dt><dd>{selected.profile}</dd></div><div><dt>Prozess-ID</dt><dd>{selected.id}</dd></div><div><dt>Zeitplan</dt><dd>{selected.cadence}</dd></div><div><dt>Letzter Erfolg im Beispiel</dt><dd>{selected.lastSuccess}</dd></div><div><dt>Quelle</dt><dd>Synthetisches Fixture</dd></div></dl><p className={s.detailNote}>Nur lesende Ansicht. Diese Demo kann Prozesse weder starten noch pausieren.</p></>:<div className={s.detailEmpty}><h2>Prozess auswählen</h2><p>Wähle einen Prozess, um Befund, Zeitplan und Datenquelle zu prüfen.</p></div>}
      </aside>
    </div>
    <p className={ui.status}>Demo-Zustand nur im Arbeitsspeicher. Neuladen stellt das Ausgangsbeispiel wieder her.</p>
  </div>;
}
