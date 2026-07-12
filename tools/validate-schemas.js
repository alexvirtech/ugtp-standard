import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const SCHEMAS_DIR = join(ROOT, 'schemas', 'json')

async function loadJsonFiles(dir) {
  let files
  try {
    files = await readdir(dir)
  } catch {
    return []
  }
  const results = []
  for (const f of files.filter(f => f.endsWith('.json'))) {
    const content = await readFile(join(dir, f), 'utf-8')
    results.push({ file: f, path: join(dir, f), content: JSON.parse(content) })
  }
  return results
}

async function main() {
  const ajv = new Ajv2020({ strict: false, allErrors: true, validateSchema: false })
  addFormats(ajv)

  const dirs = ['', 'objects', 'messages', 'events']
  const allSchemas = []

  for (const sub of dirs) {
    const dir = sub ? join(SCHEMAS_DIR, sub) : SCHEMAS_DIR
    const files = await loadJsonFiles(dir)
    for (const entry of files) {
      entry.sub = sub
      allSchemas.push(entry)
    }
  }

  for (const { content } of allSchemas) {
    if (content.$id) {
      try {
        ajv.addSchema(content)
      } catch {
        // ignore duplicate adds
      }
    }
  }

  let errors = 0

  for (const { file, content, sub } of allSchemas) {
    const label = sub ? `${sub}/${file}` : file
    try {
      if (content.$id) {
        ajv.getSchema(content.$id)
      } else {
        ajv.compile(content)
      }
      console.log(`  ✓ ${label}`)
    } catch (err) {
      console.error(`  ✗ ${label}: ${err.message}`)
      errors++
    }
  }

  if (errors > 0) {
    console.error(`\n${errors} schema(s) failed validation`)
    process.exit(1)
  }

  console.log('\nAll schemas valid.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
