import { describe, it, expect } from 'vitest'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import {
  TYPE_METADATA,
  OBJECT_METADATA,
  MESSAGE_METADATA,
  EVENT_METADATA,
  CONSTANT_METADATA,
  VALIDATION_METADATA,
  STABILITY_RULES,
  getDefinitionMetadata,
  getAllMetadata,
} from '../src/architecture.js'
import type { ArchitectureMetadata } from '../src/architecture.js'
import { STABILITY_LEVELS } from '../src/constants.js'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const SCHEMAS_DIR = join(ROOT, 'schemas', 'json')

function validateMetadata(name: string, meta: ArchitectureMetadata) {
  expect(meta.architectureSource, `${name} missing source`).toBeTruthy()
  expect(['FROZEN', 'CANDIDATE', 'EXPERIMENTAL'], `${name} bad classification`).toContain(meta.architectureClassification)
  expect(['FROZEN', 'CANDIDATE_LOW', 'CANDIDATE_MEDIUM', 'EXPERIMENTAL'], `${name} bad stability`).toContain(meta.stabilityLevel)
  expect(['none', 'low', 'medium', 'high'], `${name} bad risk`).toContain(meta.breakingChangeRisk)
  expect(Array.isArray(meta.relatedADR), `${name} relatedADR not array`).toBe(true)
  expect(Array.isArray(meta.relatedCapability), `${name} relatedCapability not array`).toBe(true)
  expect(Array.isArray(meta.relatedProfile), `${name} relatedProfile not array`).toBe(true)
  expect(Array.isArray(meta.relatedFeature), `${name} relatedFeature not array`).toBe(true)
}

describe('architecture metadata', () => {
  it('all type metadata entries are valid', () => {
    expect(Object.keys(TYPE_METADATA).length).toBe(21)
    for (const [name, meta] of Object.entries(TYPE_METADATA)) {
      validateMetadata(`type/${name}`, meta)
    }
  })

  it('all object metadata entries are valid', () => {
    expect(Object.keys(OBJECT_METADATA).length).toBe(14)
    for (const [name, meta] of Object.entries(OBJECT_METADATA)) {
      validateMetadata(`object/${name}`, meta)
    }
  })

  it('all message metadata entries are valid', () => {
    expect(Object.keys(MESSAGE_METADATA).length).toBe(9)
    for (const [name, meta] of Object.entries(MESSAGE_METADATA)) {
      validateMetadata(`message/${name}`, meta)
    }
  })

  it('all event metadata entries are valid', () => {
    expect(Object.keys(EVENT_METADATA).length).toBe(11)
    for (const [name, meta] of Object.entries(EVENT_METADATA)) {
      validateMetadata(`event/${name}`, meta)
    }
  })

  it('all constant metadata entries are valid', () => {
    expect(Object.keys(CONSTANT_METADATA).length).toBe(10)
    for (const [name, meta] of Object.entries(CONSTANT_METADATA)) {
      validateMetadata(`constant/${name}`, meta)
    }
  })

  it('all validation metadata entries are valid', () => {
    expect(Object.keys(VALIDATION_METADATA).length).toBe(9)
    for (const [name, meta] of Object.entries(VALIDATION_METADATA)) {
      validateMetadata(`validation/${name}`, meta)
    }
  })

  it('getDefinitionMetadata returns correct entries', () => {
    const uci = getDefinitionMetadata('object', 'UCI')
    expect(uci).toBeDefined()
    expect(uci!.architectureSource).toBe('UGTP-ARCH-001')
    expect(uci!.stabilityLevel).toBe('FROZEN')

    const chainId = getDefinitionMetadata('type', 'ChainId')
    expect(chainId).toBeDefined()
    expect(chainId!.stabilityLevel).toBe('CANDIDATE_LOW')
    expect(chainId!.breakingChangeRisk).toBe('medium')

    expect(getDefinitionMetadata('unknown', 'foo')).toBeUndefined()
  })

  it('getAllMetadata returns all 6 categories', () => {
    const all = getAllMetadata()
    expect(Object.keys(all).sort()).toEqual([
      'constant', 'event', 'message', 'object', 'type', 'validation',
    ])
  })

  it('STABILITY_LEVELS includes all four tiers', () => {
    expect(STABILITY_LEVELS.FROZEN).toBe('FROZEN')
    expect(STABILITY_LEVELS.CANDIDATE_LOW).toBe('CANDIDATE_LOW')
    expect(STABILITY_LEVELS.CANDIDATE_MEDIUM).toBe('CANDIDATE_MEDIUM')
    expect(STABILITY_LEVELS.EXPERIMENTAL).toBe('EXPERIMENTAL')
  })

  it('STABILITY_RULES describes all four tiers', () => {
    expect(STABILITY_RULES.FROZEN).toContain('all implementation tracks')
    expect(STABILITY_RULES.CANDIDATE_LOW).toContain('compatibility tests')
    expect(STABILITY_RULES.CANDIDATE_MEDIUM).toContain('experimental flag')
    expect(STABILITY_RULES.EXPERIMENTAL).toContain('first vertical slice')
  })

  it('FROZEN items have no/low breaking-change risk', () => {
    const all = getAllMetadata()
    for (const [category, items] of Object.entries(all)) {
      for (const [name, meta] of Object.entries(items)) {
        if (meta.stabilityLevel === 'FROZEN') {
          expect(
            meta.breakingChangeRisk,
            `${category}/${name} is FROZEN but has ${meta.breakingChangeRisk} risk`,
          ).toBe('none')
        }
      }
    }
  })

  it('every definition has at least one related profile', () => {
    const all = getAllMetadata()
    for (const [category, items] of Object.entries(all)) {
      for (const [name, meta] of Object.entries(items)) {
        expect(
          meta.relatedProfile.length,
          `${category}/${name} has no related profile`,
        ).toBeGreaterThan(0)
      }
    }
  })
})

