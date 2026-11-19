import React, {useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, ArrowRight, Check, Download, Eye, FileText, Layers, Pencil, Plus, RotateCcw, ShieldCheck} from 'lucide-react';
import './tokens.css';
import s from './workshop.module.css';
import AppShell from './AppShell';
import {LocaleProvider,useLocale} from './Locale';
import {english} from './socialMessages';
import TransferShell,{TransferLinks} from './TransferShell';
import StoryboardTransfer from './StoryboardTransfer';
import AgentOSTransfer from './AgentOSTransfer';
import StandardShell from './StandardShell';

type Strategy = 'guided'|'direct'|'canvas';
// Keep the legacy prototype theme ID; its displayed accent follows the current palette.
type Post = {author:string; text:string; theme:'blue'|'paper'; visual:boolean};
const initial:Post={author:'Klasse 9b',text:'Wem gehört die Stadt?\n\nHeute haben wir Ideen für unseren Schulweg gesammelt: mehr Platz fürs Rad, sichere Übergänge und Orte zum Treffen. Welche Idee würdet ihr zuerst umsetzen?\n\n#UnsereStadt #Perspektivwechsel',theme:'blue',visual:true};
const strategies:{id:Strategy;name:string;description:string;icon:typeof Layers}[]=[
  {id:'guided',name:'Geführter Ablauf',description:'Schritt für Schritt zum Beitrag',icon:Layers},
  {id:'direct',name:'Direkter Editor',description:'Schreiben und Ergebnis im Blick',icon:FileText},
  {id:'canvas',name:'Vorschau als Arbeitsfläche',description:'Am Ergebnis ansetzen',icon:Eye}
];
const steps=['Inhalt','Gestaltung','Vorschau & Export'];

