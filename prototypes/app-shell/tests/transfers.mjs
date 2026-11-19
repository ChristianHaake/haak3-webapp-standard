import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const output=fileURLToPath(new URL('../transfer-results/',import.meta.url));
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
async function capture(page,name){
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(resolve)));
  await page.screenshot({path:`${output}/${name}.png`,fullPage:true});
}
async function checkLayout(page,name){
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${name}: horizontal page overflow`);
  const undersized=await page.locator('button:visible').evaluateAll(nodes=>nodes.filter(node=>{const r=node.getBoundingClientRect();return r.height<43.5||r.width<43.5;}).map(node=>node.getAttribute('aria-label')||node.textContent));
  assert.deepEqual(undersized,[],`${name}: control smaller than44px`);
}
try{
  for(const surface of ['storyboard','agentos']){
    const context=await browser.newContext({locale:'de-DE',viewport:{width:360,height:1000},hasTouch:true,reducedMotion:'reduce',acceptDownloads:true});
    const external=[],errors=[];
    await context.route('**/*',route=>{const url=new URL(route.request().url());if(url.hostname!=='127.0.0.1'){external.push(url.origin);return route.abort();}return route.continue();});
    const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`http://127.0.0.1:4310/?surface=${surface}`);
    await expect(page.getByRole('heading',{level:1})).toHaveText(surface==='storyboard'?'StoryboardCreator':'AgentOS');
    assert.ok(Number(await page.getByRole('heading',{level:1}).evaluate(el=>getComputedStyle(el).fontWeight))<=600);
    for(const width of [320,360,768,1440]){
      await page.setViewportSize({width,height:1000});
      if(surface==='storyboard'&&width<=768)assert.notEqual(await page.getByRole('button',{name:'Bearbeiten',exact:true}).evaluate(el=>getComputedStyle(el).boxShadow),'none');
      await checkLayout(page,`${surface}-${width}`);
      await capture(page,`${surface}-${width}`);
      results.push({surface,width,overflow:false,buttonsAtLeast44px:true});
    }
    await page.setViewportSize({width:360,height:1000});
    if(surface==='storyboard'){
      const title=page.getByLabel('Szenentitel (Pflichtfeld)',{exact:true});
      await title.fill('Unsere sichere Kreuzung');
      await page.getByLabel('Handlung',{exact:true}).fill('Die Klasse entwirft einen sicheren Übergang.');
      await page.getByLabel('Dialog',{exact:true}).fill('Hier können wir gemeinsam etwas ändern.');
      await page.getByRole('button',{name:'Vorschau',exact:true}).tap();
      await expect(page.getByRole('article',{name:'Vorschau der gewählten Szene'})).toContainText('Unsere sichere Kreuzung');
      await checkLayout(page,'storyboard-preview-mobile');
      await capture(page,'storyboard-preview-360');
      await page.getByRole('button',{name:'Bearbeiten',exact:true}).tap();
      await page.locator('#scene-2').tap();await page.locator('#scene-1').tap();
      await expect(title).toHaveValue('Unsere sichere Kreuzung');
      await page.getByRole('button',{name:'Aktuelle Szene nach unten verschieben'}).tap();
      await expect(page.locator('#scene-1')).toBeFocused();
      await page.getByRole('button',{name:'Szene hinzufügen',exact:true}).tap();
      await expect(title).toHaveValue('');await expect(title).toBeFocused();
      await page.getByRole('button',{name:'Beispiel exportieren',exact:true}).tap();
      await expect(page.getByRole('alert')).toHaveText('Gib dieser Szene einen Titel.');
      await expect(title).toBeFocused();
      await capture(page,'storyboard-validation-360');
      await title.fill('Der gemeinsame Weg');
      await page.getByLabel('Handlung',{exact:true}).fill('Wir zeigen unseren Vorschlag.');
      await page.getByText('Kamera und Zeit planen',{exact:true}).tap();
      await page.getByLabel('Einstellungsgröße',{exact:true}).selectOption('Nahaufnahme');
      const downloadPromise=page.waitForEvent('download');
      await page.getByRole('button',{name:'Beispiel exportieren',exact:true}).tap();
      const download=await downloadPromise;
      const data=JSON.parse(await readFile(await download.path(),'utf8'));
      assert.equal(data.schema,'haak3.storyboard-prototype/1');assert.equal(data.synthetic,true);assert.equal(data.scenes.length,4);
      assert.equal(data.scenes[1].title,'Unsere sichere Kreuzung');assert.equal(data.scenes[1].dialogue,'Hier können wir gemeinsam etwas ändern.');
      assert.equal(data.scenes[3].title,'Der gemeinsame Weg');assert.equal(data.scenes[3].shotSize,'Nahaufnahme');
      assert.deepEqual(data.scenes.map(scene=>scene.orderIndex),[0,1,2,3]);
      results.push({surface,flow:'edit-select-preview-reorder-add-invalid-export',downloadContent:true,touch:'emulated tap',focus:'add/validation/reorder'});
    }else{
      const scenario=page.getByLabel('Demo-Szenario',{exact:true});
      const search=page.getByRole('textbox',{name:'Prozesse suchen'});
      const filter=page.getByLabel('Laufstatus filtern',{exact:true});
      const details=page.getByRole('button',{name:'Quellen-Synchronisation: Details anzeigen',exact:true});
      await details.tap();
      await expect(page.locator('#process-detail').getByRole('heading',{name:'Quellen-Synchronisation',exact:true})).toBeFocused();
      await checkLayout(page,'agentos-detail-mobile');await capture(page,'agentos-detail-360');
      await page.getByRole('button',{name:'Prozessdetails schließen'}).tap();await expect(details).toBeFocused();
      await search.fill('unauffindbarer Prozess');await expect(page.getByRole('heading',{name:'Keine passenden Prozesse'})).toBeVisible();
      await page.getByRole('button',{name:'Filter zurücksetzen'}).tap();await expect(search).toBeFocused();
      await filter.selectOption('unknown');await expect(page.getByRole('button',{name:'Repository-Prüfung: Details anzeigen'})).toBeVisible();
      await expect(details).toHaveCount(0);await filter.selectOption('all');
      for(const state of ['stale','empty','error']){
        await scenario.selectOption(state);
        if(state==='stale')await expect(page.getByText('Quelle veraltet.',{exact:true})).toBeVisible();
        if(state==='empty')await expect(page.getByRole('heading',{name:'Noch keine Prozessdaten'})).toBeVisible();
        if(state==='error'){await expect(page.getByRole('alert')).toContainText('Verbindungsfehler simuliert.');await expect(details).toBeVisible();}
        for(const width of [320,768,1440]){await page.setViewportSize({width,height:1000});await checkLayout(page,`agentos-${state}-${width}`);}
        await page.setViewportSize({width:360,height:1000});await capture(page,`agentos-${state}-360`);
      }
      await scenario.selectOption('normal');await filter.selectOption('paused');
      await expect(page.getByRole('button',{name:'Hermes-State-Export: Details anzeigen'})).toBeVisible();
      results.push({surface,flow:'search-filter-details-close-stale-empty-error-paused',syntheticOnly:true,touch:'emulated tap',focus:'detail/close/reset'});
    }
    await page.setViewportSize({width:720,height:500});await checkLayout(page,`${surface}-200%-equivalent`);
    assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
    await page.reload();await page.keyboard.press('Tab');
    await expect(page.getByRole('link',{name:'Zum Arbeitsbereich',exact:true})).toBeFocused();await page.keyboard.press('Enter');
    await expect(page.locator('#workspace')).toBeFocused();await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle),'solid');
    assert.deepEqual(external,[],`${surface}: unexpected external requests`);assert.deepEqual(errors,[]);
    results.push({surface,keyboard:'skiplink+next-control',reflow:'720 CSS px',reducedMotion:true,externalRequests:external,pageErrors:errors});
    await context.close();
  }
  await writeFile(`${output}/results.json`,JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
  console.log(`PASS: ${results.length} transfer result records; ${output}`);
}finally{await browser.close();}