describe('schema x-ugtp-architecture extensions', () => {
  async function loadSchemas(subdir: string) {
    const dir = join(SCHEMAS_DIR, subdir)
    const files = await readdir(dir)
    const schemas: Array<{ file: string; content: Record<string, unknown> }> = []
    for (const f of files.filter(f => f.endsWith('.json'))) {
      const content = JSON.parse(await readFile(join(dir, f), 'utf-8'))
      schemas.push({ file: f, content })
    }
    return schemas
  }

  it('all object schemas have x-ugtp-architecture', async () => {
    const schemas = await loadSchemas('objects')
    for (const { file, content } of schemas) {
      const arch = content['x-ugtp-architecture'] as Record<string, unknown> | undefined
      expect(arch, `${file} missing x-ugtp-architecture`).toBeDefined()
      expect(arch!.source, `${file} missing source`).toBeTruthy()
      expect(arch!.classification, `${file} missing classification`).toBeTruthy()
      expect(arch!.stabilityLevel, `${file} missing stabilityLevel`).toBeTruthy()
    }
  })

  it('all message schemas have x-ugtp-architecture', async () => {
    const schemas = await loadSchemas('messages')
    for (const { file, content } of schemas) {
      const arch = content['x-ugtp-architecture'] as Record<string, unknown> | undefined
      expect(arch, `${file} missing x-ugtp-architecture`).toBeDefined()
      expect(arch!.source, `${file} missing source`).toBeTruthy()
    }
  })

  it('all event schemas have x-ugtp-architecture', async () => {
    const schemas = await loadSchemas('events')
    for (const { file, content } of schemas) {
      const arch = content['x-ugtp-architecture'] as Record<string, unknown> | undefined
      expect(arch, `${file} missing x-ugtp-architecture`).toBeDefined()
      expect(arch!.source, `${file} missing source`).toBeTruthy()
    }
  })

  it('types.json definitions have x-ugtp-architecture', async () => {
    const content = JSON.parse(await readFile(join(SCHEMAS_DIR, 'types.json'), 'utf-8'))
    const defs = content.$defs as Record<string, Record<string, unknown>>
    for (const [name, def] of Object.entries(defs)) {
      const arch = def['x-ugtp-architecture'] as Record<string, unknown> | undefined
      expect(arch, `types.json/$defs/${name} missing x-ugtp-architecture`).toBeDefined()
    }
  })

  it('no schema still says "Status: CANDIDATE"', async () => {
    const objects = await loadSchemas('objects')
    const messages = await loadSchemas('messages')
    const events = await loadSchemas('events')
    for (const { file, content } of [...objects, ...messages, ...events]) {
      const desc = content.description as string
      expect(desc, `${file} still says Status: CANDIDATE`).not.toContain('Status: CANDIDATE')
    }
  })
})