function App(){
  const {locale}=useLocale();
  const t=(message:string)=>locale==='en'?(english[message]??message):message;
  const review=new URLSearchParams(location.search).get('mode')==='review';
  const param=new URLSearchParams(location.search).get('strategy');
  const strategy:Strategy=strategies.some(v=>v.id===param)?param as Strategy:'direct';
  const [post,setPost]=useState<Post>({...initial});
  const [step,setStep]=useState(0);
  const [tab,setTab]=useState<'edit'|'preview'>('edit');
  const [editing,setEditing]=useState(false);
  const [errors,setErrors]=useState<{author?:string;text?:string}>({});
  const [notice,setNotice]=useState('');
  const [created,setCreated]=useState(false);
  const authorRef=useRef<HTMLInputElement>(null);
  const textRef=useRef<HTMLTextAreaElement>(null);
  const heading=useRef<HTMLHeadingElement>(null);
  const canvasToggle=useRef<HTMLButtonElement>(null);
  const update=<K extends keyof Post>(key:K,value:Post[K])=>{setPost(p=>({...p,[key]:value}));setNotice('');setErrors(e=>({...e,[key]:undefined}));};
  function validate(){
    const next={author:post.author.trim()?undefined:'Gib einen Profilnamen ein.',text:post.text.trim()?undefined:'Schreibe zuerst einen Beitrag.'};
    setErrors(next);
    if(next.author||next.text){setTab('edit');setStep(0);setEditing(true);setTimeout(()=>{(next.author?authorRef.current:textRef.current)?.focus();},0);return false;}
    return true;
  }
  function navigate(next:number){if(next>step&&step===0&&!validate())return;setStep(next);setNotice('');setTimeout(()=>heading.current?.focus(),0);}
  function download(){
    if(!validate())return;
    try{
      const blob=new Blob([JSON.stringify({schema:'haak3.ui-prototype/1',synthetic:true,post},null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='haak3-beispielbeitrag.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      setNotice('Beispiel-JSON erstellt. Dein Browser übernimmt den Download.');
    }catch{setNotice('Download konnte nicht erstellt werden. Bitte versuche es erneut.');}
  }
  function reset(){setPost({...initial});setErrors({});setCreated(false);setStep(0);setEditing(false);setNotice('Ausgangsbeispiel wiederhergestellt.');}
  function newPost(){setPost({author:'Klasse 9b',text:'',theme:'blue',visual:true});setErrors({});setCreated(true);setStep(0);setTab('edit');setEditing(true);setNotice('Neuer Beispielbeitrag angelegt.');setTimeout(()=>textRef.current?.focus(),0);}

  const fields=<div className={s.fields}>
    <label htmlFor="author">{t("Profilname")} <span>{t("Fiktives Profil")}</span></label>
    <input ref={authorRef} id="author" maxLength={60} value={post.author} aria-invalid={!!errors.author} aria-describedby={errors.author?'author-error':undefined} onChange={e=>update('author',e.target.value)}/>
    {errors.author&&<p id="author-error" className={s.error} role="alert">{t(errors.author)}</p>}
    <label htmlFor="text">{t("Dein Beitrag")} <span>{t("Was soll dein Publikum erfahren?")}</span></label>
    <textarea ref={textRef} id="text" rows={9} maxLength={1200} value={post.text} aria-invalid={!!errors.text} aria-describedby={errors.text?'text-error':'text-help'} onChange={e=>update('text',e.target.value)} placeholder={t("Schreibe deinen ersten Satz …")}/>
    {errors.text&&<p id="text-error" className={s.error} role="alert">{t(errors.text)}</p>}
    <div className={s.fieldFooter}><span id="text-help">{t("Keine echten personenbezogenen Daten verwenden.")}</span><span>{post.text.length}/1200</span></div>
  </div>;
  const appearance=<fieldset className={s.appearance}><legend>{t("Beitragsgestaltung")}</legend><p>{t("Wähle einen ruhigen Hintergrund für deine Botschaft.")}</p><div className={s.swatches}>{(['blue','paper'] as const).map(theme=><button key={theme} type="button" aria-pressed={post.theme===theme} className={post.theme===theme?s.chosen:''} onClick={()=>update('theme',theme)}><span className={theme==='blue'?s.blueSwatch:s.paperSwatch}/>{t(theme==='blue'?'Orange':'Papier')}{post.theme===theme&&<Check size={18} strokeWidth={1.5}/>}</button>)}</div><label className={s.checkbox}><input type="checkbox" checked={post.visual} onChange={e=>update('visual',e.target.checked)}/>{t("Themenfläche im Beitrag zeigen")}</label></fieldset>;
  const preview=<article className={`${s.post} ${post.theme==='paper'?s.paper:''}`} aria-label={t("Beitragsvorschau")}>
    <div className={s.postHeader}><span className={s.avatar}>9b</span><div><strong>{post.author.trim()||t('Dein Profilname')}</strong><span>{t("Fiktiver Beitrag · Schulprojekt")}</span></div></div>
    {post.visual&&<div className={s.visual} lang="de"><div className={s.map} aria-hidden="true"><span/><span/><span/><span/></div><div className={s.visualCopy}><span>Unser Schulweg.</span><strong>Unsere<br/>Perspektive.</strong><span>Ein Projekt der Klasse 9b</span></div></div>}
    <div className={s.postBody}>{post.text.trim()?post.text:<p className={s.empty}>{t("Dein Beitrag ist noch leer. Schreibe etwas, um die Vorschau zu füllen.")}</p>}</div>
    <div className={s.postFooter}><span>{t("Simulation für den Unterricht")}</span><ShieldCheck size={18} strokeWidth={1.5}/></div>
  </article>;
  const exportButton=<button className={s.primary} onClick={download}><Download size={18} strokeWidth={1.5}/>{t("Beispiel-JSON herunterladen")}</button>;

  return <AppShell surface="social">
    <div className={s.frame}>
      <section className={s.intro}><div><h1>{t("Social-Media-Beiträge gestalten")}</h1><p>{review?t("Ein Schulweg-Beitrag, drei Editorvarianten. B ist ausgewählt; A und C bleiben zum Vergleich."):t("Entwickle einen fiktiven Beitrag für euer Schulprojekt und prüfe ihn direkt in der Vorschau.")}</p></div>{review&&<span className={s.sample}>{t("Nur synthetische Beispieldaten")}</span>}</section>
      {review&&<><nav className={s.strategies} aria-label={t("Designstrategie")}>{strategies.map(({id,name,description,icon:Icon},i)=><a key={id} href={`?mode=review&strategy=${id}`} aria-current={strategy===id?'page':undefined}><span className={s.strategyIcon}><Icon size={18} strokeWidth={1.5}/></span><span><strong>{t(name)}</strong><small>{t(description)}</small></span><span className={s.strategyNumber}>{String.fromCharCode(65+i)}</span></a>)}</nav><TransferLinks current="social"/></>}
      <main id="workspace" tabIndex={-1} className={s.workspace}>
        <div className={s.workspaceHeader}><div><h2>SocialMediaCreator</h2><p>{t("Ein fiktiver Fotobeitrag für euer Schulprojekt.")}</p></div><button className={s.secondary} onClick={newPost}><Plus size={18} strokeWidth={1.5}/>{t(created?'Weiteren Beitrag anlegen':'Beitrag anlegen')}</button></div>
        <div className={s.task}><strong>{t("Deine Aufgabe")}</strong><p>{t("Stelle eine Idee für einen besseren Schulweg vor. Bearbeite den Beitrag, prüfe dein Ergebnis und lade die Beispiel-JSON herunter.")}</p></div>
        {strategy==='guided'&&<><nav className={s.steps} aria-label={t("Arbeitsschritte")}>{steps.map((label,i)=><button key={label} aria-current={step===i?'step':undefined} onClick={()=>navigate(i)}><span>{i+1}</span><strong>{t(label)}</strong></button>)}</nav><div className={s.guided}><section className={s.editor}><h2 tabIndex={-1} ref={heading}>{t(steps[step])}</h2><p className={s.help}>{t(['Bring deine Idee auf den Punkt. Alles lässt sich später ändern.','Gib deinem Beitrag eine passende Form.','Prüfe dein Ergebnis. Danach kannst du die Beispiel-JSON herunterladen.'][step])}</p>{step===0?fields:step===1?appearance:<><div className={s.guidedPreview}>{preview}</div><p className={s.exportHint}>{t("Beispiel-JSON, kein Bildexport. Sie ist nicht für den Import in die bestehende App gedacht.")}</p></>}<div className={s.stepActions}>{step>0?<button className={s.secondary} onClick={()=>navigate(step-1)}><ArrowLeft size={18} strokeWidth={1.5}/>{t("Zurück")}</button>:<span/>}{step<2?<button className={s.primary} onClick={()=>navigate(step+1)}>{t(step===0?'Weiter: Gestaltung':'Weiter: Ergebnis')}<ArrowRight size={18} strokeWidth={1.5}/></button>:exportButton}</div></section>{step<2&&<aside className={s.previewAside}><div className={s.previewLabel}><Eye size={18} strokeWidth={1.5}/>{t("Dein Zwischenstand")}</div>{preview}</aside>}</div></>}
        {strategy==='direct'&&<><div className={s.mobileTabs} role="group" aria-label={t("Arbeitsansicht")}><button aria-pressed={tab==='edit'} onClick={()=>setTab('edit')}><Pencil size={18} strokeWidth={1.5}/>{t("Bearbeiten")}</button><button aria-pressed={tab==='preview'} onClick={()=>setTab('preview')}><Eye size={18} strokeWidth={1.5}/>{t("Ergebnis ansehen")}</button></div><div className={s.split}><section className={`${s.editor} ${tab!=='edit'?s.mobileHidden:''}`}><h2>{t("Beitrag bearbeiten")}</h2><p className={s.help}>{t("Text bearbeiten und das Ergebnis in der Vorschau prüfen.")}</p>{fields}<details className={s.details}><summary>{t("Gestaltung anpassen")}</summary>{appearance}</details></section><aside className={`${s.previewAside} ${tab!=='preview'?s.mobileHidden:''}`}><div className={s.previewLabel}><Eye size={18} strokeWidth={1.5}/>{t("Dein Ergebnis")}</div>{preview}<div className={s.exportArea}>{exportButton}<p className={s.exportHint}>{t("Beispiel-JSON · kein Bildexport und kein App-Projektformat")}</p></div></aside></div></>}
        {strategy==='canvas'&&<div className={s.canvas}><section className={s.canvasStage}><div className={s.canvasToolbar}><span><Eye size={18} strokeWidth={1.5}/>{t("Dein Beitrag")}</span><button ref={canvasToggle} className={s.secondary} aria-expanded={editing} aria-controls="context-editor" onClick={()=>{setEditing(!editing);setTimeout(()=>textRef.current?.focus(),0);}}><Pencil size={18} strokeWidth={1.5}/>{t(editing?'Bearbeitung schließen':'Beitrag bearbeiten')}</button></div><div className={s.canvasPreview}>{preview}</div><p className={s.canvasHint}>{t("Wähle „Beitrag bearbeiten“, um Text und Gestaltung direkt neben der Vorschau zu ändern.")}</p></section><aside id="context-editor" className={s.contextEditor}>{editing?<><h2>{t("Beitrag bearbeiten")}</h2><p className={s.help}>{t("Deine Änderungen erscheinen sofort im Ergebnis.")}</p>{fields}<details className={s.details}><summary>{t("Gestaltung anpassen")}</summary>{appearance}</details><button className={s.primary} onClick={()=>{if(validate()){setEditing(false);setTimeout(()=>canvasToggle.current?.focus(),0);}}}><Check size={18} strokeWidth={1.5}/>{t("Bearbeitung abschließen")}</button></>:<><h2>{t("Beitragsvorschau")}</h2><p>{t("Prüfe den Beitrag und öffne die Bearbeitung für Änderungen.")}</p><button className={s.primary} onClick={()=>{setEditing(true);setTimeout(()=>textRef.current?.focus(),0);}}>{t("Inhalt bearbeiten")}<ArrowRight size={18} strokeWidth={1.5}/></button></>}<div className={s.exportArea}>{exportButton}<p className={s.exportHint}>{t("Beispiel-JSON · kein Bildexport und kein App-Projektformat")}</p></div></aside></div>}
        <div className={s.status} role="status" aria-live="polite">{t(notice||'Änderungen bleiben nur bis zum Neuladen in diesem Prototyp.')}</div>
        <footer className={s.workspaceFooter}><span><ShieldCheck size={18} strokeWidth={1.5}/>{t("Keine Verbindung zu Social-Media-Diensten.")}</span><button className={s.textButton} onClick={reset}><RotateCcw size={18} strokeWidth={1.5}/>{t("Beispiel zurücksetzen")}</button></footer>
      </main>
      {review&&<section className={s.compare}><h2>{t("Woran merkst du, dass es funktioniert?")}</h2><div><p><strong>{t("Orientierung")}</strong>{t("Weißt du ohne Erklärung, was als Nächstes zu tun ist?")}</p><p><strong>{t("Kontrolle")}</strong>{t("Kannst du Änderungen prüfen und leicht korrigieren?")}</p><p><strong>{t("Bedienbarkeit")}</strong>{t("Erreichst du alles auf deinem Gerät ohne Umwege?")}</p></div><p className={s.choice}>{t("B – Direkter Editor ist ausgewählt. A und C bleiben zum Vergleich verfügbar; Variantenwechsel startet das Beispiel neu.")}</p></section>}
    </div></AppShell>;
}

const surface=new URLSearchParams(location.search).get('surface');
createRoot(document.getElementById('root')!).render(<LocaleProvider surface={surface==='standard'?'standard':surface==='storyboard'?'storyboard':surface==='agentos'?'agentos':'social'}>{surface==='standard'?<StandardShell/>:surface==='storyboard'?<TransferShell surface="storyboard"><StoryboardTransfer/></TransferShell>:surface==='agentos'?<TransferShell surface="agentos"><AgentOSTransfer/></TransferShell>:<App/>}</LocaleProvider>);
