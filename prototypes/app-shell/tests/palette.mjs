import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const css=await readFile(new URL('../src/tokens.css',import.meta.url),'utf8');
const tokens=Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[a-f0-9]{3,6})(?=;)/gi)].map(m=>[m[1],m[2]]));
function luminance(hex){
  const value=hex.slice(1);
  const full=value.length===3?[...value].map(x=>x+x).join(''):value;
  const rgb=full.match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
}
const pairs=[
  ['surface','primary',4.5],['surface','primary-hover',4.5],['on-brand','brand',4.5],
  ['primary','app-bg',4.5],['primary','primary-soft',4.5],['text-muted','surface-subtle',4.5],
  ['text','surface',4.5],['control-border','surface',3],['focus','app-bg',3],
  ['danger','danger-soft',4.5],['success','success-soft',4.5]
];
for(const [fg,bg,minimum] of pairs){
  assert.ok(tokens[fg]&&tokens[bg],`Missing color token: ${fg}/${bg}`);
  const l=[luminance(tokens[fg]),luminance(tokens[bg])].sort((a,b)=>b-a);
  const ratio=(l[0]+.05)/(l[1]+.05);
  assert.ok(ratio>=minimum,`${fg}/${bg}: ${ratio.toFixed(2)} < ${minimum}`);
  console.log(`${fg}/${bg}: ${ratio.toFixed(2)}:1`);
}
console.log('PASS: eleven palette contrast pairs');
