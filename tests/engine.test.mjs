import test from 'node:test'
import assert from 'node:assert/strict'
import { Context } from '@deepseek-ai/cordis'
import Engine from '../engine.js'
import Selector from '../index.js'

function create() {
 const ctx=new Context()
 let selection={provider:'',model:''},extraPasses=1
 const service=new Selector(ctx,{selection:{get:()=>selection},extraPasses:{get:()=>extraPasses}})
 const calls=[]
 ctx.provide('llm',{async *stream(options){calls.push(options);yield {type:'text-delta',index:0,text:'Synthetic summary only'};yield {type:'finish',reason:{kind:'stop'}}}})
 const engine=new Engine(ctx,{auto:false})
 return {ctx,service,engine,calls,set(target,passes){selection=target;extraPasses=passes}}
}
const agent=(route={provider:'synthetic-current',model:'model-a'}, fallback={provider:'synthetic-fallback',model:'model-b'})=>({options:fallback,session:{id:'synthetic-session',requestHeader:()=>route&&({config:route}),toolHistory:()=>[]}})
const input={messages:[{role:'user',content:[{type:'text',text:'Synthetic test history'}]}]}

test('actual official engine Auto uses only the synthetic current routed model',async()=>{
 const c=create(); await c.engine.summarize(input,agent())
 assert.equal(c.calls.length,1);assert.equal(c.calls[0].provider,'synthetic-current');assert.equal(c.calls[0].model,'model-a')
 assert.equal(c.calls[0].purpose,'compaction')
 assert.deepEqual(c.calls[0].messages[0],input.messages[0])
})
test('explicit selection is live and Auto restores official synthetic fallback',async()=>{
 const c=create();c.set({provider:'synthetic-explicit',model:'chosen'},3)
 await c.engine.summarize(input,agent());assert.equal(c.calls[0].provider,'synthetic-explicit');assert.equal(c.calls[0].model,'chosen')
 assert.equal(c.engine.config.compactionRetries,3)
 c.set({provider:'',model:''},0);await c.engine.summarize(input,agent(undefined))
 assert.equal(c.calls[1].provider,'synthetic-current')
 await c.engine.summarize(input,agent(null));assert.equal(c.calls[2].provider,'synthetic-fallback');assert.equal(c.engine.config.compactionRetries,0)
})
test('Auto with no model route fails closed and never emits a provider call',async()=>{
 const c=create();await assert.rejects(c.engine.summarize(input,agent(null,{})),/no provider\/model available/);assert.equal(c.calls.length,0)
})
test('selector validates retry values without changing the provider target',()=>{
 const c=create()
 for(const [value,expected] of [[0,0],[1,1],[1000001,1000001],[-1,1],[1.5,1],[NaN,1],[Infinity,1],[Number.MAX_SAFE_INTEGER+1,1]]){
  c.set({provider:'synthetic',model:'model'},value);assert.equal(c.service.current().compactionRetries,expected);assert.equal(c.engine.config.compactionRetries,expected)
 }
 c.set(null,1);assert.deepEqual(c.service.current(),{summarizationProvider:'',summarizationModel:'',compactionRetries:1})
})


test('official pressure-loop uses one initial pass plus the live additional count (synthetic region fixture)',async()=>{
 for(const retries of [0,1,3]){
  const c=create();c.set({provider:'synthetic',model:'summary'},retries)
  c.ctx.llm.resolveModelInfo=async()=>({context:{contextWindow:100000},defaultMaxTokens:0})
  c.ctx.provide('tokenMeter',{measure:()=>({totalTokens:90000,nodes:[{seq:0,tokens:40000},{seq:1,tokens:40000},{seq:2,tokens:10000}]})})
  const a=agent();a.session.surface={nodes:[0,1,2],replaceGeneration:0};a.session.seq=3
  a.session.eventAt=seq=>({seq,type:'user/message',data:{message:{role:'user',content:[{type:'text',text:'fixture'}]}}})
  let count=0;c.engine.compactRegion=async()=>{count++;return {synthetic:true}}
  await assert.rejects(c.engine.compactIfNeeded(a,'pressure',new AbortController().signal),new RegExp(`after ${retries+1} compaction attempts`))
  assert.equal(count,retries+1)
  assert.equal(c.calls.length,0,'loop test substitutes only the storage transaction; no provider request is made')
 }
})
