import { describe, it, expect } from 'vitest'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const FIXTURES_DIR = join(ROOT, 'fixtures')
const SCHEMAS_DIR = join(ROOT, 'schemas', 'json')

async function loadJson(path: string) {
  return JSON.parse(await readFile(path, 'utf-8'))
}

async function createAjvWithSchemas() {
  const ajv = new Ajv2020({ strict: false, allErrors: true, validateSchema: false })
  addFormats(ajv)

  const typesSchema = await loadJson(join(SCHEMAS_DIR, 'types.json'))
  ajv.addSchema(typesSchema)

  for (const subdir of ['objects', 'messages', 'events']) {
    const dir = join(SCHEMAS_DIR, subdir)
    const files = await readdir(dir)
    for (const f of files.filter(f => f.endsWith('.json'))) {
      const schema = await loadJson(join(dir, f))
      ajv.addSchema(schema)
    }
  }

  return ajv
}

describe('valid fixtures', () => {
  it('uci.json validates against uci schema', async () => {
    const ajv = await createAjvWithSchemas()
    const fixture = await loadJson(join(FIXTURES_DIR, 'valid', 'uci.json'))
    const validate = ajv.getSchema('https://ugtp.dev/schemas/v0.1/objects/uci.json')!
    expect(validate(fixture)).toBe(true)
  })

  it('protocol-error.json validates against protocol-error schema', async () => {
    const ajv = await createAjvWithSchemas()
    const fixture = await loadJson(join(FIXTURES_DIR, 'valid', 'protocol-error.json'))
    const validate = ajv.getSchema('https://ugtp.dev/schemas/v0.1/objects/protocol-error.json')!
    expect(validate(fixture)).toBe(true)
  })

  it('event-execution-completed.json validates against event schema', async () => {
    const ajv = await createAjvWithSchemas()
    const fixture = await loadJson(join(FIXTURES_DIR, 'valid', 'event-execution-completed.json'))
    const validate = ajv.getSchema('https://ugtp.dev/schemas/v0.1/events/execution-completed.json')!
    expect(validate(fixture)).toBe(true)
  })
})

describe('invalid fixtures', () => {
  it('uci-bad-id.json fails validation', async () => {
    const ajv = await createAjvWithSchemas()
    const fixture = await loadJson(join(FIXTURES_DIR, 'invalid', 'uci-bad-id.json'))
    const validate = ajv.getSchema('https://ugtp.dev/schemas/v0.1/objects/uci.json')!
    expect(validate(fixture)).toBe(false)
  })

  it('intent-missing-fields.json fails validation', async () => {
    const ajv = await createAjvWithSchemas()
    const fixture = await loadJson(join(FIXTURES_DIR, 'invalid', 'intent-missing-fields.json'))
    const validate = ajv.getSchema('https://ugtp.dev/schemas/v0.1/objects/intent.json')!
    expect(validate(fixture)).toBe(false)
  })

  it('error-unknown-code.json fails validation', async () => {
    const ajv = await createAjvWithSchemas()
    const fixture = await loadJson(join(FIXTURES_DIR, 'invalid', 'error-unknown-code.json'))
    const validate = ajv.getSchema('https://ugtp.dev/schemas/v0.1/objects/protocol-error.json')!
    expect(validate(fixture)).toBe(false)
  })
})
