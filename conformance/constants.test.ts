import { describe, it, expect } from 'vitest'
import {
  PROTOCOL_VERSION,
  SCHEMA_VERSION,
  ERROR_CODES,
  ERROR_HTTP_STATUS,
  ERROR_RETRYABLE,
  SUPPORTED_CHAINS,
  INTENT_TYPES,
  EVENT_TYPES,
  STABILITY_LEVELS,
} from '../src/constants.js'

describe('constants', () => {
  it('PROTOCOL_VERSION is semantic version', () => {
    expect(PROTOCOL_VERSION).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('SCHEMA_VERSION is semantic version', () => {
    expect(SCHEMA_VERSION).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('ERROR_CODES has 12 entries', () => {
    expect(Object.keys(ERROR_CODES)).toHaveLength(12)
  })

  it('every ERROR_CODE has an HTTP status', () => {
    for (const code of Object.values(ERROR_CODES)) {
      expect(ERROR_HTTP_STATUS[code]).toBeTypeOf('number')
      expect(ERROR_HTTP_STATUS[code]).toBeGreaterThanOrEqual(400)
      expect(ERROR_HTTP_STATUS[code]).toBeLessThan(600)
    }
  })

  it('every ERROR_CODE has a retryable flag', () => {
    for (const code of Object.values(ERROR_CODES)) {
      expect(ERROR_RETRYABLE[code]).toBeTypeOf('boolean')
    }
  })

  it('SUPPORTED_CHAINS contains 5 chains', () => {
    expect(Object.keys(SUPPORTED_CHAINS)).toHaveLength(5)
  })

  it('INTENT_TYPES has 5 types', () => {
    expect(INTENT_TYPES).toHaveLength(5)
  })

  it('EVENT_TYPES has 11 events', () => {
    expect(EVENT_TYPES).toHaveLength(11)
  })

  it('STABILITY_LEVELS has 4 tiers', () => {
    expect(Object.keys(STABILITY_LEVELS)).toHaveLength(4)
    expect(STABILITY_LEVELS.FROZEN).toBe('FROZEN')
    expect(STABILITY_LEVELS.CANDIDATE_LOW).toBe('CANDIDATE_LOW')
    expect(STABILITY_LEVELS.CANDIDATE_MEDIUM).toBe('CANDIDATE_MEDIUM')
    expect(STABILITY_LEVELS.EXPERIMENTAL).toBe('EXPERIMENTAL')
  })
})
