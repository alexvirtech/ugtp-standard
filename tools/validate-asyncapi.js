import { Parser } from '@asyncapi/parser'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const ASYNCAPI_PATH = join(ROOT, 'schemas', 'asyncapi', 'ugtp-events-v1.yaml')

async function main() {
  console.log('Validating AsyncAPI specification...')
  const parser = new Parser()
  const content = await readFile(ASYNCAPI_PATH, 'utf-8')

  const { document, diagnostics } = await parser.parse(content, {
    source: ASYNCAPI_PATH,
  })

  const errors = diagnostics.filter(d => d.severity === 0)
  const warnings = diagnostics.filter(d => d.severity === 1)

  if (errors.length > 0) {
    console.error('  ✗ AsyncAPI validation errors:')
    for (const e of errors) {
      console.error(`    [${e.path?.join('/') || ''}] ${e.message}`)
    }
    process.exit(1)
  }

  if (warnings.length > 0) {
    for (const w of warnings) {
      console.warn(`  ⚠ ${w.message}`)
    }
  }

  if (document) {
    const channels = Object.keys(document.channels() || {})
    console.log(`  ✓ AsyncAPI valid — ${channels.length} channels`)
  } else {
    console.log('  ✓ AsyncAPI parsed (no document object)')
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
