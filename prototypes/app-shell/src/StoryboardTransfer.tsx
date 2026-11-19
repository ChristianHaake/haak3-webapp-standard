import React, {useRef, useState} from 'react';
import {ArrowDown, ArrowUp, Download, Eye, Pencil, Plus} from 'lucide-react';
import ui from './transfer.module.css';
import s from './storyboard.module.css';

type Scene = {id:string; title:string; action:string; dialogue:string; shotSize:string; durationSeconds:number};
const initialScenes:Scene[]=[
  {id:'1',title:'Der Morgen beginnt',action:'Die Gruppe kommt an der Kreuzung vor der Schule an. Fahrräder und Autos teilen sich den engen Weg.',dialogue:'„Hier wird es morgens ganz schön eng.“',shotSize:'Totale',durationSeconds:8},
  {id:'2',title:'Eine andere Perspektive',action:'Eine Schülerin zeigt auf den unübersichtlichen Übergang. Wir sehen den Schulweg aus ihrer Blickrichtung.',dialogue:'„Was wäre, wenn wir hier mehr Platz hätten?“',shotSize:'Halbtotale',durationSeconds:10},
  {id:'3',title:'Unsere Idee',action:'Die Gruppe stellt einen Vorschlag für einen sicheren Übergang vor und lädt die Klasse zur Diskussion ein.',dialogue:'„Ein sicherer Schulweg beginnt mit unserer gemeinsamen Idee.“',shotSize:'Nahaufnahme',durationSeconds:12}
];

