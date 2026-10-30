import test from 'node:test'
import assert from 'node:assert/strict'
import {loadClient,node,flatten,text,tick} from './client-harness.mjs'
const key=(name,extra={})=>({key:name,preventDefault(){},stopPropagation(){},...extra})
const options=p=>flatten(p.render()).filter(n=>n.props?.role==='option')
async function start(config){const p=await loadClient(config);p.render();await tick();return p}
async function open(p){node(p,'dcs-trigger').props.onClick();p.render();await tick();return p}

test('English and Chinese initial UI, metadata label and readonly status',async()=>{
 for(const [language,title,readonly] of [['en','Compaction model selection','read-only'],['zh','压缩用模型选择','只读']]){
  const p=await start({language,writable:false});assert.match(text(p.render()),new RegExp(title));assert.equal(p.slot.options.label(),title)
  assert.match(text(p.render()),new RegExp(readonly));assert.equal(node(p,'dcs-count').props.disabled,true);assert.equal(node(p,'dcs-trigger').props.disabled,true)
 }
})
test('unavailable settings prevent writes; switching to ready restores editing',async()=>{
 const p=await start({status:'unavailable'});assert.match(text(p.render()),/not loaded yet/)
 await node(p,'dcs-count').props.onBlur();assert.equal(p.operations.length,0)
 p.setSnapshot({status:'ready',writable:true,value:{selection:{provider:'',model:''},extraPasses:1}})
 assert.equal(node(p,'dcs-count').props.disabled,false)
})
test('picker catalog, provider grouping, explicit choice and Auto persist the original pairs',async()=>{
 const p=await open(await start());assert.equal(options(p).length,3)
 await options(p)[1].props.onClick();assert.deepEqual({...p.snapshot().value.selection},{provider:'synthetic',model:'model-a'})
 assert.equal(node(p,'dcs-trigger').props['aria-expanded'],false);assert.match(text(p.render()),/Alpha model/)
 await open(p);await options(p)[0].props.onClick();assert.equal(p.snapshot().value.selection.provider,'');assert.equal(p.snapshot().value.selection.model,'')
})
test('search, no results, localized clear and keyboard selection',async()=>{
 const p=await open(await start());node(p,'dcs-search').props.onChange({target:{value:'beta'}})
 assert.equal(options(p).length,2);assert.match(text(options(p)[1]),/Beta model/)
 node(p,'dcs-menu').props.onKeyDown(key('ArrowDown'));node(p,'dcs-menu').props.onKeyDown(key('Enter'));await tick()
 assert.equal(p.snapshot().value.selection.model,'model-b')
 await open(p);node(p,'dcs-search').props.onChange({target:{value:'nothingmatches'}})
 assert.match(text(p.render()),/No matching models/);assert.equal(options(p).length,1)
 p.language('zh');assert.equal(node(p,'dcs-clear').props['aria-label'],'清除搜索');node(p,'dcs-clear').props.onClick();assert.equal(options(p).length,3)
})
test('Escape, outside click and reverse Tab close the picker without save',async()=>{
 const p=await open(await start());node(p,'dcs-menu').props.onKeyDown(key('Escape'));assert.equal(node(p,'dcs-trigger').props['aria-expanded'],false)
 await open(p);p.listeners.get('pointerdown')({target:{}});assert.equal(node(p,'dcs-trigger').props['aria-expanded'],false)
 await open(p);node(p,'dcs-menu').props.onKeyDown(key('Tab',{shiftKey:true}));assert.equal(node(p,'dcs-trigger').props['aria-expanded'],false)
 assert.equal(p.operations.length,0)
})
test('catalog failure can be retried and then used',async()=>{
 let calls=0;const p=await open(await start({catalog:async()=>++calls<3?{ok:false}:{ok:true,value:{groups:[{id:'synthetic',name:'Synthetic',models:[{id:'ok',name:'Recovered model'}]}]}}}))
 const retry=flatten(p.render()).find(n=>n.type==='button'&&text(n).includes('Could not load models'))
 assert.ok(retry);await retry.props.onClick();assert.match(text(p.render()),/Recovered model/);assert.equal(options(p).length,2)
})
test('newest catalog result wins and unmounted stale completion is ignored',async()=>{
 const resolvers=[];const p=await start({catalog:()=>new Promise(r=>resolvers.push(r))})
 await open(p);resolvers[1]({ok:true,value:{groups:[{id:'synthetic',name:'New',models:[{id:'new',name:'New model'}]}]}});await tick()
 resolvers[0]({ok:true,value:{groups:[{id:'synthetic',name:'Old',models:[{id:'old',name:'Old model'}]}]}});await tick()
 assert.match(text(p.render()),/New model/);assert.doesNotMatch(text(p.render()),/Old model/)
 node(p,'dcs-trigger').props.onClick();await open(p);p.dispose()
 resolvers[2]({ok:true,value:{groups:[{id:'synthetic',name:'Late',models:[{id:'late',name:'Late model'}]}]}});await tick();assert.doesNotMatch(text(p.render()),/Late model/)
})
test('counter clear, edit undo, zero, Enter, blur no-op and step controls preserve numeric intent',async()=>{
 const p=await start({extraPasses:3})
 for(const value of ['','-','1.5','-1']){node(p,'dcs-count').props.onChange({target:{value}});assert.equal(node(p,'dcs-count').props.value,value);await node(p,'dcs-count').props.onBlur();assert.equal(p.operations.length,0)}
 node(p,'dcs-count').props.onChange({target:{value:'3'}});await node(p,'dcs-count').props.onBlur();assert.equal(p.operations.length,0)
 node(p,'dcs-count').props.onChange({target:{value:'0'}});node(p,'dcs-count').props.onKeyDown(key('Enter'));await tick();assert.equal(p.snapshot().value.extraPasses,0)
 assert.equal(flatten(p.render()).find(n=>n.props?.['aria-label']==='Decrease').props.disabled,true)
 await flatten(p.render()).find(n=>n.props?.['aria-label']==='Increase').props.onClick();assert.equal(p.snapshot().value.extraPasses,1)
 await node(p,'dcs-count').props.onBlur();assert.equal(p.operations.length,2)
})
test('failed and thrown saves keep editing usable and retry succeeds',async()=>{
 for(const throws of [false,true]){
  let calls=0;const p=await start({mutate:async()=>{if(++calls===1){if(throws)throw Error('synthetic failure');return false}return true}})
  node(p,'dcs-count').props.onChange({target:{value:'2'}});await node(p,'dcs-count').props.onBlur();assert.match(text(p.render()),/Save failed/);assert.equal(node(p,'dcs-count').props.disabled,false)
  p.language('zh');assert.match(text(p.render()),/保存失败/);await node(p,'dcs-count').props.onBlur();assert.equal(p.snapshot().value.extraPasses,2);assert.match(text(p.render()),/已保存/)
 }
})
test('pending save blocks writes until settled; maximum safe integer does not overflow',async()=>{
 let resolve;const p=await start({mutate:()=>new Promise(r=>resolve=r)})
 const promise=flatten(p.render()).find(n=>n.props?.['aria-label']==='Increase').props.onClick();assert.equal(node(p,'dcs-trigger').props.disabled,true);assert.equal(node(p,'dcs-count').props.disabled,true)
 resolve(true);await promise;assert.equal(node(p,'dcs-count').props.disabled,false)
 const max=await start({extraPasses:Number.MAX_SAFE_INTEGER});await flatten(max.render()).find(n=>n.props?.['aria-label']==='Increase').props.onClick();assert.equal(max.operations.length,0);assert.match(text(max.render()),/integer/)
})
