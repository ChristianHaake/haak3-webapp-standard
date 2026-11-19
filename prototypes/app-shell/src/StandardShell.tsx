import React,{useState} from 'react';
import AppShell from './AppShell';
import {useLocale} from './Locale';
import ui from './transfer.module.css';

const copy={
  de:{title:'Zentrale App-Shell',intro:'Prüffläche für Navigation, Sprache und Inhaltsseiten. Keine Produktdaten werden verarbeitet.',label:'Eigene Notiz',hint:'Diese Notiz bleibt beim Starten des Beispiels erhalten.',button:'Lokales Beispiel starten',sample:'Lokales Beispiel ist aktiv.',status:'Bereit für die Shell-Prüfung.'},
  en:{title:'Central app shell',intro:'Validation surface for navigation, language and content pages. No product data is processed.',label:'Your note',hint:'This note remains when you start the example.',button:'Start local example',sample:'Local example is active.',status:'Ready for shell validation.'},
  fr:{title:'Structure centrale de l’application',intro:'Surface de validation pour la navigation, la langue et les pages de contenu. Aucune donnée de produit n’est traitée.',label:'Votre note',hint:'Cette note reste lorsque vous démarrez l’exemple.',button:'Démarrer l’exemple local',sample:'L’exemple local est actif.',status:'Prêt pour la validation de la structure.'},
  es:{title:'Estructura central de la aplicación',intro:'Superficie de validación para navegación, idioma y páginas de contenido. No se procesan datos de productos.',label:'Tu nota',hint:'Esta nota se conserva al iniciar el ejemplo.',button:'Iniciar ejemplo local',sample:'El ejemplo local está activo.',status:'Listo para validar la estructura.'},
  nl:{title:'Centrale app-shell',intro:'Validatieoppervlak voor navigatie, taal en inhoudspagina’s. Er worden geen productgegevens verwerkt.',label:'Jouw notitie',hint:'Deze notitie blijft behouden wanneer je het voorbeeld start.',button:'Lokaal voorbeeld starten',sample:'Lokaal voorbeeld is actief.',status:'Klaar voor shell-validatie.'}
};

export default function StandardShell(){
  const {locale}=useLocale();const text=copy[locale];const [note,setNote]=useState('');const [sample,setSample]=useState(false);
  const start=()=>setSample(true);
  return <AppShell surface="standard" onStartExample={start}><main id="workspace" tabIndex={-1} className={ui.shell}><div className={ui.surfaceTitle}><h1>{text.title}</h1><p>{text.intro}</p></div><section className={ui.panel}><div className={ui.editor}><label className={ui.fields} htmlFor="standard-note">{text.label}<input id="standard-note" value={note} onChange={event=>setNote(event.target.value)}/><span className={ui.muted}>{text.hint}</span></label><button className={ui.primary} type="button" onClick={start}>{text.button}</button></div><div className={ui.preview} aria-live="polite"><h2>{sample?text.sample:text.status}</h2><p>{note||text.hint}</p></div></section></main></AppShell>;
}