export default function StoryboardTransfer(){
  const [scenes,setScenes]=useState<Scene[]>(()=>initialScenes.map(scene=>({...scene})));
  const [selectedId,setSelectedId]=useState('1');
  const [view,setView]=useState<'edit'|'preview'>('edit');
  const [invalidId,setInvalidId]=useState<string|null>(null);
  const [notice,setNotice]=useState('');
  const nextId=useRef(4);
  const titleRef=useRef<HTMLInputElement>(null);
  const scene=scenes.find(item=>item.id===selectedId)!;
  const position=scenes.findIndex(item=>item.id===selectedId);

  function update<K extends keyof Scene>(key:K,value:Scene[K]){
    setScenes(items=>items.map(item=>item.id===selectedId?{...item,[key]:value}:item));
    if(key==='title'&&invalidId===selectedId)setInvalidId(null);
    setNotice('');
  }
  function addScene(){
    const id=String(nextId.current++);
    setScenes(items=>[...items,{id,title:'',action:'',dialogue:'',shotSize:'Totale',durationSeconds:8}]);
    setSelectedId(id);setView('edit');setInvalidId(null);setNotice('Neue Szene angelegt. Gib ihr einen Titel.');
    setTimeout(()=>titleRef.current?.focus(),0);
  }
  function moveScene(direction:-1|1){
    const target=position+direction;
    if(target<0||target>=scenes.length)return;
    const reordered=[...scenes];
    [reordered[position],reordered[target]]=[reordered[target],reordered[position]];
    setScenes(reordered);setNotice(`Szene „${scene.title.trim()||'Ohne Titel'}“ steht jetzt an Position ${target+1} von ${scenes.length}.`);
    setTimeout(()=>document.getElementById(`scene-${selectedId}`)?.focus(),0);
  }
  function exportProject(){
    const invalid=scenes.find(item=>!item.title.trim());
    if(invalid){
      setSelectedId(invalid.id);setInvalidId(invalid.id);setView('edit');setNotice('Export noch nicht möglich. Ergänze den fehlenden Szenentitel.');
      setTimeout(()=>titleRef.current?.focus(),0);return;
    }
    try{
      const blob=new Blob([JSON.stringify({schema:'haak3.storyboard-prototype/1',synthetic:true,projectName:'Unser Schulweg',productType:'shortFilm',scenes:scenes.map((item,orderIndex)=>({...item,orderIndex}))},null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='haak3-schulweg-storyboard-beispiel.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      setNotice('Beispieldatei erstellt. Dein Browser übernimmt den Download.');
    }catch{setNotice('Download konnte nicht erstellt werden. Bitte versuche es erneut.');}
  }

  return <section className={ui.panel} aria-label="Storyboard-Arbeitsbereich">
    <div className={`${ui.toolbar} ${s.projectHeader}`}><div><h2>Unser Schulweg</h2><p className={ui.muted}>Kurzfilm · synthetisches Klassenprojekt</p></div><button className={ui.primary} onClick={exportProject}><Download size={18} strokeWidth={1.5} aria-hidden="true"/>Beispiel exportieren</button></div>
    <p className={s.intro}>Plane eine Szene direkt im Editor. Die Vorschau zeigt sofort, wie Bildidee, Handlung und Dialog zusammenpassen.</p>
    <div className={s.layout}>
      <aside className={s.outline} aria-label="Szenenübersicht">
        <div className={s.outlineHeading}><h3>Szenen</h3><span>{scenes.length}</span></div>
        <nav className={s.sceneNav} aria-label="Szene auswählen">{scenes.map((item,index)=><button key={item.id} id={`scene-${item.id}`} className={`${s.sceneButton} ${item.id===selectedId?s.selected:''}`} aria-current={item.id===selectedId?'true':undefined} onClick={()=>{setSelectedId(item.id);setNotice('');}}><span className={s.number}>{String(index+1).padStart(2,'0')}</span><span><strong>{item.title.trim()||'Ohne Titel'}</strong><small>{item.shotSize} · {item.durationSeconds} Sek.</small></span></button>)}</nav>
        <button className={`${ui.secondary} ${s.add}`} onClick={addScene}><Plus size={18} strokeWidth={1.5} aria-hidden="true"/>Szene hinzufügen</button>
      </aside>
      <div className={s.workarea}>
        <div className={ui.mobileTabs} role="group" aria-label="Szenenansicht"><button className={ui.secondary} aria-pressed={view==='edit'} onClick={()=>setView('edit')}><Pencil size={18} strokeWidth={1.5} aria-hidden="true"/>Bearbeiten</button><button className={ui.secondary} aria-pressed={view==='preview'} onClick={()=>setView('preview')}><Eye size={18} strokeWidth={1.5} aria-hidden="true"/>Vorschau</button></div>
        <div className={ui.split}>
          <section className={`${ui.editor} ${view!=='edit'?ui.mobileHidden:''}`} aria-label="Szeneneditor">
            <div className={s.sceneHeading}><h3>Szene {position+1} bearbeiten</h3><div className={s.orderButtons}><button className={ui.secondary} aria-label="Aktuelle Szene nach oben verschieben" disabled={position===0} onClick={()=>moveScene(-1)}><ArrowUp size={18} strokeWidth={1.5} aria-hidden="true"/></button><button className={ui.secondary} aria-label="Aktuelle Szene nach unten verschieben" disabled={position===scenes.length-1} onClick={()=>moveScene(1)}><ArrowDown size={18} strokeWidth={1.5} aria-hidden="true"/></button></div></div>
            <div className={ui.fields}>
              <label htmlFor="scene-title">Szenentitel (Pflichtfeld)</label>
              <input ref={titleRef} id="scene-title" maxLength={100} value={scene.title} aria-invalid={invalidId===scene.id} aria-describedby={invalidId===scene.id?'scene-title-error':undefined} onChange={e=>update('title',e.target.value)}/>
              {invalidId===scene.id&&<p id="scene-title-error" className={ui.error} role="alert">Gib dieser Szene einen Titel.</p>}
              <label htmlFor="scene-action">Handlung</label>
              <textarea id="scene-action" rows={5} maxLength={2000} value={scene.action} placeholder="Was passiert in dieser Szene?" onChange={e=>update('action',e.target.value)}/>
              <label htmlFor="scene-dialogue">Dialog</label>
              <textarea id="scene-dialogue" rows={3} maxLength={1000} value={scene.dialogue} placeholder="Was sagen die Figuren?" onChange={e=>update('dialogue',e.target.value)}/>
            </div>
            <details className={s.details}><summary>Kamera und Zeit planen</summary><div className={ui.fields}><label htmlFor="scene-shot">Einstellungsgröße</label><select id="scene-shot" value={scene.shotSize} onChange={e=>update('shotSize',e.target.value)}><option>Totale</option><option>Halbtotale</option><option>Nahaufnahme</option></select><label htmlFor="scene-duration">Geplante Dauer</label><select id="scene-duration" value={scene.durationSeconds} onChange={e=>update('durationSeconds',Number(e.target.value))}>{[5,8,10,12,15,20,30].map(value=><option key={value} value={value}>{value} Sekunden</option>)}</select></div><p className={s.durationHint}>Die Dauer ist eine zusätzliche Prototypangabe, kein bestehendes Projektfeld.</p></details>
          </section>
          <aside className={`${ui.preview} ${view!=='preview'?ui.mobileHidden:''}`} aria-label="Szenenvorschau">
            <div className={s.previewHeading}><Eye size={18} strokeWidth={1.5} aria-hidden="true"/><h3>Live-Vorschau</h3></div>
            <article className={s.sceneSheet} aria-label="Vorschau der gewählten Szene">
              <div className={s.frame} role="img" aria-label={`Szenenrahmen als Platzhalter, ${scene.shotSize}. Kein Szenenbild.`}><strong>Szene {position+1}</strong><span>{scene.shotSize}</span><small>Bildidee · kein Szenenbild</small></div>
              <div className={s.sceneCopy}><div className={s.sceneMeta}><span>Kurzfilm</span><span>{scene.durationSeconds} Sek.</span></div><h3>{scene.title.trim()||'Dein Szenentitel'}</h3><h4>Handlung</h4><p>{scene.action.trim()||'Beschreibe, was in der Szene passiert.'}</p><h4>Dialog</h4><p className={s.dialogue}>{scene.dialogue.trim()||'Noch kein Dialog geplant.'}</p></div>
            </article>
            <p className={s.previewHint}>Text und Kameraangaben aktualisieren sich direkt. Im Prototyp gibt es keinen Bild-Upload und keine Filmwiedergabe.</p>
          </aside>
        </div>
      </div>
    </div>
    <div className={ui.status} role="status" aria-live="polite">{notice||'Temporärer Entwurf: Änderungen bleiben nur bis zum Neuladen.'}</div>
    <p className={s.exportHint}>Der Download enthält synthetisches Beispiel-JSON. Er ist keine .storyboard-Datei und kann nicht in die bestehende App importiert werden.</p>
  </section>;
}
