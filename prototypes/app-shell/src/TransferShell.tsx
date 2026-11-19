import React from 'react';
import ui from './transfer.module.css';
import AppShell from './AppShell';
import {useLocale} from './Locale';

type Surface='social'|'storyboard'|'agentos';
export function TransferLinks({current}:{current:Surface}){
  const {locale}=useLocale();
  return <nav className={ui.nav} aria-label={locale==='en'?'Prototypes of selected direction B':'Prototypen der gewählten Richtung B'}>{[
    ['social','?strategy=direct','SocialMediaCreator'],
    ['storyboard','?surface=storyboard','StoryboardCreator'],
    ['agentos','?surface=agentos','AgentOS']
  ].map(([id,href,label])=><a key={id} href={href} aria-current={current===id?'page':undefined}>{label}</a>)}</nav>;
}
export default function TransferShell({surface,children}:{surface:'storyboard'|'agentos';children:React.ReactNode}){
  const title=surface==='storyboard'?'StoryboardCreator':'AgentOS';
  return <AppShell surface={surface}><div className={ui.shell}><TransferLinks current={surface}/><main id="workspace" tabIndex={-1}><div className={ui.surfaceTitle}><h1>{title}</h1><p>{surface==='storyboard'?'Szenen für „Unser Schulweg“ bearbeiten und in der Vorschau prüfen.':'Laufzustände, Fehler und Datenalter der Demo-Prozesse prüfen.'}</p></div>{children}</main></div></AppShell>;
}
