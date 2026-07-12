import { describe, it, expect } from 'vitest'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const SCHEMAS_DIR = join(ROOT, 'schemas', 'json')

async function loadAllSchemas(subdir: string) {
  const dir = join(SCHEMAS_DIR, subdir)
  const files = await readdir(dir)
  const schemas: Array<{ file: string; content: Record<string, unknown> }> = []
  for (const f of files.filter(f => f.endsWith('.json'))) {
    const content = JSON.parse(await readFile(join(dir, f), 'utf-8'))
    schemas.push({ file: f, content })
  }
  return schemas
}

describe('schema integrity', () => {
  it('all object schemas have $schema and $id', async () => {
    const schemas = await loadAllSchemas('objects')
    for (const { file, content } of schemas) {
      expect(content.$schema, `${file} missing $schema`).toBe('https://json-schema.org/draft/2020-12/schema')
      expect(content.$id, `${file} missing $id`).toBeTypeOf('string')
    }
  })

  it('all message schemas have $schema and $id', async () => {
    const schemas = await loadAllSchemas('messages')
    for (const { file, content } of schemas) {
      expect(content.$schema, `${file} missing $schema`).toBe('https://json-schema.org/draft/2020-12/schema')
      expect(content.$id, `${file} missing $id`).toBeTypeOf('string')
    }
  })

  it('all event schemas have $schema and $id', async () => {
    const schemas = await loadAllSchemas('events')
    for (const { file, content } of schemas) {
      expect(content.$schema, `${file} missing $schema`).toBe('https://json-schema.org/draft/2020-12/schema')
      expect(content.$id, `${file} missing $id`).toBeTypeOf('string')
    }
  })

  it('no duplicate $id values', async () => {
    const allSchemas = [
      ...await loadAllSchemas('objects'),
      ...await loadAllSchemas('messages'),
      ...await loadAllSchemas('events'),
    ]
    const ids = allSchemas.map(s => s.content.$id as string)
    const unique = new Set(ids)
    expect(ids.length).toBe(unique.size)
  })

  it('types.json defines all 19 canonical types', async () => {
    const content = JSON.parse(await readFile(join(SCHEMAS_DIR, 'types.json'), 'utf-8'))
    const defs = Object.keys(content.$defs || {})
    expect(defs).toContain('ProtocolVersion')
    expect(defs).toContain('SchemaVersion')
    expect(defs).toContain('UciId')
    expect(defs).toContain('UcaId')
    expect(defs).toContain('AccountId')
    expect(defs).toContain('ChainId')
    expect(defs).toContain('AssetId')
    expect(defs).toContain('IntentId')
    expect(defs).toContain('PlanId')
    expect(defs).toContain('StepId')
    expect(defs).toContain('ExecutionId')
    expect(defs).toContain('ReceiptId')
    expect(defs).toContain('CorrelationId')
    expect(defs).toContain('Timestamp')
    expect(defs).toContain('Amount')
    expect(defs).toContain('Nonce')
    expect(defs).toContain('Hash')
    expect(defs).toContain('Signature')
    expect(defs).toContain('ErrorCode')
    expect(defs.length).toBe(19)
  })
})
