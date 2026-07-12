import type { ErrorCode } from './constants.js'

const ID_PATTERNS: Record<string, RegExp> = {
  uciId: /^uci_[0-9a-f]{32}$/,
  ucaId: /^uca_[0-9a-f]{32}$/,
  intentId: /^int_[0-9a-f]{32}$/,
  planId: /^plan_[0-9a-f]{32}$/,
  stepId: /^step_[0-9a-f]{32}$/,
  executionId: /^exec_[0-9a-f]{32}$/,
  receiptId: /^rcpt_[0-9a-f]{32}$/,
  correlationId: /^cor_[0-9a-f]{32}$/,
}

const AMOUNT_PATTERN = /^(0|[1-9][0-9]*)$/
const TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/
const HASH_PATTERN = /^0x[0-9a-f]{64}$/
const SIGNATURE_PATTERN = /^0x[0-9a-f]{128,}$/
const ACCOUNT_ID_PATTERN = /^0x[0-9a-f]{40}$/

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateId(type: keyof typeof ID_PATTERNS, value: unknown): ValidationResult {
  if (typeof value !== 'string') {
    return { valid: false, errors: [`${type} must be a string`] }
  }
  const pattern = ID_PATTERNS[type]
  if (!pattern) {
    return { valid: false, errors: [`unknown id type: ${type}`] }
  }
  if (!pattern.test(value)) {
    return { valid: false, errors: [`${type} does not match pattern ${pattern.source}`] }
  }
  return { valid: true, errors: [] }
}

export function validateAmount(value: unknown): ValidationResult {
  if (typeof value !== 'string') {
    return { valid: false, errors: ['amount must be a string'] }
  }
  if (!AMOUNT_PATTERN.test(value)) {
    return { valid: false, errors: ['amount must be a canonical decimal string (no leading zeros)'] }
  }
  return { valid: true, errors: [] }
}

export function validateTimestamp(value: unknown): ValidationResult {
  if (typeof value !== 'string') {
    return { valid: false, errors: ['timestamp must be a string'] }
  }
  if (!TIMESTAMP_PATTERN.test(value)) {
    return { valid: false, errors: ['timestamp must be RFC 3339 UTC with explicit Z'] }
  }
  return { valid: true, errors: [] }
}

export function validateHash(value: unknown): ValidationResult {
  if (typeof value !== 'string') {
    return { valid: false, errors: ['hash must be a string'] }
  }
  if (!HASH_PATTERN.test(value)) {
    return { valid: false, errors: ['hash must be 0x-prefixed 64-char lowercase hex'] }
  }
  return { valid: true, errors: [] }
}

export function validateSignature(value: unknown): ValidationResult {
  if (typeof value !== 'string') {
    return { valid: false, errors: ['signature must be a string'] }
  }
  if (!SIGNATURE_PATTERN.test(value)) {
    return { valid: false, errors: ['signature must be 0x-prefixed lowercase hex (min 128 chars)'] }
  }
  return { valid: true, errors: [] }
}

export function validateAccountId(value: unknown): ValidationResult {
  if (typeof value !== 'string') {
    return { valid: false, errors: ['accountId must be a string'] }
  }
  if (!ACCOUNT_ID_PATTERN.test(value)) {
    return { valid: false, errors: ['accountId must be 0x-prefixed 40-char lowercase hex'] }
  }
  return { valid: true, errors: [] }
}

export function validateChainId(value: unknown): ValidationResult {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    return { valid: false, errors: ['chainId must be a positive integer'] }
  }
  return { valid: true, errors: [] }
}

export function validateIntent(intent: unknown): ValidationResult {
  if (typeof intent !== 'object' || intent === null) {
    return { valid: false, errors: ['intent must be an object'] }
  }
  const errors: string[] = []
  const obj = intent as Record<string, unknown>

  const idResult = validateId('intentId', obj.intentId)
  if (!idResult.valid) errors.push(...idResult.errors)

  const ucaResult = validateId('ucaId', obj.ucaId)
  if (!ucaResult.valid) errors.push(...ucaResult.errors)

  if (!obj.type || typeof obj.type !== 'string') {
    errors.push('intent.type is required')
  }

  if (!obj.params || typeof obj.params !== 'object') {
    errors.push('intent.params is required')
  }

  if (!obj.status || typeof obj.status !== 'string') {
    errors.push('intent.status is required')
  }

  if (!obj.createdAt) {
    errors.push('intent.createdAt is required')
  } else {
    const tsResult = validateTimestamp(obj.createdAt)
    if (!tsResult.valid) errors.push(...tsResult.errors)
  }

  return { valid: errors.length === 0, errors }
}

export function validateProtocolError(error: unknown): ValidationResult {
  if (typeof error !== 'object' || error === null) {
    return { valid: false, errors: ['error must be an object'] }
  }
  const errors: string[] = []
  const obj = error as Record<string, unknown>

  if (!obj.code || typeof obj.code !== 'string') {
    errors.push('error.code is required')
  }

  if (!obj.message || typeof obj.message !== 'string') {
    errors.push('error.message is required')
  }

  return { valid: errors.length === 0, errors }
}
