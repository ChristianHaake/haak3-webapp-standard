import React,{createContext,useContext,useEffect,useState} from 'react';

export type Locale='de'|'en'|'fr'|'es'|'nl';
type Surface='social'|'storyboard'|'agentos'|'standard';
const Context=createContext<{locale:Locale;locales:Locale[];setLocale:(locale:Locale)=>void}|null>(null);
export function LocaleProvider({surface,children}:{surface:Surface;children:React.ReactNode}){
  const locales:Locale[]=surface==='standard'?['de','en','fr','es','nl']:surface==='social'?['de','en']:['de'];
  const key=`haak3-ui-workshop:${surface}:locale`;
  const [locale,setCurrent]=useState<Locale>(()=>{
    try{const saved=localStorage.getItem(key);if(locales.includes(saved as Locale))return saved as Locale;}catch{/* Preferences remain session-only when storage is blocked. */}
    const browser=navigator.language.toLowerCase().split('-')[0] as Locale;
    return locales.includes(browser)?browser:'de';
  });
  function setLocale(value:Locale){
    if(!locales.includes(value))return;
    setCurrent(value);try{localStorage.setItem(key,value);}catch{/* The current session still uses the selected language. */}
  }
  useEffect(()=>{document.documentElement.lang=locale;},[locale]);
  return <Context.Provider value={{locale,locales,setLocale}}>{children}</Context.Provider>;
}
export function useLocale(){const value=useContext(Context);if(!value)throw new Error('LocaleProvider is missing');return value;}
