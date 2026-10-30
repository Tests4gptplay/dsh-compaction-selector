import {readFile} from 'node:fs/promises'
import vm from 'node:vm'
export async function loadClient({ language='en', writable=true, status='ready', extraPasses=1, selection={provider:'',model:''}, catalog, mutate }={}) {
 let state=[], index=0, effects=[], snapshot={writable,status,value:{selection,extraPasses}}, dicts, slot, module
 const refs=[]; const listeners=new Map(); const operations=[]
 const React={createElement:(type,props,...children)=>({type,props:{...props,children:children.length===1?children[0]:children}}),
 useState(value){const i=index++;if(!(i in state))state[i]=typeof value==='function'?value():value;return [state[i],next=>{state[i]=typeof next==='function'?next(state[i]):next}]},
 useRef(value){const i=index++;if(!(i in state)){state[i]={current:value};refs.push(state[i])}return state[i]},
 useId(){index++;return 'test-picker'},
 useSyncExternalStore(sub,get){index++;return get()},
 useEffect(fn,deps){const i=index++;const old=state[i];if(!old||deps.some((x,k)=>x!==old.deps[k])){state[i]={deps,cleanup:old?.cleanup};effects.push(()=>{old?.cleanup?.();state[i].cleanup=fn()})}}
 }
 const form={getSnapshot:()=>snapshot,subscribe:()=>()=>{},async mutate(ops){operations.push(ops);const ok=mutate?await mutate(ops):true;if(ok){let value={...snapshot.value};for(const op of ops)value[op.path[0]]=op.value;snapshot={...snapshot,value}}return ok}}
 const ctx={
  effect:fn=>fn(),
  locale:{register(ns,value){dicts=value},bind:()=>key=>dicts[language][key]??key},
  configForms:{get:()=>form},
  remote:{session:{modelCatalog:catalog??(async()=>({ok:true,value:{groups:[{id:'synthetic',name:'Synthetic Provider',models:[{id:'model-a',name:'Alpha model'},{id:'model-b',name:'Beta model'}]}]}}))}},
  slots:{inject:(_,fn)=>fn(),register(options,component){slot={options,component}}}
 }
 const document={addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:name=>listeners.delete(name)}
 vm.runInNewContext(await readFile(new URL('../client.js',import.meta.url),'utf8'),{window:{__ModuleLoader__:{load({factory}){module=factory(id=>{if(id==='react')return React;throw Error(id)})}}},document,console})
 module.apply(ctx)
 function expand(node){if(Array.isArray(node))return node.map(expand);if(!node||typeof node!=='object')return node;if(typeof node.type==='function')return expand(node.type(node.props));return {...node,props:{...node.props,children:expand(node.props.children)}}}
 function render(){index=0;const tree=expand(slot.component(slot.options.inject()));for(const fn of effects.splice(0))fn();return tree}
 return {render,operations,listeners,refs,form,slot,language(value){language=value},snapshot:()=>snapshot,setSnapshot(value){snapshot=value},dispose(){for(const s of state)s?.cleanup?.()}}
}
export function flatten(tree){if(Array.isArray(tree))return tree.flatMap(flatten);return tree&&typeof tree==='object'?[tree,...flatten(tree.props?.children)]:[]}
export const text = node => node?.type === 'style' ? '' : typeof node==='object' ? (Array.isArray(node)?node.map(text).join(''):text(node?.props?.children)) : (node??'')
export const node = (page,cls)=>flatten(page.render()).find(n=>n.props?.className===cls)
export const tick=()=>new Promise(resolve=>setImmediate(resolve))
