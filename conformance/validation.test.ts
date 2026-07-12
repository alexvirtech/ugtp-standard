import { describe, it, expect } from 'vitest'
import {
  validateId,
  validateAmount,
  validateTimestamp,
  validateHash,
  validateSignature,
  validateAccountId,
  validateChainId,
  validateIntent,
  validateProtocolError,
} from '../src/validation.js'

describe('validateId', () => {
  it('accepts valid uciId', () => {
    expect(validateId('uciId', 'uci_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6').valid).toBe(true)
  })

  it('rejects uppercase uciId', () => {
    expect(validateId('uciId', 'uci_A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6').valid).toBe(false)
  })

  it('rejects wrong prefix', () => {
    expect(validateId('uciId', 'uca_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6').valid).toBe(false)
  })

  it('rejects non-string', () => {
    expect(validateId('uciId', 123).valid).toBe(false)
  })

  it('accepts valid intentId', () => {
    expect(validateId('intentId', 'int_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6').valid).toBe(true)
  })

  it('accepts valid executionId', () => {
    expect(validateId('executionId', 'exec_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6').valid).toBe(true)
  })
})

describe('validateAmount', () => {
  it('accepts zero', () => {
    expect(validateAmount('0').valid).toBe(true)
  })

  it('accepts positive integer', () => {
    expect(validateAmount('1000000000000000000').valid).toBe(true)
  })

  it('rejects leading zeros', () => {
    expect(validateAmount('01000').valid).toBe(false)
  })

  it('rejects negative', () => {
    expect(validateAmount('-1').valid).toBe(false)
  })

  it('rejects decimal', () => {
    expect(validateAmount('1.5').valid).toBe(false)
  })

  it('rejects non-string', () => {
    expect(validateAmount(1000).valid).toBe(false)
  })
})

describe('validateTimestamp', () => {
  it('accepts valid UTC timestamp', () => {
    expect(validateTimestamp('2026-01-15T10:30:00Z').valid).toBe(true)
  })

  it('accepts timestamp with fractional seconds', () => {
    expect(validateTimestamp('2026-01-15T10:30:00.123Z').valid).toBe(true)
  })

  it('rejects offset timezone', () => {
    expect(validateTimestamp('2026-01-15T10:30:00+00:00').valid).toBe(false)
  })

  it('rejects missing Z', () => {
    expect(validateTimestamp('2026-01-15T10:30:00').valid).toBe(false)
  })
})

describe('validateHash', () => {
  it('accepts valid 32-byte hash', () => {
    expect(validateHash('0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2').valid).toBe(true)
  })

  it('rejects uppercase', () => {
    expect(validateHash('0xA1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2').valid).toBe(false)
  })

  it('rejects short hash', () => {
    expect(validateHash('0xa1b2c3').valid).toBe(false)
  })
})

describe('validateSignature', () => {
  it('accepts valid 64-byte signature', () => {
    const sig = '0x' + 'ab'.repeat(64)
    expect(validateSignature(sig).valid).toBe(true)
  })

  it('rejects short signature', () => {
    expect(validateSignature('0xabcd').valid).toBe(false)
  })
})

describe('validateAccountId', () => {
  it('accepts valid EVM address', () => {
    expect(validateAccountId('0x742d35cc6634c0532925a3b844bc9e7595f2bd3e').valid).toBe(true)
  })

  it('rejects mixed case', () => {
    expect(validateAccountId('0x742D35Cc6634C0532925A3b844Bc9E7595F2BD3e').valid).toBe(false)
  })
})

describe('validateChainId', () => {
  it('accepts positive integer', () => {
    expect(validateChainId(1).valid).toBe(true)
  })

  it('rejects zero', () => {
    expect(validateChainId(0).valid).toBe(false)
  })

  it('rejects float', () => {
    expect(validateChainId(1.5).valid).toBe(false)
  })

  it('rejects string', () => {
    expect(validateChainId('1').valid).toBe(false)
  })
})

describe('validateIntent', () => {
  const validIntent = {
    intentId: 'int_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    ucaId: 'uca_f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3',
    type: 'transfer',
    params: { amount: '1000000000000000000' },
    status: 'created',
    createdAt: '2026-01-15T10:30:00Z',
  }

  it('accepts valid intent', () => {
    expect(validateIntent(validIntent).valid).toBe(true)
  })

  it('rejects null', () => {
    expect(validateIntent(null).valid).toBe(false)
  })

  it('rejects missing intentId', () => {
    const { intentId, ...rest } = validIntent
    expect(validateIntent(rest).valid).toBe(false)
  })

  it('rejects bad timestamp', () => {
    expect(validateIntent({ ...validIntent, createdAt: 'not-a-timestamp' }).valid).toBe(false)
  })
})

describe('validateProtocolError', () => {
  it('accepts valid error', () => {
    expect(validateProtocolError({ code: 'INTERNAL_ERROR', message: 'oops' }).valid).toBe(true)
  })

  it('rejects missing code', () => {
    expect(validateProtocolError({ message: 'oops' }).valid).toBe(false)
  })

  it('rejects missing message', () => {
    expect(validateProtocolError({ code: 'INTERNAL_ERROR' }).valid).toBe(false)
  })
})
