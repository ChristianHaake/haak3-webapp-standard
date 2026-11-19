import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const output=fileURLToPath(new URL('../test-results/',import.meta.url));
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
try{
  for(const strategy of ['guided','direct','canvas']){
    const context=await browser.newContext({locale:'de-DE',acceptDownloads:true,reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    for(const width of [320,360,768,1440]){
      await page.setViewportSize({width,height:1000});
      await page.goto(`http://127.0.0.1:4310/?strategy=${strategy}`);
      await page.getByRole('heading',{name:'SocialMediaCreator',exact:true}).waitFor();
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${strategy}/${width}: page overflow`);
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.screenshot({path:`${output}/${strategy}-${width}.png`,fullPage:true});
      const small=await page.locator('button:visible').evaluateAll(elements=>elements.filter(e=>e.getBoundingClientRect().height<43.5).map(e=>e.textContent));
      assert.deepEqual(small,[],`${strategy}/${width}: button under 44px`);
      results.push({strategy,width,overflow:false,buttonsAtLeast44px:true});
    }
    await page.setViewportSize({width:360,height:900});
    await page.reload();
    await page.getByRole('button',{name:'Beitrag anlegen',exact:true}).click();
    const text=page.getByLabel('Dein Beitrag');
    await text.waitFor({state:'visible'});
    // New drafts must fail validation without producing an empty download.
    if(strategy==='guided')await page.getByRole('button',{name:'Weiter: Gestaltung'}).click();
    if(strategy==='direct'){await page.getByRole('button',{name:'Ergebnis ansehen',exact:true}).click();await page.getByRole('button',{name:'Beispiel-JSON herunterladen'}).click();}
    if(strategy==='canvas')await page.getByRole('button',{name:'Beispiel-JSON herunterladen'}).click();
    await page.getByText('Schreibe zuerst einen Beitrag.',{exact:true}).waitFor();
    assert.equal(await text.getAttribute('aria-invalid'),'true');
    await expect(text).toBeFocused();
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(resolve)));
    await page.screenshot({path:`${output}/${strategy}-validation-360.png`,fullPage:true});
    await text.fill('Ein sicherer Schulweg für alle. #Schulprojekt');
    await page.getByLabel('Profilname').fill('Testklasse');
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:`${output}/${strategy}-editing-360.png`,fullPage:true});
    if(strategy==='guided'){
      await page.getByRole('button',{name:'Weiter: Gestaltung'}).click();
      await page.getByRole('button',{name:'Papier',exact:true}).click();
      await page.getByRole('button',{name:'Weiter: Ergebnis'}).click();
    }else if(strategy==='direct'){
      await page.getByText('Gestaltung anpassen',{exact:true}).click();
      await page.getByRole('button',{name:'Papier',exact:true}).click();
      await page.getByRole('button',{name:'Ergebnis ansehen',exact:true}).click();
    }else{
      await page.getByText('Gestaltung anpassen',{exact:true}).click();
      await page.getByRole('button',{name:'Papier',exact:true}).click();
      await page.getByRole('button',{name:'Bearbeitung abschließen'}).click();
      await expect(page.getByRole('button',{name:'Beitrag bearbeiten',exact:true})).toBeFocused();
    }
    assert.ok(await page.getByRole('article',{name:'Beitragsvorschau'}).innerText().then(t=>t.includes('Ein sicherer Schulweg')));
    for(const width of [320,360,768,1440]){
      await page.setViewportSize({width,height:1000});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${strategy}/${width}: final overflow`);
      if(strategy==='guided'&&width===768)assert.ok((await page.getByRole('article').boundingBox()).width>=400,'final tablet preview should use available width');
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.screenshot({path:`${output}/${strategy}-final-${width}.png`,fullPage:true});
    }
    await page.setViewportSize({width:360,height:900});
    const downloadPromise=page.waitForEvent('download');
    await page.getByRole('button',{name:'Beispiel-JSON herunterladen'}).click();
    const download=await downloadPromise;
    const data=JSON.parse(await readFile(await download.path(),'utf8'));
    assert.equal(data.schema,'haak3.ui-prototype/1');
    assert.equal(data.synthetic,true);
    assert.equal(data.post.author,'Testklasse');
    assert.equal(data.post.theme,'paper');
    assert.equal(data.post.text,'Ein sicherer Schulweg für alle. #Schulprojekt');
    await page.getByRole('button',{name:'Beispiel zurücksetzen'}).click();
    await page.getByRole('status').getByText('Ausgangsbeispiel wiederhergestellt.').waitFor();
    await page.reload();
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement?.textContent),'Zum Arbeitsbereich');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(()=>document.activeElement?.id),'workspace');
    await page.keyboard.press('Tab');
    const focus=await page.evaluate(()=>({tag:document.activeElement?.tagName,outline:getComputedStyle(document.activeElement).outlineStyle}));
    assert.equal(focus.tag,'BUTTON');assert.equal(focus.outline,'solid');
    // At 200% browser zoom a 1440px viewport has 720 CSS pixels of layout space.
    await page.setViewportSize({width:720,height:500});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
    assert.deepEqual(errors,[]);
    results.push({strategy,flow:'create-invalid-edit-style-preview-export-reset',download:'verified JSON content',keyboard:'skip link and next control',zoom:'200% equivalent reflow',reducedMotion:true,pageErrors:errors});
    await context.close();
  }
  await writeFile(`${output}/results.json`,JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
  console.log(`PASS: ${results.length} checks; screenshots and report: ${output}`);
}finally{await browser.close();}
