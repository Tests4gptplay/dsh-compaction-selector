import test from 'node:test'
import assert from 'node:assert/strict'
import {loadClient,node,flatten,text,tick} from './client-harness.mjs'
const failure={id:'synthetic-failed',name:'Unavailable fixture',message:'QA_RAW_PROVIDER_ERROR_DO_NOT_DISPLAY'}
const group={id:'synthetic-ready',name:'Healthy fixture',models:[{id:'healthy-a',name:'Healthy model A'}]}
async function open(config){const p=await loadClient(config);p.render();await tick();node(p,'dcs-trigger').props.onClick();p.render();await tick();return p}
function retry(p){return flatten(p.render()).find(n=>n.type==='button'&&(/Could not load models|模型列表加载失败/.test(text(n))))}

test('official ok + failed provider result shows localized retry rather than empty search',async()=>{
 for(const language of ['en','zh']){
  const p=await open({language,catalog:async()=>({ok:true,value:{groups:[],failures:[failure]}})})
  assert.ok(retry(p));assert.doesNotMatch(text(p.render()),/No matching models|没有匹配的模型|QA_RAW_PROVIDER_ERROR_DO_NOT_DISPLAY/)
  assert.equal(flatten(p.render()).filter(n=>n.props?.role==='option').length,1,'Auto remains available without faking a model')
 }
})
test('partial provider failures retain healthy selectable groups and support successful retry',async()=>{
 let healthy=false;const p=await open({catalog:async()=>({ok:true,value:{groups:[group],failures:healthy?[]:[failure]}})})
 assert.ok(retry(p));assert.match(text(p.render()),/Healthy model A/);assert.doesNotMatch(text(p.render()),/QA_RAW_PROVIDER_ERROR_DO_NOT_DISPLAY/)
 const model=flatten(p.render()).find(n=>n.props?.role==='option'&&text(n).includes('Healthy model A'))
 await model.props.onClick();assert.equal(p.snapshot().value.selection.provider,'synthetic-ready')
 node(p,'dcs-trigger').props.onClick();p.render();await tick();healthy=true;await retry(p).props.onClick()
 assert.equal(retry(p),undefined);assert.match(text(p.render()),/Healthy model A/)
 assert.equal(p.snapshot().value.selection.model,'healthy-a')
})
test('full provider failure retry restores catalog without reopening the page',async()=>{
 let healthy=false;const p=await open({catalog:async()=>({ok:true,value:{groups:healthy?[group]:[],failures:healthy?[]:[failure]}})})
 healthy=true;await retry(p).props.onClick();assert.equal(retry(p),undefined);assert.match(text(p.render()),/Healthy model A/)
})
test('late failed catalog cannot overwrite newer success and late success cannot hide newer failure',async()=>{
 for(const newerFailure of [false,true]){
  const pending=[];const p=await loadClient({catalog:()=>new Promise(resolve=>pending.push(resolve))})
  p.render();node(p,'dcs-trigger').props.onClick();p.render()
  const bad={ok:true,value:{groups:[],failures:[failure]}},good={ok:true,value:{groups:[group],failures:[]}}
  pending[1](newerFailure?bad:good);await tick();p.render();pending[0](newerFailure?good:bad);await tick()
  assert.equal(Boolean(retry(p)),newerFailure)
  assert.equal(text(p.render()).includes('Healthy model A'),!newerFailure)
 }
})
