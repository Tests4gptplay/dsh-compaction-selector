import test from 'node:test'
import assert from 'node:assert/strict'
import {loadClient,node,flatten,text,tick} from './client-harness.mjs'

test('invalid counts are rejected instead of silently changing their meaning',async()=>{
 for(const value of ['-1','1.5','1e3','','9007199254740992']){
  const page=await loadClient()
  page.render();await tick()
  node(page,'dcs-count').props.onChange({target:{value}})
  await node(page,'dcs-count').props.onBlur()
  assert.equal(page.operations.length,0,`must not save ${value}`)
  assert.match(text(page.render()),/Enter an integer of 0 or more/)
 }
})

test('decreasing a large valid count decreases by exactly one',async()=>{
 const page=await loadClient({extraPasses:1000001});page.render();await tick()
 const decrement=flatten(page.render()).find(n=>n.props?.['aria-label']==='Decrease')
 await decrement.props.onClick()
 assert.equal(page.snapshot().value.extraPasses,1000000)
})

test('save status translates live when locale changes',async()=>{
 const page=await loadClient();page.render();await tick()
 node(page,'dcs-count').props.onChange({target:{value:'2'}})
 await node(page,'dcs-count').props.onBlur()
 assert.match(text(page.render()),/Saved\. Applies/)
 page.language('zh')
 assert.match(text(page.render()),/已保存，下次压缩时生效/)
})

test('rapid repeated saves issue one mutation',async()=>{
 let resolve;const page=await loadClient({mutate:()=>new Promise(r=>{resolve=r})});page.render();await tick()
 const increase=flatten(page.render()).find(n=>n.props?.['aria-label']==='Increase')
 const first=increase.props.onClick(); const second=increase.props.onClick()
 assert.equal(page.operations.length,1)
 resolve(true);await Promise.all([first,second])
})
