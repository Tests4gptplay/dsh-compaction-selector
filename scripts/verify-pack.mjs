import assert from 'node:assert/strict'
import {spawnSync} from 'node:child_process'
import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
const root=fileURLToPath(new URL('..',import.meta.url))
const manifest=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'))
const expected=['CHANGELOG.md','LICENSE','README.en.md','README.md','client.js','cordis.patch.yml','engine.js','icon.svg','index.js','locale/en.json','locale/zh.json','package.json'].sort()
const proc=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['pack','--dry-run','--ignore-scripts','--json'],{cwd:root,encoding:'utf8',shell:process.platform==='win32'})
if(proc.error)throw proc.error
assert.equal(proc.status,0,proc.stderr)
const metadata=JSON.parse(proc.stdout)[0]
assert.deepEqual(metadata.files.map(f=>f.path).sort(),expected)
assert.equal(metadata.version,manifest.version)
assert.equal(manifest.engines,undefined)
for(const field of ['dependencies','optionalDependencies'])assert.equal(manifest[field]?.[manifest.name],undefined)
const runtime=await readFile(new URL('../client.js',import.meta.url),'utf8')
assert.doesNotMatch(runtime,/__test|MockDot|mockLabel|dotsDiagnostic/)
for(const language of ['en','zh']){
 const locale=JSON.parse(await readFile(new URL(`../locale/${language}.json`,import.meta.url),'utf8'))
 assert.ok(locale.meta.title);assert.ok(locale.meta.description)
}
console.log(`PASS: ${metadata.filename}; ${expected.length} production-only files, no version gate or self-dependency`)
