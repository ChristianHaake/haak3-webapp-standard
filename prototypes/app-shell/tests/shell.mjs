import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const output=fileURLToPath(new URL('../shell-results/',import.meta.url));
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
const base=process.env.PILOT_URL??'http://127.0.0.1:4310/';
async function capture(page,name){await page.evaluate(()=>scrollTo(0,0));await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await page.screenshot({path:`${output}/${name}.png`,fullPage:true,style:'*{-webkit-tap-highlight-color:transparent!important}'});}
try{
  for(const surface of ['social','storyboard','agentos']){
    const context=await browser.newContext({locale:'de-DE',viewport:{width:360,height:1000},hasTouch:true,reducedMotion:'reduce'});
    const external=[],errors=[];
    await context.route('**/*',route=>{if(new URL(route.request().url()).hostname!=='127.0.0.1'){external.push(route.request().url());return route.abort();}return route.continue();});
    const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
    const route=surface==='social'?'':`?surface=${surface}`;
    await page.goto(base+route);
    const footer=page.getByRole('navigation',{name:'Fußnavigation',exact:true});
    for(const name of ['Hilfe','Beispiele','Über die App','Unterstützen','AGB','Datenschutz','Impressum'])await expect(footer.getByRole('link',{name,exact:true})).toBeVisible();
    const related=page.getByRole('link',{name:'Weitere Tools für Schule',exact:true});await expect(related).toHaveAttribute('href','https://haak3.de/apps-fur-die-schule/');await expect(related).toHaveAttribute('target','_blank');await expect(related).toHaveAttribute('rel','noopener noreferrer');
    assert.equal(await footer.locator('a[href*="buymeacoffee"]').count(),0);
    const github=page.getByRole('link',{name:/Quellcode auf GitHub/});
    await expect(github).toHaveCount(surface==='agentos'?0:1);
    if(surface!=='agentos'){await expect(github).toHaveAttribute('target','_blank');await expect(github).toHaveAttribute('rel','noopener noreferrer');await github.focus();await expect(github.locator('span')).toBeVisible();await github.evaluate(link=>link.blur());await page.mouse.move(0,0);}
    await expect(page.getByLabel('Sprache',{exact:true})).toHaveCount(surface==='social'?1:0);
    const header=page.getByRole('banner');
    if(surface!=='agentos'){await expect(header.locator('img')).toHaveAttribute('src',surface==='social'?'/brand/social-wide.png':'/brand/storyboard.png');assert.equal(await header.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0),true);}
    await expect(header.getByRole('link')).toHaveAttribute('aria-label',surface==='social'?'SocialMediaCreator: Startseite':surface==='storyboard'?'StoryboardCreator: Startseite':'AgentOS: Startseite');
    if(surface==='social')await expect(header.getByRole('link')).not.toContainText('SocialMediaCreator');
    for(const width of [320,390,768,1440]){
      await page.setViewportSize({width,height:1000});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${surface}/${width} overflow`);
      const small=await footer.getByRole('link').evaluateAll(links=>links.filter(link=>link.getBoundingClientRect().height<43.5).map(link=>link.textContent));assert.deepEqual(small,[]);
      await capture(page,`${surface}-${width}`);
    }
    await page.setViewportSize({width:360,height:1000});
    if(surface==='social')await page.getByLabel('Dein Beitrag').fill('Dieser Arbeitsstand bleibt erhalten.');
    if(surface==='storyboard')await page.getByLabel('Szenentitel (Pflichtfeld)',{exact:true}).fill('Szenentitel bleibt erhalten');
    if(surface==='agentos')await page.getByRole('textbox',{name:'Prozesse suchen'}).fill('Repository');
    const support=footer.getByRole('link',{name:'Unterstützen',exact:true});
    await support.tap();await expect(page.getByRole('heading',{level:1,name:'Unterstützen',exact:true})).toBeFocused();
    const coffee=page.getByRole('link',{name:'Kaffee spendieren',exact:true});
    await expect(coffee).toHaveAttribute('href','https://www.buymeacoffee.com/Haake');await expect(coffee).toHaveAttribute('target','_blank');await expect(coffee).toHaveAttribute('rel','noopener noreferrer');
    assert.equal(await page.locator('iframe').count(),0);await capture(page,`${surface}-support-360`);
    await page.getByRole('link',{name:'Zurück zur App',exact:true}).tap();await expect(support).toBeFocused();
    if(surface==='social')await expect(page.getByLabel('Dein Beitrag')).toHaveValue('Dieser Arbeitsstand bleibt erhalten.');
    if(surface==='storyboard')await expect(page.getByLabel('Szenentitel (Pflichtfeld)',{exact:true})).toHaveValue('Szenentitel bleibt erhalten');
    if(surface==='agentos')await expect(page.getByRole('textbox',{name:'Prozesse suchen'})).toHaveValue('Repository');
    await footer.getByRole('link',{name:'Hilfe',exact:true}).tap();await expect(page.locator('#page-title')).toHaveText('Hilfe');await expect(page.getByRole('link',{name:'apps@haak3.de',exact:true})).toHaveAttribute('href',/mailto:apps@haak3\.de/);
    await page.goBack();await expect(page.locator('#workspace')).toBeVisible();
    await page.goForward();await expect(page.locator('#page-title')).toHaveText('Hilfe');
    for(const [value,title]of [['examples','Beispiele'],['about','Über die App'],['terms','AGB'],['privacy','Datenschutz'],['imprint','Impressum']]){
      await page.goto(base+route+`${route?'&':'?'}page=${value}`);await expect(page.getByRole('heading',{level:1,name:title,exact:true})).toBeVisible();
      await page.reload();await expect(page.locator('#page-title')).toHaveText(title);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    }
    await page.goto(base+route);
    await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Zum Arbeitsbereich',exact:true})).toBeFocused();
    assert.deepEqual(external,[]);assert.deepEqual(errors,[]);
    results.push({surface,widths:[320,390,768,1440],publicRepository:surface!=='agentos',menu:surface==='social',contentRoutes:true,statePreserved:true,history:true,externalRequests:external,pageErrors:errors});
    if(surface==='social'){
      await expect(page.getByRole('heading',{name:'Woran merkst du, dass es funktioniert?',exact:true})).toHaveCount(0);
      await expect(page.getByRole('navigation',{name:'Designstrategie',exact:true})).toHaveCount(0);
      await page.getByLabel('Dein Beitrag').fill('Eigener Inhalt bleibt unverändert.');
      await page.getByLabel('Sprache',{exact:true}).selectOption('en');
      await expect(page.locator('html')).toHaveAttribute('lang','en');
      await expect(page.getByLabel('Your post')).toHaveValue('Eigener Inhalt bleibt unverändert.');
      await expect(page.getByRole('heading',{name:'Create social media posts',exact:true})).toBeVisible();
      await page.getByRole('navigation',{name:'Footer navigation'}).getByRole('link',{name:'Support',exact:true}).tap();
      await expect(page.locator('#page-title')).toHaveText('Support');await expect(page.getByRole('link',{name:'Buy me a coffee',exact:true})).toBeVisible();
      await page.getByRole('link',{name:'Back to the app',exact:true}).tap();await expect(page.getByLabel('Your post')).toHaveValue('Eigener Inhalt bleibt unverändert.');
      await page.reload();await expect(page.getByLabel('Language',{exact:true})).toHaveValue('en');await capture(page,'social-english-360');
      for(const strategy of ['guided','direct','canvas']){
        await page.goto(base+`?mode=review&strategy=${strategy}`);await page.getByRole('button',{name:'Create post',exact:true}).tap();
        await expect(page.getByRole('heading',{name:'How can you tell whether it works?',exact:true})).toBeVisible();
        if(strategy==='guided')await page.getByRole('button',{name:'Next: appearance',exact:true}).tap();
        if(strategy==='direct'){await page.getByRole('button',{name:'View result',exact:true}).tap();await page.getByRole('button',{name:'Download sample JSON',exact:true}).tap();}
        if(strategy==='canvas')await page.getByRole('button',{name:'Download sample JSON',exact:true}).tap();
        await expect(page.getByRole('alert')).toHaveText('Write a post first.');
      }
      results.push({surface,englishInterface:true,languagePersists:true,contentUnchanged:true,englishValidation:['guided','direct','canvas']});
    }
    await context.close();
  }
  for(const [browserLocale,expected]of [['de-DE','de'],['en-US','en'],['fr-FR','fr'],['es-ES','es'],['nl-NL','nl'],['it-IT','de']]){
    const context=await browser.newContext({locale:browserLocale,viewport:{width:360,height:1000},hasTouch:true});
    const page=await context.newPage();await page.goto(`${base}?surface=standard`);
    await expect(page.locator('html')).toHaveAttribute('lang',expected);
    const select=page.locator('select');await expect(select).toHaveCount(1);await expect(select.locator('option')).toHaveCount(5);
    await page.getByRole('link',{name:expected==='de'?'Beispiele':expected==='en'?'Examples':expected==='fr'?'Exemples':expected==='es'?'Ejemplos':'Voorbeelden'}).tap();
    await page.reload();
    await page.getByRole('link',{name:{de:'Zurück zur App',en:'Back to the app',fr:'Retour à l’application',es:'Volver a la aplicación',nl:'Terug naar de app'}[expected]}).tap();
    await page.getByLabel(expected==='de'?'Eigene Notiz':expected==='en'?'Your note':expected==='fr'?'Votre note':expected==='es'?'Tu nota':'Jouw notitie').fill('Bleibt erhalten');
    await page.getByRole('link',{name:expected==='de'?'Beispiele':expected==='en'?'Examples':expected==='fr'?'Exemples':expected==='es'?'Ejemplos':'Voorbeelden'}).tap();
    const start=page.getByRole('button',{name:expected==='de'?'Lokales Beispiel starten':expected==='en'?'Start local example':expected==='fr'?'Démarrer l’exemple local':expected==='es'?'Iniciar ejemplo local':'Lokaal voorbeeld starten'});
    await start.press('Enter');await expect(page.locator('#workspace')).toBeVisible();
    await expect(page.getByText('Bleibt erhalten',{exact:true})).toBeVisible();
    await page.goBack();await expect(page.locator('#page-title')).toBeFocused();
    await page.goForward();await expect(page.locator('#workspace')).toBeFocused();
    const routeTitles={help:{de:'Hilfe',en:'Help',fr:'Aide',es:'Ayuda',nl:'Hulp'},examples:{de:'Beispiele',en:'Examples',fr:'Exemples',es:'Ejemplos',nl:'Voorbeelden'},about:{de:'Über die App',en:'About',fr:'À propos',es:'Acerca de',nl:'Over de app'},support:{de:'Unterstützen',en:'Support',fr:'Soutenir',es:'Apoyar',nl:'Ondersteunen'},terms:{de:'AGB',en:'Terms',fr:'Conditions',es:'Términos',nl:'Voorwaarden'},privacy:{de:'Datenschutz',en:'Privacy',fr:'Confidentialité',es:'Privacidad',nl:'Privacy'},imprint:{de:'Impressum',en:'Legal notice',fr:'Mentions légales',es:'Aviso legal',nl:'Colofon'}};
    for(const [route,labels]of Object.entries(routeTitles)){await page.goto(`${base}?surface=standard&page=${route}`);await expect(page.getByRole('heading',{level:1,name:labels[expected],exact:true})).toBeVisible();await page.reload();await expect(page.locator('#page-title')).toHaveText(labels[expected]);}
    await page.goto(`${base}?surface=standard&page=support`);const coffee=page.getByRole('link',{name:{de:'Kaffee spendieren',en:'Buy me a coffee',fr:'Offrir un café',es:'Invitar un café',nl:'Trakteer op koffie'}[expected]});await expect(coffee).toHaveAttribute('href','https://www.buymeacoffee.com/Haake');await expect(coffee).toHaveAttribute('target','_blank');await expect(coffee).toHaveAttribute('rel','noopener noreferrer');assert.equal(await page.locator('iframe').count(),0);
    for(const width of [320,360,768,1440]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`standard/${browserLocale}/${width} overflow`);}
    results.push({surface:'standard',browserLocale,expectedLocale:expected,directRoute:true,history:true,examplePreservesWork:true,widths:[320,360,768,1440]});
    await context.close();
  }
  const blocked=await browser.newContext({locale:'de-DE'});
  await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});});
  const page=await blocked.newPage();await page.goto(base);await page.getByLabel('Sprache',{exact:true}).selectOption('en');await expect(page.locator('html')).toHaveAttribute('lang','en');
  results.push({blockedStorage:'language switch stays usable'});await blocked.close();
  await writeFile(`${output}/results.json`,JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
  console.log(`PASS: ${results.length} shell result records; ${output}`);
}finally{await browser.close();}
